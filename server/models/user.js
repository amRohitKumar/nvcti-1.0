const { ObjectID } = require('bson');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    enrolledEvents: [{
        type: Schema.Types.ObjectId, // event_id + ' ' + index
    }],
    phone: {
        type: Number,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    newNotification: {
        type: Boolean,
        default: false,
    },
    notification: [{
        type: String,
    }]
});

// userSchema.plugin(passportLocalMongoose); // this will add on 'username' and 'passwords' fields for our schema. Apart from those two we need to add on what we need in 'userSchema'. 
module.exports = mongoose.model('User', userSchema);
