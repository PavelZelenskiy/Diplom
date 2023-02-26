const { Schema, model } = require('mongoose')

const schema = new Schema({
name:{
    type: String,
    required: true
},
type:{
    type:String, 
    required:true,
    enum:['breakfast','dinner','evening meal']
}
}, {
    timestamps:true
})

module.exports = model('Recipe', schema)