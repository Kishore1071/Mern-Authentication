import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

export const authentication = (request, response, next) => {

    const token = request.headers['authorization']

    if (token === null) return response.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_KEY, (error, user) => {

        if (error) {
            console.log(error)
            return response.sendStatus(403)

        }
        request.user = user
        next()
    })
}