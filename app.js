const express = require('express')
const app = express()
const locationRoutes = require('./routes/locations')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())

app.use('/api/v1/locations', locationRoutes)

app.use(notFound)
app.use(errorHandlerMiddleware)


// Set port
const port = process.env.PORT || 3000

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)

        // Run server on port 3000
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()