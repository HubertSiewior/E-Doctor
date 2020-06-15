const mongoose = require('mongoose');

const diseaseSchema = mongoose.Schema({
    name:{
        type:String,
        max:255
	},
	symptoms:{
		type:[String],
	},
    date:{
        type:Date,
        default:Date.now
    },
   
})

module.exports = mongoose.model('diseases',diseaseSchema);