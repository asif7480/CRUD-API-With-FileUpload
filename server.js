import express from "express"
import dotenv from "dotenv"
import { connecDB } from "./config/db.js"
import productRoutes from "./routes/product.routes.js"
import authRoutes from "./routes/auth.routes.js"
import { errorHandler } from "./middlewares/error.middleware.js"
import morgan from "morgan"
dotenv.config()



const app = express()
const PORT = process.env.PORT

app.use(morgan("tiny"))
app.use(express.json())

app.use("/api/v1/products", productRoutes)
app.use("/api/v1/auth", authRoutes)

app.use(errorHandler)
connecDB()
.then( () => {
        app.listen( PORT, () => {
            console.log(`Server is running at port: ${PORT}`)
        })
    })
.catch( (err) => {
    console.log("Error: " + err);
    
})
