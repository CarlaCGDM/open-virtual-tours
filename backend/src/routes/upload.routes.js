import { Router } from 'express'
import multer from 'multer'

const router = Router()

// const upload = multer({
//     dest: 'public/uploads/models',
// //destination folder is automatically created if it's not available
//     limits: {
//         fileSize: 5000000 // 5mb
//     },
//     fileFilter: (req, file, callback) => {
//         console.log(file);
//         if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
//             return callback(new Error('Please upload a Picture(PNG or JPEG)'))
//         }
//         callback(undefined, true);
//     }

// })


// router.post('/upload', upload.single('file'), async (req, res) => {
//     try {
//         const gfs = new Grid(mongoose.connection.db, mongoose.mongo);
//         const writeStream = gfs.createWriteStream({
//             filename: req.file.originalname,
//             mode: 'w',
//             content_type: req.file.mimetype,
//         });
//         fs.createReadStream(req.file.path).pipe(writeStream);
//         writeStream.on('close', (file) => {
//             fs.unlink(req.file.path, (err) => {
//                 if (err) throw err;
//                 return res.json({ file });
//             });
//         });
//     } catch (err) {
//         return res.status(400).json({ message: 'Error uploading file', error: err });
//     }
// });

export default router