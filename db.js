const mongoose = require('mongoose')

const mongoUrl = process.env.url

mongoose.connect(process.env.url)
    .then(() => console.log("connected to mongodb"))
    .catch((err) => console.log("failed to connect to mongodb ", err))