const express = require('express')
const Type = require('../models/Type')
const router = express.Router({mergeParams:true})

router.get('/', async (req,res)=>{
    try {
        const types = await Type.find()
        res.status(200).send(types)
    } catch (error) {
        res.status(500).json({message:'Ошибка сервера'})
    }
})

module.exports=router