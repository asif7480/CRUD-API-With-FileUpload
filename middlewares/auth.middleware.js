import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import asyncHandler from "express-async-handler"

const verify = asyncHandler( async(request, response, next) => {
    let token;
    try{
        if(request.headers.authorization && request.headers.authorization.startsWith("Bearer")){
            token = request.headers.authorization.split(" ")[1]
            const decode = jwt.verify(token, process.env.SECRET_KEY)
            request.user = await User.findById({ _id: decode.id})
            next()   
        }
    }catch(err){
        response.status(400).json({ message: err.message})
    }

    if(!token){
        return response.status(400).json({ message: "No token found" })
    }
})


export {
    verify
}