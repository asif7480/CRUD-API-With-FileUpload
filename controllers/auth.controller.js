import asyncHandler from "express-async-handler";
import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js";

const register = asyncHandler( async(request, response) => {
    const { username, email, password } = request.body

    if(!username || !email || !password){
        response.status(400)
        throw new Error("Input all fields.")
    }

    const userExists = await User.findOne({ $or: [ { email }, { password } ] })

    if(userExists){
        response.status(401)
        throw new Error("User Already exists.")
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await User.create({ 
        username,
        email,
        password: hashPassword
    })

    response.status(201).json({ 
        message: "User Registered Successfully", 
        user
    })
})

const login = asyncHandler( async(request, response) => {
    const { email, password } = request.body

    if(!email || !password ){
        response.status(400)
        throw new Error("Input all fields.")
    }

    const user = await User.findOne({ email })
    if(!user){
        response.status(400)
        throw new Error("Please register.")
    }

    const matchPassword = await bcrypt.compare(password, user.password)
    if(!matchPassword){
        response.status(400)
        throw new Error("Invalid password")
    }

    response.status(200).json({
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
    })
})

const profile = asyncHandler( async(request, response) => {
    const user = await User.findOne({ _id: request.user._id }).select("-password")
    
    if(!user){
        response.status(400)
        throw new Error("No User found")
    }

    response.status(200).json({ user })
})

export {
    register,
    login,
    profile
}