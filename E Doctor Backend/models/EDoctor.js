const mongoose = require('mongoose');

const eDoctorSchema = mongoose.Schema({
    name:{
        type:String,
        max:255
    },
    email:{
        type:String,
        requied:true,
        min:5,
        max:255
    },
	symptoms:{
		type:[String],
	},
    date:{
        type:Date,
        default:Date.now
    },
    diseaseName:{
        type: [String]

    },
    medicineName:{
        type:[String]
    }
})

module.exports = mongoose.model('EDoctor',eDoctorSchema);