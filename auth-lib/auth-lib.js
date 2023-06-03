class authLib {
    constructor(app, authServer, callback, implementEndpoints = true){
        this.app = app;
        this.authServer = authServer;
        this.callback = callback;
        this.implementEndpoints = implementEndpoints;

        this.needle = require('needle');
        this.ip = require('ip');
        this.cookieParser = require('cookie-parser');

        if(this.implementEndpoints == true){
            app.post('/authAPI/authorize', (req, res) => {
                let authData = req.body;

                let payload = {
                    app: 'app1',
                    ipClient: req.ip,
                    ipApp: this.ip.address(),
                    authData: authData
                }

                let authHeader = req.headers['authorization'] ? { 'authorization': req.headers['authorization'] } : undefined;

                this.needle('post', `${this.authServer}/api/auth-app`, payload, { json: true, headers: authHeader })
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
}

module.exports = authLib;