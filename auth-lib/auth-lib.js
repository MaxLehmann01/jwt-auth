class authLib {
    constructor(app, authServer, callback, implementEndpoints = true){
        this.app = app;
        this.authServer = authServer;
        this.callback = callback;
        this.implementEndpoints = implementEndpoints;

        this.needle = require('needle');
        this.ip = require('ip');
        this.cookieParser = require('cookie-parser');
        this.jwt = require('jsonwebtoken');

        this.app.use(this.cookieParser());

        if(this.implementEndpoints == true){
            this.app.post('/authAPI/:authType?', (req, res) => {

                if(!req.params.authType) {
                    const authHeader = req.headers['authorization'];
                    const token = authHeader && authHeader.split(' ')[1];
            
                    if(!token) return res.sendStatus(401);
            
                    return this.jwt.verify(token, process.env.JWT_AT_SECRET, (err, user) => {
                        if(err) return res.sendStatus(403);
                        
                        return res.status(200).json(user);
                    })
                }

                let authData = req.body;

                let payload = {
                    app: authData.app,
                    ipClient: req.ip,
                    ipApp: this.ip.address(),
                    authType: req.params.authType
                }

                if(req.params.authType == 'authorize') payload.authData = authData.credentials;
                if(req.params.authType == 'token') payload.authData = { rt: req.cookies['jwt-auth']};

                this.needle('post', `${this.authServer}/api/auth-app`, payload, { json: true })
                    .then((response) => {
                        let tokens = response.body;

                        res.cookie('jwt-auth', tokens.rt, { 
                            httpOnly: true, 
                            secure: true,
                            sameSite: 'Strict',
                            maxAge: 604800000
                        });

                        res.status(response.statusCode).json({at: tokens.at});
                    })
            });
        }
    }

    authMiddleware = (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(!token) return res.sendStatus(401);

        this.jwt.verify(token, process.env.JWT_AT_SECRET, (err, user) => {
            if(err) return res.sendStatus(403);
            next();
        })
    }
}

module.exports = authLib;