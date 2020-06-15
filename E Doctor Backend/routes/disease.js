const express = require('express');
const Disease = require('../models/Disease');
const { validateMongoID,validateDisease } = require('../validation');

const router = express.Router();

router.post('/', async (req,res) =>{
    const { error } = validateDisease(req.body);
    if(error) {
        console.log(error)
        return res.status(400).send(error.details[0].message);
    }

    const diseaseExist = await Disease.findOne({name:req.body.name});
    if(diseaseExist) return res.status(400).send('Disease with this name already exists');
    console.log(res)
    console.log(req.body.name)
    console.log(req.body.symptoms)

     const disease = new Disease({
         name: req.body.name,
         symptoms: req.body.symptoms,
     });
     try{
        const savedDisease = await disease.save();
        res.send(savedDisease);
     }catch(err){
        res.status(400).send(err);
    }
 
});

router.get('/', async (req,res) =>{
    try{
        const disease = await Disease.find()
        res.json(disease);
     }catch(err){
        res.status(400).send(err);
    }
    

});

router.get('/:diseaseId', async (req,res) =>{
    try{
        console.log("XDDDD")
        if (!validateMongoID(req.params.diseaseId)) return res.status(400).send('Incorrect ID').end();
        const disease = await Disease.findById(req.params.diseaseId);
        res.json(disease);
     }catch(err){
        res.status(400).send(err);
    }
});

router.delete('/:diseaseId', async (req,res) =>{
    try{
        if (!validateMongoID(req.params.diseaseId)) return res.status(400).send('Incorrect ID').end();
        const removedDisease = await Disease.remove({_id:req.params.diseaseId});
        res.json(removedDisease);
     }catch(err){
        res.status(400).send(err);
    }
});

router.put('/:diseaseId', async (req,res) =>{
    const { error } = validateDisease(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    try{
        if (!validateMongoID(req.params.diseaseId)) return res.status(400).send('Incorrect ID').end();
        const updatedDisease = await Disease.findById(req.params.diseaseId);
        if(!updatedDisease) return res.status(404).send('Disease not found');
        updatedDisease.symptoms = req.body.symptoms;
        updatedDisease.save();
        res.json(updatedDisease);
     }catch(err){
        res.status(400).send(err);
    }
});






module.exports = router;