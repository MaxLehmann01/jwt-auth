module.exports = (app, db, authAPI) => {
    app.get('/api/customers', authAPI.authMiddleware, async (req, res) => {
        /* Variables */
        let rData = { httpStatus: 500, data: { err: undefined }};

        /* Prepared Statements */
        const qSelectCustomers = `SELECT * FROM customers`;

        await new Promise((resolve, reject) => {
            db.execute(qSelectCustomers, (err, rCustomers) => {
                if(err) return reject(err);

                rData.httpStatus = 200;
                rData.data = rCustomers;
                return resolve();
            })
        })
            .catch((err) => { rData.err = err; })
            .finally(() => {
                res.status(rData.httpStatus).json(rData.data);
            })
    });
};
