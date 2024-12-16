const userRouter = require('./userRouter');

function route(app) {
    app.use('/api', userRouter);
}

module.exports = route;
