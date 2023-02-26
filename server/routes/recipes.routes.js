const express = require('express')
const Recipe = require('../models/Recipe')
const router = express.Router({mergeParams:true})

router.get('/', async (req,res)=>{
    try {
        const recipes = await Recipe.find()
        res.status(200).send(recipes)
    } catch (error) {
        res.status(500).json({message:'Ошибка сервера'})
    }
})

router.get('/:id', async (req,res)=>{
    try {
        const {id} = req.params

        const recipe = await Recipe.findById(id)
        res.status(200).send(recipe)

    } catch (error) {

        res.status(500).json(error.message)
    }
})

module.exports=router