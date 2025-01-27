import express from 'express'
import { User, RefreshToken } from './authModel.js'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { authentication } from './authentication.js'

const AuthRouter = express.Router()

AuthRouter.get('/users/', authentication, async (request, response) => {

    const all_users = await User.find({})

    response.json(all_users)
})

AuthRouter.post('/create/', async (request, response) => {

    const all_user = await User.findOne({username: request.body.username})

    if (all_user === null) {
        const new_user = new User(request.body)
        await new_user.save()
        response.json({
            status: true,
            message: "User Created"
        })
    }
    else response.json({
        status: false,
        message: "User with the usename already exists!"
    })
})

AuthRouter.get('/key/', (request, response) => {

    const key = crypto.randomBytes(64).toString('hex')

    response.json(key)
})

AuthRouter.post('/login/', async (request, response) => {

    const user = await User.findOne({username: request.body.username})
 
    if (user === null) response.json({
        status: false,
        message: "Invalid Username"
    })
    
    else {

        if (user.password === request.body.password) {

            const user_data = {
                name: user.username
            }

            const access_token = jwt.sign(user_data, process.env.ACCESS_KEY, {expiresIn: "30s"})

            const refresh_token = jwt.sign(user_data, process.env.REFRESH_KEY)

            const new_refresh_token = new RefreshToken({
                refresh_token: refresh_token
            })

            await new_refresh_token.save()

            response.json({
                status: true,
                message: "Valid User",
                access_token: access_token,
                refresh_token: refresh_token,
                user_data: user
            })
        }

        else response.json({
            status: false,
            message: "Invalid Password"
        })

    }

})

AuthRouter.post('/token/', async(request, response) => {

    const refresh_token = request.body.refresh_token
    
    if (refresh_token === null) {
        return response.status(401).json("No token found")
    }

    const token_check = await RefreshToken.findOne({refresh_token: refresh_token})

    if (token_check === null) {
        
        return response.status(403).json("Invalid Token")
    }

    jwt.verify(refresh_token, process.env.REFRESH_KEY, (error, user) => {
        
        if (error) {
            return response.status(403).json("Token Verification Failed")
        }

        const access_token = jwt.sign({name: user.name}, process.env.ACCESS_KEY, {expiresIn: "30s"})
        
        response.json({
            access_token: access_token
        })
    })  

})


AuthRouter.post('/logout/', async (request, response) => {

    await RefreshToken.deleteOne({refresh_token: request.body.refresh_token})

    response.json('Token Deleted')
})

export default AuthRouter