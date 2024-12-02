const checkRole = (role) => {
    return (request, response, next) => {
        if(role !== request.user.role){
            return response.status(400).json({ message: "UnAuthorized" })
        }
        next()
    }
}

export default checkRole