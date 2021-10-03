require('dotenv').config()
// async errors
require('express-async-errors')

const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
// connect ot database
connectDB()
const PORT = process.env.PORT || 3000

// middleware
app.use(express.json())

// routes
app.get('/', (req, res) => {
    res.send('Sample route')
})

app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const server = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged Error: ${err}`)
    server.close(() => process.exit(1))
})
