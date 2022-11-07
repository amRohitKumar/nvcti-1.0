const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mentorSchema = new Schema({
    applicants: [{
        type: Schema.Types.ObjectId,
        ref: 'Form'
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
})

// userSchema.plugin(passportLocalMongoose); // this will add on 'username' and 'passwords' fields for our schema. Apart from those two we need to add on what we need in 'userSchema'. 
module.exports = mongoose.model('Mentor', mentorSchema);
