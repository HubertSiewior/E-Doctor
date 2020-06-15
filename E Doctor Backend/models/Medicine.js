const mongoose = require('mongoose');

const medicineSchema = mongoose.Schema({

    name:{
        type: String,
        max:255
    },
    price:{
        type:Number,
    },
    withoutRecipe:{
        type:Boolean
    },
    symptoms:{
        type:[String]
    },
})

module.exports = mongoose.model('medicines',medicineSchema);