const fs = require('fs');
const mysql2 = require('mysql2');
const jwt = require('jsonwebtoken');

module.exports = (app, db, authAPI) => {
    app.post('/api/auth-app', async (req, res) => {
        /* Variables */
        let rData = { httpStatus: 500, data: { err: undefined }};

        /* Prepared Statements */
        const qSelectUserHasApp = `
            SELECT 
            users.name, 
            users.displayname, 
            apps.id AS app_id,
            apps.\`jwt-at-secret\` AS jwt_at_secret,
            apps.\`jwt-rt-secret\` AS jwt_rt_secret
            FROM users 
            INNER JOIN \`users-apps\` ON \`users-apps\`.user = users.id 
            INNER JOIN apps ON apps.id = \`users-apps\`.app 
            WHERE users.name = ? 
            AND apps.name = ? 
            AND apps.ip = ?
        `;
        const qSelectUserInApp = `
            SELECT * 
            FROM users 
            WHERE name = ? 
            AND displayname = ?
        `;

        const qInsertRefreshToken = `
            INSERT INTO \`refresh-tokens\` 
            (
                rt, 
                app
            ) 
            VALUES 
            (
                ?, 
                (
                    SELECT id 
                    FROM apps 
                    WHERE name = ?
                )
            )
        `;

        const qSelectRefreshToken = `
            SELECT * FROM \`refresh-tokens\` INNER JOIN apps ON apps.id = \`refresh-tokens\`.app WHERE rt = ? AND apps.name = ? AND apps.ip = ?;
        `;

        await new Promise((resolve, reject) => {
            let authPayload = req.body;

            switch(authPayload.authType){
                case 'authorize': {
                    db.execute(qSelectUserHasApp, [authPayload.authData.user, authPayload.app, authPayload.ipApp], async (err, rUsers) => {
                        if(err) return reject(err);
                        if(rUsers.length != 1) return reject();
        
                        if(!fs.existsSync(`app-credentials/${authPayload.app}.json`)) return reject();
        
                        let dbCredentials = JSON.parse(fs.readFileSync(`app-credentials/${authPayload.app}.json`));
        
                        const dbApp = mysql2.createConnection({
                            host: authPayload.ipApp,
                            user: dbCredentials.user,
                            password: dbCredentials.pass,
                            database: dbCredentials.name
                        });
        
                        dbApp.ping(async (err) => {
                            if(err) return reject();
        
                            dbApp.execute(qSelectUserInApp, [rUsers[0].name, rUsers[0].displayname], (err, rUsersInApp) => {
                                if(err) return reject();
                                if(rUsersInApp.length != 1) return reject();
        
                                let tokens = {
                                    at: jwt.sign({ user: authPayload.authData.user }, rUsers[0].jwt_at_secret, { expiresIn: '15s' }),
                                    rt: jwt.sign({ user: authPayload.authData.user },  rUsers[0].jwt_rt_secret)
                                }
        
                                db.execute(qInsertRefreshToken, [tokens.rt, authPayload.app], (err) => {
                                    if(err) return reject();
        
                                    rData.httpStatus = 200;
                                    rData.data = tokens; 
                                    return resolve();
                                })
                            })
                        })
                    });

                    break;
                }
                case 'token': {
                    db.execute(qSelectRefreshToken, [authPayload.authData.rt, authPayload.app, authPayload.ipApp], (err, rRefreshToken) => {
                        if(err) return reject(err);
                        if(rRefreshToken.length != 1) return reject();

                        jwt.verify(authPayload.authData.rt, rRefreshToken[0]['jwt-rt-secret'], (err, user) => {
                            if(err) return reject();

                            let tokens = {
                                at: jwt.sign({ user: user.user }, rRefreshToken[0]['jwt-at-secret'], { expiresIn: '15s' }),
                                rt: authPayload.authData.rt
                            }

                            rData.httpStatus = 200;
                            rData.data = tokens; 

                            return resolve();
                        })
                    })

                    break;
                }
                default: {
                    return reject();
                }
            }
        })
            .catch((err) => { rData.err = err; })
            .finally(() => {
                res.status(rData.httpStatus).json(rData.data);
            })
    });
};
