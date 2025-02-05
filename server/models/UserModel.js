const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phone :{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique: true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    isBlocked : {
        type : Boolean,
        default : false
    },
    isAdmin:{
        type : Boolean,
        default : false
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('User',userSchema);