import { Product } from "../models/product.model.js";
import fs from "node:fs"
import asyncHandler from "express-async-handler";

const getAllProduct = asyncHandler(async(request, response) => {
    const products = await Product.find()
    response.status(200).json({ products })
})

const getSingleProduct = asyncHandler( async(request, response) => {
    const product = await Product.findById({ _id: request.params.id })
    if(!product){
        response.status(404)
        throw new Error("Product Not Found")
    }
    response.status(200).json({ product })
})

const getUserProduct = async(request, response) => {

}

const addProduct = asyncHandler(async(request, response) => {
    const { productName, price, quantity, quality } = request.body   
    const  productImage = request.file ? request.file.path : null

    if(!productName || !price || !quantity || !quality || !productImage){
        response.status(400)
        throw new Error("Input all fields")
    }

    const newProduct = await Product.create({
        productName,
        price,
        quantity,
        quality,
        productImage
    })

    response.status(201).json({
        product: newProduct
    })

})

const updateProduct = asyncHandler(async(request, response) => {
    const { id } = request.params
    const { productName, price, quality, quantity} = request.body
    const newImage = request.file ? request.file.path : null
    const existingProduct = await Product.findById(id)

    if(!existingProduct){
        response.status(404)
        throw new Error("Product not found.")
    }

    console.log(newImage);

    console.log(fs.existsSync(existingProduct.productImage));
    
    if(newImage){
        fs.unlinkSync(existingProduct.productImage)
        console.log("new file upload");
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, {productName, price, quality, quantity, productImage: newImage}, { new: true })

    response.status(200).json({ 
        message: "Product updated successfully",
        updatedProduct
    })
})

const deleteProduct =asyncHandler(async(request, response) => {
    const { id }= request.params
    const product = await Product.findById(id)
    if(!product){
        response.status(404)
        throw new Error("Product doesn't exists.")
    }

    if(product.productImage){
        fs.unlinkSync(product.productImage)
    }
    await Product.findByIdAndDelete(id)

    response.status(200).json({
        message: `Product deleted successfully.`
    })
})

export {
    getAllProduct,
    getSingleProduct,
    getUserProduct,
    addProduct,
    updateProduct,
    deleteProduct
}