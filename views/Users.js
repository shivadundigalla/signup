var mongoose = require('mongoose');
var Users =new mongoose.Schema({
    name :{
        type : String
    },
    password :{
        type : String
    },
    email :{
        type : String
    }
})
mongoose.model('Users',Users);