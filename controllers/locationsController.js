const Location = require('../models/Location')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllLocations = asyncWrapper(async(req, res) => {
    const locations = await Location.find({})
    res.status(200).json({ locations })
})

const getLocation = asyncWrapper(async(req, res, next) => {
    let { id: locationId } = req.params
    const location = await Location.findOne({ _id: locationId }).exec()

    if (!location) {
        return next(createCustomError(`No task with id: ${locationId}`, 404))
    }

    res.status(200).json({ location })
})

const createLocation = asyncWrapper(async(req, res) => {
    // const location = await Location.create({ name: 'Leiria', lat: '39.75272071779232', lng: '-8.808021098200875' })
    const location = await Location.create(req.body)
    res.status(201).json(location)
})

const updateLocation = asyncWrapper(async(req, res) => {
    try {
        const { id: locationId } = req.params

        const location = await Location.findOneAndUpdate({ _id: locationId }, req.body, {
            new: true, //returns the new data
            runValidators: true //use validator
        })

        if (!location) {
            return next(createCustomError(`No task with id: ${locationId}`, 404))
        }

        res.status(200).json({ location })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
    res.send('Update location')
})

const deleteLocation = asyncWrapper(async(req, res) => {
    try {
        const { id: locationId } = req.params

        const location = await Location.findOneAndDelete({ _id: locationId })

        if (!location) {
            return next(createCustomError(`No task with id: ${locationId}`, 404))
        }

        res.status(200).json({ location })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
})

module.exports = {
    getAllLocations,
    getLocation,
    createLocation,
    updateLocation,
    deleteLocation
}