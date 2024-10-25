const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to MongoDB database');
mongoose
    .connect(url)

    .then((result) => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message);
    });

const entrySchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
    },
    number: {
        type: String,
        validate: {
            validator: (val) => {
                if (val.length < 8) return false;
                const parts = val.split('-');
                if (parts.length != 2) return false;
                if (parts[0].length !== 2 && parts[0].length !== 3)
                    return false;

                // No other characters than 0-9 and the dash allowed
                let isnum = /^[\-0-9]+$/.test(val);
                return isnum;
            },
            message: (props) => `${props.value} is not a valid phone number`,
        },
        required: [true, 'Phone number required'],
    },
});

entrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model('Entry', entrySchema);
