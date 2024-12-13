import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import DBConnect from './config/database.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import tweetRoutes from './routes/tweetRoutes.js'

const app = express()

dotenv.config({
    path: ".env"
})
DBConnect();

//Middlerwares
app.use(express.json())
app.use(cookieParser())
app.use(urlencoded({ extended: true }))

// Winston and Morgan
import logger from "./logger.js";
import morgan from "morgan";
const morganFormat = ":method :url :status :response-time ms";

app.use(express.json());

app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => {
                const logObject = {
                    method: message.split(" ")[0],
                    url: message.split(" ")[1],
                    status: message.split(" ")[2],
                    responseTime: message.split(" ")[3],
                };
                logger.info(JSON.stringify(logObject));
            },
        },
    })
);


// Api's
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/tweet", tweetRoutes)


app.listen(process.env.PORT, () => {
    logger.debug(`Server is running on port ${process.env.PORT}`)
})