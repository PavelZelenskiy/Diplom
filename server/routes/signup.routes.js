const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const tokenService = require('../services/token.service')
const router = express.Router({mergeParams:true})
const {check, validationResult} = require('express-validator')

router.post('/', [

    check('email', 'Некорректный email').isEmail(), 
    check('password', 'Минимальная длина пароля - 8 символов').isLength({min:8}),

    async (req,res)=>{

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array()
            })
        }

    try {
        const {email, password} = req.body

        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(400).json({message:'Такой email уже существует'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = await User.create({
            ...req.body,
            password:hashedPassword
        })

        const tokens = await tokenService.generate({_id: newUser._id})
        await tokenService.save(newUser._id, tokens.refreshToken)

        res.status(201).send({...tokens, userId: newUser._id})

    } catch (error) {
        res.status(500).json({message:'Ошибка сервера'})
    }
}])

module.exports=router