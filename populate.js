require('dotenv').config()
const connectDB = require('./db/connect')
const Product = require('./models/product')
const Productsjson = require('./products.json')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        await Product.deleteMany()
        await Product.create(Productsjson)
        console.log('Success!')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()
