const mongoose = require('mongoose');
const resetPasswordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        
        required:true
    },
    accessToken:{
        type:String,
        required:true
    },
    isValid:{
        type:Boolean,
        required:true,
    }
},{
    timestamps: true,
    toJSON: { virtuals: true }
});

const resetPassword = mongoose.model('resetPassword', resetPasswordSchema);
module.exports = resetPassword;