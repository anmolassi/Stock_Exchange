const mongoose = require('mongoose');
const ordersExecutedSchema = new mongoose.Schema({
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
    sellPerUnit:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true
    },
    earning:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    }
},{
    timestamps: true,
    toJSON: { virtuals: true }
});

const ordersExecuted = mongoose.model('ordersExecuted', ordersExecutedSchema);
module.exports = ordersExecuted;