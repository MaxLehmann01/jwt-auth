class authLib {
    constructor(app, authServer, callback, implementEndpoints = true){
        this.app = app;
        this.authServer = authServer;
        this.callback = callback;
        this.implementEndpoints = implementEndpoints;

        this.needle = require('needle');
        this.ip = require('ip');

        if(this.implementEndpoints == true){
            app.post('/authAPI/authorize', (req, res) => {
                let authData = req.body;

                let payload = {
                    app: 'app1',
                    ipClient: req.ip,
                    ipApp: this.ip.address(),
                    authData: authData
                }

                this.needle('post', `${this.authServer}/api/auth-app`, payload, { json: true })
                    .then((response) => {
                        console.log(response.statusCode);
                        console.log(response.body);
                        res.json(response.body);
                    })
            });
        }
    }
}

module.exports = authLib;