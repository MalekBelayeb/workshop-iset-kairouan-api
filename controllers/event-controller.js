const getAllEvents = (req, res) => {

    res.status(200).send({ message: "get all events called" })

}



module.exports = { getAllEvents }