const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    
    expiry: {
        type: Date,
        required: false
    },
    loginHistory: [ 
        { 
            dateTime: Date, 
            userAgent: String  
        } 
    ]
});

const personalSchema = new Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    address: String,
    mobileNumber: {
        type: String,
        default: null
    },
    accountNumber: String,
    kycVerificationStatus: String,
    deviceToken: String,
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    lock: {
        default: 0,
        type: Number,
        enum: [0,1]
    }
});


const User = mongoose.model('User', userSchema);
const Personal = mongoose.model('Personal', personalSchema);

module.exports = {
    User,
    
};