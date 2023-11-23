const mongoose = require('mongoose');
const ordersReceivedSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    costPerUnit:{
        type:Number,
        required:true,
    },
    shareSymbol:{
        type:String,
        required:true
    },
    totalBrokrage:{
        type:Number,
        required:true,
    },
    totalCost:{
        type:Number,
        required:true,
    },
    identifier:{
        type:String,
        required:true
    }
},{
    timestamps: true,
    toJSON: { virtuals: true }
});

const ordersReceived = mongoose.model('ordersReceived', ordersReceivedSchema);
module.exports = ordersReceived;