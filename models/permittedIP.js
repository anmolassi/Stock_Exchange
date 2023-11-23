const mongoose = require('mongoose');
const permittedIPSchema = new mongoose.Schema({
    ipAddress:{
        type:String,
        required:true,
        unique:true
    },
});
const permittedIP = mongoose.model('permittedIP', permittedIPSchema);
module.exports = permittedIP;