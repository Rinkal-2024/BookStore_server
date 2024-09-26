const errorMiddlewareHandler = (err, req, res, next) => {
    const errorStatusCode = res.statusCode === 200 ? 500 : res.statusCode; 

    console.log(errorStatusCode)
    res.status(errorStatusCode).json({
        message: err.message || 'Internal Server Error'
    });
};

module.exports = { errorMiddlewareHandler };
