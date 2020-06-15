const express = require('express');
const Medicine = require('../models/Medicine')
const {validateMongoID,validateMedicine} =require('../validation');

const router = express.Router();

router.post('/',async(req,res)=>{
    const { error } = validateMedicine(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const medicineExists = await Medicine.findOne({name:req.body.name});
    if(medicineExists) return res.status(400).send('Medicine with this name already exists');
  
    const medice =  new Medicine({
        name:req.body.name,
        price:req.body.price,
        withoutRecipe:req.body.withoutRecipe,
        symptoms:req.body.symptoms,
    });
    try{
        const savedMedicine = await medice.save();
        res.send(savedMedicine);

    }catch(err){
        res.status(400).send(err);
    }

});

router.get('/',async (req,res)=>{
    try{
        const medicine = await Medicine.find()
        res.json(medicine);
   
    }catch(err){
        res.status(400).send(err);
    }
});

router.get('/:id', async (req,res) =>{
    try{
        if (!validateMongoID(req.params.id)) return res.status(400).send('Incorrect ID').end();
        const medicine = await Medicine.findById(req.params.id);
        res.json(medicine);
     }catch(err){
        res.status(400).send(err);
    }
});


router.delete('/:id', async (req,res) =>{
    try{
        if (!validateMongoID(req.params.id)) return res.status(400).send('Incorrect ID').end();
        const removedMedicine = await Medicine.remove({_id:req.params.id});
        res.json(removedMedicine);
     }catch(err){
        res.status(400).send(err);
    }
});




module.exports = router;