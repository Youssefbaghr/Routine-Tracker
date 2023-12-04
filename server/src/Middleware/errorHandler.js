import expressAsyncHandler from 'express-async-handler';

const errorHandler = expressAsyncHandler((err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode);

    res.json({
        message: err.message,
        stack: err.stack,
    });
});

export default errorHandler;
