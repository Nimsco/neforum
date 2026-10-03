const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || err.status || 500;

    return res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};

export default errorHandler;
