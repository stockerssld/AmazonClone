const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./config')

const app = express()

mongoose.connect(config.database, err=>{
    if(err){
        console.log(err)
    }else{
        console.log('Connected to the database  ')
    }
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use(cors())

app.get('/',(req, res, next)=>{
    res.json({
        user: 'JAPG'
    })
})
const userRoutes = require ('./routes/account')
const mainRoutes = require ('./routes/main')
const sellerRouter = require('./routes/seller')

app.use('/api', mainRoutes)

app.use('/api/accounts', userRoutes)
app.use('/api/seller', sellerRouter)

app.listen(config.port,(err)=>{
    console.log(`Magin happens on port ${config.port}` )
})
