import path from "node:path"
import multer from "multer";

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (request, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ 
    storage
})

export default upload