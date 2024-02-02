const dbErrorHandler = error => {
    const errors = {
        type: 'Error'
    };

    if (error.name === 'ValidationError') {
        Object.values(error.errors).forEach(e => {
            errors[e.path] = e.message;
        });
    } else if (error.code === 11000) {
        const key = Object.keys(error.keyValue)[0];
        const value = error.keyValue[key];
        errors[key] = `${value} already exists`;
    } else {
        errors['error'] = 'An unexpected error occurred';
    }

    return errors;
};

module.exports = dbErrorHandler;
