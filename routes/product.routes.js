import express from "express"
const router = express.Router()
import {
    getAllProduct,
    getSingleProduct,
    getUserProduct,
    addProduct,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller.js"
import upload from "../middlewares/upload.middleware.js"

router
    .route("/")
    .get(getAllProduct)
    .post(upload, addProduct)

router
    .route("/:id")
    .get(getSingleProduct)
    .put(upload, updateProduct)
    .delete(deleteProduct)

export default router
