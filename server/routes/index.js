const express = require('express')
const router = express.Router({mergeParams:true})

router.use('/signup', require('./signup.routes'))
router.use('/recipes', require('./recipes.routes'))
router.use('/editpage', require('./editpage.routes'))
router.use('/types', require('./types.routes'))
router.use('/login', require('./login.routes'))


module.exports=router