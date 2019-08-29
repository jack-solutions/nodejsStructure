let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let DonateSchema = mongoose.Schema({
    name: {
        type: String
    },
    userId:{
        type:String
    },
    price:{
        type:Number
    },
    description: {
        type: String
    },
    address:{
       type: String 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('donate', DonateSchema, 'donate');
