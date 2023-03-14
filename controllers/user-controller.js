const req = require('express/lib/request')
const User = require('../models/user-model')

const register = async(req, res) => {
    try {
        console.log(req.body)
        let { email, password, firstname, lastname } = req.body
        const user = await User.findOne({ email })
        if (user) {
            return res.status(404).send({ success: false, message: "User already exist" })
        }
        const newUser = new User({ email, password, firstname, lastname })
        const createUser = await newUser.save()
        return res.status(200).send({ success: true, user: createUser })

    } catch (err) {
        console.log(err)
        return res.status(404).send({ err })

    }
}



module.exports = { register }