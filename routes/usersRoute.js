const express = require('express');
const User = require('../models/User');
const asyncHandler = require('express-async-handler')

const usersRoute = express.Router();

usersRoute.post('/register', asyncHandler(async (req,res)=>{
    const {name, email, password} = req.body;
    const userExists = await User.findOne({email : email})
    if(userExists){
        throw new Error('User already exists')
    }
    const userCreated = await User.create(({name, email, password}))
    res.json({
        _id : userCreated._id,
        name : userCreated.name,
        password : userCreated.password,
        email : userCreated.email,
        token : generateToken(userCreated._id)
    })
}))

usersRoute.post('/login' ,asyncHandler (async (req,res)=>{
    const {email , password} = req.body
    const user = await User.findOne({email})
    if(user && user.isPasswordMatch()){
        res.status(200)
        res.json({
            _id : user._id,
            name : user.name,
            password : user.password,
            email : user.email,
            token : generateToken(user._id)
        })
    }
    else{
        return res.status(401).json({ message: 'Invalid Credentials' });
    }
}))

// usersRoute.put('/update' ,asyncHandler (async (req,res)=>{
//     res.send('hello')

// }))

// usersRoute.delete('/:id' ,asyncHandler (async (req,res)=>{
// }))

// usersRoute.get('/' ,asyncHandler(async (req,res)=>{
// }))

module.exports = usersRoute