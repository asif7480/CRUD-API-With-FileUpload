import express from "express";
const router = express.Router();
import {
  getAllProduct,
  getSingleProduct,
  getUserProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import upload from "../middlewares/upload.middleware.js";
import checkRole from "../middlewares/checkRole.middleware.js";
import { verify } from "../middlewares/auth.middleware.js";

router
  .route("/")
  .get(getAllProduct)
  .post(verify, checkRole("admin"), upload.single("productImage"), addProduct);

router
  .route("/:id")
  .get(getSingleProduct)
  .put(verify, checkRole("admin"), upload.single("productImage"), updateProduct)
  .delete(verify, checkRole("admin"), deleteProduct);

export default router;
