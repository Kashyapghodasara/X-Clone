import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import DBConnect from './config/database.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'

const app = express()

dotenv.config({
    path: ".env"
})
DBConnect();

//Middlerwares
app.use(express.json())
app.use(cookieParser())
app.use(urlencoded({ extended: true }))


// Api's
app.use("/api/v1/user", userRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})