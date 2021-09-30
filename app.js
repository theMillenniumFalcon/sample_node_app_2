require('dotenv').config()
// async errors

const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
const port  =process.env.PORt || 3000

// middleware
app.use(express.json())

// routes
app.get('/', (req, res) => {
    res.send('Sample route')
})

// product route


app.use(notFoundMiddleware)
app.use(errorMiddleware)

const server = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Connected to DB and listening on port ${port}...`)
        })
    } catch (err) {
        console.error(err)
    }
}

server()

process.on('uncaughtException', (err, promise) => {
    console.log(`Logged Error: ${err}`)
    server.close(() => process.exit(1))
})


