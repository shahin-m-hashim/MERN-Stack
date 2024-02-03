const handleDbErrors = error => {
    const errorRes = { type: 'Error' };
    const errors = {}

    switch (error.name) {
        case 'ValidationError': {
            Object.values(error.errors).forEach(e => errors[e.path] = e.message);
            errorRes.reason = 'VALIDATION(S)_FAILED';
            errorRes.errors = errors;
            break;
        }

        case 'MongoServerError': {
            const key = Object.keys(error.keyValue)[0];
            const value = error.keyValue[key];
            errorRes.reason = 'ALREADY_EXISTS';
            errorRes.error = `${key} ${value} already exists`;
            break;
        }

        default: {
            errorRes.reason = error.message
            errorRes.error = error.name
            break;
        }
    }

    return errorRes;
};

module.exports = handleDbErrors;
