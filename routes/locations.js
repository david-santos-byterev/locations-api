const express = require('express')
const router = express.Router()

const {
    getLocation,
    getAllLocations,
    createLocation,
    updateLocation,
    deleteLocation
} = require('../controllers/locationsController')

router.route('/').get(getAllLocations).post(createLocation)
router.route('/:id').get(getLocation).patch(updateLocation).delete(deleteLocation)

module.exports = router