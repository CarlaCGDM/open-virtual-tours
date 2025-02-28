import fs from 'fs-extra';
import multer from 'multer';
import { Router } from 'express';
import AdmZip from 'adm-zip';
import { inspectAndExtractZip } from '../middlewares/zipHandler.js';

const router = Router();

// Direct paths without path.join()
const UPLOADS_DIR = 'public/uploads/models';  // Models folder for uploads
const EXTRACTED_DIR = 'public/uploads/extracted';
const TEMP_DIR = 'public/uploads/temp';
const MERGED_DIR = 'public/uploads/models'; // Same directory for merged models

// file filter for filtering only images
const fileFilterConfigImg = function(req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true); // Accept the file
  } else {
    cb(null, false); // Reject the file
  }
};

// file filter for filtering only models
const fileFilterConfigModel = function(req, file, cb) {
  if (file.originalname.match(/\.(glb|zip)$/)) {
    cb(null, true); // Accept glb or zip files
  } else {
    cb(null, false); // Reject other files
  }
};

// Create multer storage configuration for different folders
const createStorageConfig = (folder) => multer.diskStorage({
  destination: `public/uploads/${folder}`,
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Ensure unique file names
  }
});

const uploadImg = multer({
  storage: createStorageConfig("images"),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: fileFilterConfigImg
});

const uploadModel = multer({
  storage: createStorageConfig("models"),
  limits: { fileSize: 500 * 1024 * 1024 },
  fileFilter: fileFilterConfigModel
});

const uploadEnvironment = multer({
  storage: createStorageConfig("environments"),
  limits: { fileSize: 500 * 1024 * 1024 },
  fileFilter: fileFilterConfigModel
});

router.post('/image', uploadImg.single('image'), (req, res) => {
  res.json({ data: req.file.filename });
});

router.post('/environment', uploadEnvironment.single('environment'), (req, res) => {
  res.json({ data: req.file.filename });
});

// ** Route to handle chunk uploads **
const chunkFileFilter = (req, file, cb) => {
  cb(null, true); // Allow all file types for chunks
};

const uploadChunk = multer({
  storage: createStorageConfig("temp"),  // Store chunks in a temporary folder
  limits: { fileSize: 6 * 1024 * 1024 }, // Limit chunk size to 6MB
  fileFilter: chunkFileFilter,
});

await fs.ensureDir(TEMP_DIR);
await fs.ensureDir(MERGED_DIR);
await fs.ensureDir(EXTRACTED_DIR);

// ** Handle chunk uploads **
router.post('/chunk', uploadChunk.single('chunk'), async (req, res) => {
  try {
    const { chunkIndex, totalChunks, filename, modelName } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No chunk uploaded" });
    }

    const chunk = req.file;
    const tempPath = `${TEMP_DIR}/${modelName}_${chunkIndex}`;

    console.log(`Saving chunk ${chunkIndex} to: ${tempPath}`);

    await fs.copyFile(chunk.path, tempPath);
    await fs.remove(chunk.path); // Remove original chunk file

    console.log(`Chunk ${chunkIndex} copied and original file removed.`);

    const uploadedChunks = (await fs.readdir(TEMP_DIR)).filter(file => file.startsWith(modelName)).length;

    console.log(`Uploaded chunks count: ${uploadedChunks} of ${totalChunks}`);

    if (uploadedChunks === parseInt(totalChunks)) {
      console.log("All chunks received. Merging...");

      await mergeChunks(modelName, filename);

      const timestamp = Date.now();  // Adding a timestamp to the folder name
      const zipFilePath = `${MERGED_DIR}/${filename}`;
      const unzipDir = `${EXTRACTED_DIR}/${timestamp}-${modelName}`;

      console.log(`Merged file saved to: ${zipFilePath}`);
      console.log(`Extracting to: ${unzipDir}`);

      // Ensure that we await the zip extraction process
      const result = await inspectAndExtractZip(zipFilePath, unzipDir);  // Now we are awaiting this

      console.log(`Extraction result: ${JSON.stringify(result)}`);

      // After extraction and LOD generation, check the result
      if (result && result.success) {
        // Construct the static URL for the uploaded model file
        const staticModelURL = `/uploads/extracted/${timestamp}-${modelName}`;
        return res.json({ success: true, modelURL: staticModelURL });
      } else {
        // If result is invalid or extraction failed
        return res.status(400).json({ error: result ? result.message : 'Unknown error during extraction' });
      }
    }

    res.json({ success: true, message: `Chunk ${chunkIndex}/${totalChunks} received.` });
  } catch (error) {
    console.error("Error during chunk upload:", error);
    res.status(500).json({ error: "Chunk upload failed" });
  }
});


// ** Merge chunks into a single file **
async function mergeChunks(modelName, filename) {
  const finalPath = `${UPLOADS_DIR}/${filename}`;
  const writeStream = fs.createWriteStream(finalPath);

  const chunkFiles = (await fs.readdir(TEMP_DIR))
    .filter(file => file.startsWith(modelName))
    .sort((a, b) => parseInt(a.split('_').pop()) - parseInt(b.split('_').pop()));

  for (const chunkFile of chunkFiles) {
    const chunkPath = `${TEMP_DIR}/${chunkFile}`;
    const chunkData = await fs.readFile(chunkPath);
    writeStream.write(chunkData);
    await fs.remove(chunkPath); // Cleanup chunk file
  }

  writeStream.end();
  console.log(`Merged file saved to ${finalPath}`);
}

export default router;
