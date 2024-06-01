import { Router } from 'express'
import multer from 'multer'

const router = Router()

const storageConfigImg = multer.diskStorage({
    // destinations is uploads folder 
    // under the project directory
  destination: "public/uploads/images",
  filename: (req, file, res) => {
        // file name is prepended with current time
        // in milliseconds to handle duplicate file names
      res(null, Date.now() + "-" + file.originalname);
  },
});

const storageConfigModel = multer.diskStorage({
  destination: "public/uploads/models",
  filename: (req, file, res) => {
      res(null, Date.now() + "-" + file.originalname);
  },
});

// file filter for filtering only images
const fileFilterConfigImg = function(req, file, cb) {
    if (file.mimetype === "image/jpeg"
        || file.mimetype === "image/png") {
          // calling callback with true
          // as mimetype of file is image
        cb(null, true);
    } else {
          // false to indicate not to store the file
        cb(null, false);
    }
};

// file filter for filtering only models
const fileFilterConfigModel = function(req, file, cb) {
    if (file.originalname.match(/\.(glb|gltf)$/)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// creating multer object for storing
// with configuration
const uploadImg = multer({
    // applying storage and file filter
  storage: storageConfigImg,
  limits: {
        // limits file size to 5 MB
      fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilterConfigImg,
});

// creating multer object for storing
// with configuration
const uploadModel = multer({
  storage: storageConfigModel,
  limits: {
      fileSize: 1024 * 1024 * 30
  },
  fileFilter: fileFilterConfigModel,
});

router.post('/image', uploadImg.single('image'), (req, res) => {
    res.json({data: req.file.filename})
})

router.post('/model', uploadModel.single('model'), (req, res) => {
    res.json({data: req.file.filename})
})

export default router