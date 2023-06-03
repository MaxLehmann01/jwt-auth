module.exports = (app, db, authAPI) => {
    require('./routes/external/POST-auth-app')(app, db, authAPI);
};
