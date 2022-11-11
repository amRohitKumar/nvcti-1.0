const mongoose = require('mongoose');
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
    position: {
        type: Number,
        default: 0, // 0 -> user, 1 -> admin, 2-> evaluator, 3->superAdmin
    },
    formSubmitted: [{
        type: Schema.Types.ObjectId,
        ref: 'Form'
    }],
    phone: {
        type: Number,
    },
    dob: {
        type: Date,
    },
    name: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    isNewNotification: {
        type: Boolean,
        default: false
    },
    notifications: [{
        type: String
    }]
})

// userSchema.plugin(passportLocalMongoose); // this will add on 'username' and 'passwords' fields for our schema. Apart from those two we need to add on what we need in 'userSchema'. 
module.exports = mongoose.model('User', userSchema);
