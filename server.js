const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const api = require('./server/routes/api')

mongoose.connect("mongodb://localhost/bankDB", { useNewUrlParser: true })
    .then(() => { console.log("Succesfully Connected to the Mongodb Database") })
    .catch(() => { console.log("Error Connecting to the Mongodb Database") })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})
app.use('/', api)

const port = 3001
app.listen(process.env.PORT || port, function () {
    console.log(`Running on port ${port}`)
})