import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: [true, "Product name is required."],
            unique: [true, "Product name should be unique."],
            trim: true
        },
        price: {
            type: Number,
            required: [true, "Price is required"]
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required."],
            min: 1,
            max: 10
        },
        quality: {
            type: String,
            enum: ["A", "B", "C"],
            required: true
        },
        productImage: {
            type: String,
        }
    },
    { timestamps: true }
)

export const Product = mongoose.model("Product", productSchema)
