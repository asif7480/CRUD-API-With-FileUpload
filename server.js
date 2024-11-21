import express from "express"
import dotenv from "dotenv"
import { connecDB } from "./config/db.js"
import productRoutes from "./routes/product.routes.js"
import { errorHandler } from "./middlewares/error.middleware.js"
dotenv.config()



const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use("/api/v1/products", productRoutes)


app.use(errorHandler)
connecDB()
.then( () => {
        app.listen( PORT, () => {
            console.log(`Server is running at port: ${PORT}`)
        })
    })
