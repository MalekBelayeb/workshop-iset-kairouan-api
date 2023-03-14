const router = require('express').Router()
const eventController = require('../controllers/event-controller')

router.get('/v1/events', eventController.getAllEvents)

module.exports = router