import express from "express"
const router = express.Router()
import { register, login, profile } from "../controllers/auth.controller.js"
import { verify } from "../middlewares/auth.middleware.js"

router.post("/register", register)
router.post("/login", login)
router.get("/profile", verify, profile)

export default router