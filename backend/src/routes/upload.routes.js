import { Router } from 'express'
import multer from 'multer'

const router = Router()

const uploadImg = multer({
    dest: 'public/uploads/images',
//destination folder is automatically created if it's not available
    limits: {
        fileSize: 5000000 // 5mb
    },
    fileFilter: (req, file, callback) => {
        console.log(file);
        if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
            return callback(new Error('Please upload a Picture(PNG or JPEG)'))
        }
        callback(undefined, true);
    }

})

router.post('/image', uploadImg.single('image'), (req, res) => {
    res.json({data: "success"})
})

export default router