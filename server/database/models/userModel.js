const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const { isEmail, isStrongPassword } = require('validator');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String, // converts username to String if not already
            lowercase: true, // converts username lowercase if not already
            minlength: [5, "Minimum username length is 5 characters"],
            unique: true,
            // for unique we cant set a message, instead we can utilize the error code 11000
            required: [true, "Username is required"],
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "Email is required"],
            validate: [isEmail, "Please enter a valid email"]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            validate: [e => {
                return isStrongPassword(e, {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1,
                    // these are the default values for each
                    // if you do not specify each it will use these default values
                    // incase you do not need a validation for a specific key set it to 0
                    // if you just need the default values simply call isStrongPassword
                })
            }, "Please enter a strong password"]
        },
        createdAt: {
            type: Date,
            default: new Date(),
        }
    }
)

userSchema.pre('save', async function (next) {
    console.log('A new user is about to be created & saved to the db');

    try {
        this.password = await bcrypt.hash(this.password, 12);
        next();
    }
    catch (e) {
        console.error(e.message);
    }
})

// fire a fn after a doc is saved to the db
userSchema.post('save', (doc, next) => {
    console.log(doc, 'A new user is created & saved successfully to the db');
    next();
})

module.exports = mongoose.model('user', userSchema);

/*
    The first argument is the singular name of the collection your model is for.
    Mongoose automatically converts the model name into the plural, lowercased version. 
    Thus, for the example above, the model user, mongoose automatically creates a 'users'
    collection and add the user into it.
*/