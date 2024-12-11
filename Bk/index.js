import express from 'express'
import dotenv from 'dotenv'
import DBConnect from './config/database.js'

const app = express()
app.use(express.json())

dotenv.config({
    path: ".env"
})
DBConnect();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})