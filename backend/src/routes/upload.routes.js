import { Router } from 'express'
const router = Router()

import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({storage})

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const gfs = new Grid(mongoose.connection.db, mongoose.mongo);
        const writeStream = gfs.createWriteStream({
            filename: req.file.originalname,
            mode: 'w',
            content_type: req.file.mimetype,
        });
        fs.createReadStream(req.file.path).pipe(writeStream);
        writeStream.on('close', (file) => {
            fs.unlink(req.file.path, (err) => {
                if (err) throw err;
                return res.json({ file });
            });
        });
    } catch (err) {
        return res.status(400).json({ message: 'Error uploading file', error: err });
    }
});

export default router