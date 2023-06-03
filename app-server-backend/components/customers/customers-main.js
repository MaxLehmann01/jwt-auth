module.exports = (app, db, authAPI) => {
    require('./routes/GET-customers')(app, db, authAPI);
};
