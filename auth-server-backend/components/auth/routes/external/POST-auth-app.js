const fs = require('fs');
const mysql2 = require('mysql2');
const jwt = require('jsonwebtoken');

module.exports = (app, db, authAPI) => {
    app.post('/api/auth-app', async (req, res) => {
        /* Variables */
        let rData = { httpStatus: 500, data: { err: undefined }};

        /* Prepared Statements */
        const qSelectUserHasApp = `SELECT users.name, users.displayname, apps.id AS app_id FROM users INNER JOIN \`users-apps\` ON \`users-apps\`.user = users.id INNER JOIN apps ON apps.id = \`users-apps\`.app WHERE users.name = ? AND apps.name = ? AND apps.ip = ?`;
        const qSelectUserInApp = `SELECT * FROM users WHERE name = ? AND displayname = ?`;

        const qInsertRefreshToken = `INSERT INTO \`refresh-tokens\` (rt, app) VALUES (?, (SELECT id FROM apps WHERE name = ?))`;

        await new Promise((resolve, reject) => {
            let authPayload = req.body;

            if(req.headers['authorization']){
                let at = req.headers['authorization'].split(' ')[1];

                jwt.verify(at, process.env.JWT_AT_SECRET, (err, user) => {
                    if(err) return reject();
                    
                    rData.httpStatus = 200;
                    return resolve();
                })
            }
            else{
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
                                at: jwt.sign({ user: authPayload.authData.user }, process.env.JWT_AT_SECRET, { expiresIn: '15s' }),
                                rt: jwt.sign({ user: authPayload.authData.user }, process.env.JWT_RT_SECRET)
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
            }
        })
            .catch((err) => { rData.err = err; })
            .finally(() => {
                res.status(rData.httpStatus).json(rData.data);
            })
    });
};
