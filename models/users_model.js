const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const APP_SECRET = 'myapp_secret002'


var userSchema = mongoose.Schema({

    email: {
        type: String, required: true, unique: true,
    },
  
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
 
    password: {
        type: String,  required:'password is required',  minlength : [6, 'password must be at least 6 character']
    } ,
 
    date: {
        type: Date, default: Date.now()
    },
});


// generate jwt token...
userSchema.methods.generateJwt = (user)=> {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 1);
    return jwt.sign({_id: user._id, email: user.email,
        exp: parseInt(expiry.getTime() / 1000),},
         APP_SECRET);
}


mongoose.model('User', userSchema);