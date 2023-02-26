const express = require('express')
const router = express.Router({mergeParams:true})
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const tokenService = require('../services/token.service')

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

            if(!existingUser){
                return res.status(400).json({message:'Такой email не существует'})
            }

            const isPasswordEqual = await bcrypt.compare(password, existingUser.password)

            if(!isPasswordEqual){
                return res.status(400).json({message:'Неверный пароль'})
            }

            const tokens = await tokenService.generate({_id: existingUser._id})
            await tokenService.save(existingUser._id, tokens.refreshToken)

            res.status(200).send({...tokens, userId: existingUser._id})
            

        } catch (error) {
            res.status(500).json(error.message)
        }
    }])

module.exports=router