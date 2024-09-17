const User = require('../model/user.model')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const register = async(req,res)=>{
    const {name,email,phone,password} = req.body;
    try {
        const existsuser = await User.findOne({email})
        if (existsuser) {
           return res.status(400).json({message:"User Already exists"})
        } 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            name,
            email,
            phone,
            password:hashedPassword
        })
        res.status(201).json({message:"Registration Successfully",user})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
        console.error(error.message)
    }
}

const login = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user){
           return res.status(400).json({message:"Invalid Credentails"})
        }
        const matchPassword = await bcrypt.compare(password,user.password)
        if (!matchPassword) {
          return res.status(400).json({message:"Invalid Credentials"})  
        }
        const token = jwt.sign({id: user.id},process.env.MY_SECRET,{expiresIn:"1h"})
        res.status(200).json({message:"Login Successfully",token})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error",error})
        console.error(error)
    }
}
module.exports = {
    register,
    login
}


