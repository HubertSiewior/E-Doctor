const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {validateRegister, validateLogin,validateUpdatePassword,validateMongoID,validateEdoctorUser} = require('../validation');
const jwt = require('jsonwebtoken');
const verifyToken = require('../verifyToken');

const router = express.Router();



router.post('/login', async (req,res)=>{
    //VALIDATE REQUSET DATA
    const { error } = validateLogin(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Email  is wrong');
    console.log("in login")

    //VALIDATE PASSWORD
    
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    if(!isPasswordCorrect) return res.status(400).send('Password is wrong');
    
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('jwt',token)

    res.send(token);



})

router.post('/', async (req,res)=>{
    //VALIDATE REQUSET DATA
    const { error } = validateRegister(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //CHECK IF USER WITH GIVEN EMAIL ALREADY EXISTS
    const userExist = await User.findOne({email:req.body.email});
    if(userExist) return res.status(400).send('User with this email already exists');
    console.log("in registration")
    //HASH PASSWORD

    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    //CREATE NEW USER
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
})

router.get('/:id',verifyToken,async (req,res)=>{
    try{
    if (!validateMongoID(req.params.id)) return res.status(400).send('Incorrect ID').end();
    const user = await User.findById(req.params.id);
    res.send(user);
    }catch(err){
    res.status(400).send(err);
    }

});


router.delete('/:id',verifyToken,async(req,res)=>{
    try{
        if (!validateMongoID(req.params.id)) return res.status(400).send('Incorrect ID').end();
        const removedUser = await User.remove({_id:req.params.id});
        res.json(removedUser);
     }catch(err){
        res.status(400).send(err);
    }
});

router.put('/:id',verifyToken,async (req,res)=>{
   
    const {error} =validateUpdatePassword(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    try{
        if (!validateMongoID(req.params.id)) return res.status(400).send('Incorrect ID').end();
        
        const updatedUser = await User.findById(req.params.id);
        if(!updatedUser) return res.status(404).send('User not found');
        updatedUser.password = req.body.password;
        updatedUser.save();
        res.json(updatedUser);
     }catch(err){
        res.status(400).send(err);
    }
});

router.post('/all',async(req,res)=>{
    try{
        const users = await User.find();
        res.send(users);
        }catch(err){
        res.status(400).send(err);
        }
    
});


router.post('/getId',verifyToken,async(req,res)=>{
    const { error } = validateEdoctorUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    try{
        const userExists = await User.findOne({email:req.body.email});
        if(!userExists) return res.status(404).send('User not found');
        res.send(userExists.id);
        }catch(err){
        res.status(400).send(err);
        }

    
});


module.exports = router;