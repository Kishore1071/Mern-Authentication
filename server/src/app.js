import express, { json } from 'express'
import { config } from 'dotenv'
import { connect } from 'mongoose'
import cors from 'cors'
import AuthRouter from './authentication/authController.js'

const app = express()

app.use(json())
app.use(cors())
config()

app.use('/auth/', AuthRouter)

const startServer = async() => {

    await connect(`${process.env.MONGODB_LINK}`)
    app.listen(process.env.PORT, () => console.log(`Serving on the port ${process.env.PORT}`))

}

startServer()