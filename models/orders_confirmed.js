const mongoose = require('mongoose');
const ordersConfirmedSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'ordersReceived',
        required:true
    },
    symbol:{
        type:String,
        required:true
    },
    costPerUnit:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true
    },
    identifier:{
        type:String,
        required:true
    }
},{
    timestamps: true,
    toJSON: { virtuals: true }
});

const ordersConfirmed = mongoose.model('ordersConfirmed', ordersConfirmedSchema);
module.exports = ordersConfirmed;