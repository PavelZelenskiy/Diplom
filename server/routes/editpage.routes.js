const express = require('express')
const Recipe = require('../models/Recipe')
const router = express.Router({mergeParams:true})
const auth = require('../middlewear/auth.middlewear')

router.patch('/:id', auth, async (req,res)=>{
    try {
        
        const {id} = req.params

        const updatedUser = await Recipe.findByIdAndUpdate(id, req.body, {new:true})
        res.status(200).send(updatedUser)

    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.delete('/:id', auth, async (req,res)=>{
    try {
        
        const {id} = req.params

        await Recipe.findByIdAndDelete ({_id:id})
        res.status(200).send(null)

    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports=router