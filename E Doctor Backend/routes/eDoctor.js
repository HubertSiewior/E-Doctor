const express = require('express');
const User = require('../models/User');
const Disease = require('../models/Disease');
const EDoctor  =require('../models/EDoctor');
const {validateEDoctor,validateMongoID,validateEdoctorUser} = require('../validation');
const Medicine = require('../models/Medicine');
const verifyToken = require('../verifyToken');

const router = express.Router();

router.post('/',async (req,res)=>{
    const { error } = validateEDoctor(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const userNotExists = await User.findOne({email:req.body.email});
    if(!userNotExists) return res.status(404).send('User not found');

    const mySymptoms = req.body.symptoms;

    const myDiseaseName = [];
    const myDiseases = await Disease.find();
    
    for(i=0;i<myDiseases.length;i++){
        if(myDiseases[i].symptoms.some(symptom=>mySymptoms.includes(symptom))){
           myDiseaseName.push(myDiseases[i].name)
        }
    }
    
    const myMedicineName = [];
    const myMedicines = await Medicine.find();
   
    for(i=0;i<myMedicines.length;i++){
        if(myMedicines[i].symptoms.some(symptom=>mySymptoms.includes(symptom))){
            myMedicineName.push(myMedicines[i].name)
        }
    }
    
    const eDoctor = new EDoctor({
       name:req.body.name,
       email:req.body.email,
       symptoms: req.body.symptoms,
       diseaseName:myDiseaseName,
       medicineName:myMedicineName   

    });
    try{
        const savedEDoctor = await eDoctor.save();
        const medicineANDdisease=[savedEDoctor.diseaseName,savedEDoctor.medicineName]
        res.send(medicineANDdisease);
        res.send(savedEDoctor.diseaseName);
        res.send(savedEDoctor.medicineName);

     }catch(err){
        res.status(400).send(err);
    }

});


router.get('/',async (req,res)=>{
    try{
        const eDoctor = await EDoctor.find()
        res.json(eDoctor);
     }catch(err){
        res.status(400).send(err);
    }
});

router.get('/:id', async (req,res) =>{
    try{
        if (!validateMongoID(req.params.id)) return res.status(400).send('Incorrect ID').end();
        const eDoctor = await EDoctor.findById(req.params.id);
        res.send(eDoctor)
     }catch(err){
        res.status(400).send(err);
    }
});

router.delete('/:id', async (req,res) =>{
    const { error } = validateEDoctor(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    try{
        if (!validateMongoID(req.params.id)) return res.status(400).send('Incorrect ID').end();
        const removedEDoctor = await EDoctor.remove({_id:req.params.id});
        res.json(removedEDoctor);
     }catch(err){
        res.status(400).send(err);
    }
});

router.post('/user/',verifyToken,async (req,res) =>{
    const { error } = validateEdoctorUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    try{
    const userExists = await User.findOne({email:req.body.email});
    if(!userExists) return res.status(404).send('User not found');
     const myEdoctors = await EDoctor.find();
     const myDiseaseName = []; 
      for(i=0;i<myEdoctors.length;i++){
        
          if(myEdoctors[i].email.trim()==req.body.email.trim()){
              const tmpArray = myEdoctors[i].diseaseName;
              for(tmp of tmpArray){
                  if(!myDiseaseName.includes(tmp)){
                      myDiseaseName.push(tmp);
                  }
              }
          }
      }
      const myMedicineName = [];
      for(i=0;i<myEdoctors.length;i++){
        if(myEdoctors[i].email.trim()==req.body.email.trim()){
            const tmpArray = myEdoctors[i].medicineName;
            for(tmp of tmpArray){
                if(!myMedicineName.includes(tmp)){
                    myMedicineName.push(tmp)
                }
            }
        }
      }

    
      const obj = {
          myDiseaseName,
          myMedicineName
      }
      res.send(obj);


    }catch(err){
        res.status(400).send(err);
    }

});

router.put('/:id', async (req,res) =>{
    const { error } = validateEDoctor(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    try{
        if (!validateMongoID(req.params.id)) return res.status(400).send('Incorrect ID').end();
        const updatedEDoctor = await EDoctor.findById(req.params.id);
        if(!updatedEDoctor) return res.status(404).send('EDoctor not found');
        updatedEDoctor.symptoms = req.body.symptoms;
        
        const mySymptoms = req.body.symptoms;

        const myDiseaseName = [];
        const myDiseases = await Disease.find();
        
        for(i=0;i<myDiseases.length;i++){
            if(myDiseases[i].symptoms.some(symptom=>mySymptoms.includes(symptom))){
               myDiseaseName.push(myDiseases[i].name)
            }
        }
        updatedEDoctor.diseaseName = myDiseaseName;
        updatedEDoctor.save();
        res.json(updatedEDoctor);

    
        }catch(err){
            res.status(400).send(err);
        }
    

});




module.exports = router;