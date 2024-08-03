import express from "express";
import { addFood } from '../controllers/foodController.js'
import multer from 'multer'

const foodRoute = express.Router()

// image storage using multer

const storage = multer.diskStorage(
    {
        destination: 'uploads',
        filename: (req, file, cb) => {
            return cb(null,`${Date.now()}${file.originalname}`)
        }
    }
)
const upload = multer({ storage: storage })

foodRoute.post('/add',upload.single('image'),addFood)





export default foodRoute