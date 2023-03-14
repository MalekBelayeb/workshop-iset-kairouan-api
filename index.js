const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const morgan = require('morgan')
dotenv.config()

require("./db");



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const userRoute = require('./routes/user')
const eventRoute = require('./routes/event')



app.use(morgan('common'))

app.use('/api', eventRoute)
app.use('/api', userRoute)


app.listen(process.env.PORT, (err) => {

    if (err) {
        console.log(err)
    } else {
        console.log(`Server listening on port 5001`)
    }
})

app.get('/', (req, res) => {

    console.log("server is running ... ")
    res.status(200).send({ mesage: "server is running" })

})