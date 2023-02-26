const recipeMock = require('../mock/recipes.json')
const typeMock = require('../mock/types.json')
const Recipe = require('../models/Recipe')
const Type = require('../models/Type')

module.exports=async()=>{
   const recipes = await Recipe.find()
   if(recipes.length!== recipeMock.length){
    await createInitialEntity(Recipe,recipeMock )
   }

   const types = await Type.find()
   if(types.length!== typeMock.length){
    await createInitialEntity(Type,typeMock )
   }
}


async function createInitialEntity(Model, data){
    await Model.collection.drop()
    return Promise.all(
        data.map(async item=>{
            try {
                delete item.id
                const newItem = new Model(item)
                await newItem.save()
                return newItem
            } catch (error) {
                return error
            }
        })
    )
}