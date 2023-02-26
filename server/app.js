const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const initDatabase = require('./startUp/initDatabase')
const routes = require('./routes')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use('/api',routes)

const PORT= config.get('port')?? 8080

if(process.env.NODE_ENV==='production'){
    console.log('production')
} else{
    console.log(chalk.blue('development start'))
}

async function start () {
try {
    mongoose.connection.once('open',()=>{
        initDatabase()
    })
    await mongoose.connect(config.get('mongoUri'))
    console.log(chalk.greenBright('MongoDB connected'))
    app.listen(PORT, ()=>{console.log(chalk.green(`Сервер запущен на порту ${PORT}`))})
} catch (error) {
    console.log(chalk.red(e.message))
    process.exit(1)
}


}

start()