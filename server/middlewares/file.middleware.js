import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

import fs from 'fs';
import cloudinary from 'cloudinary';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VALID_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];


const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../temp'));
  }
});

const fileFilter = (req, file, cb) => {
  if (!VALID_FILE_TYPES.includes(file.mimetype)) {
    cb(new Error('Invalid file type'));
  } else {
    cb(null, true);
  }
}

// const upload = multer({
//   storage,
//   fileFilter,
// });
const upload = multer({ dest: null });



// Ahora tenemos un nuevo middleware de subida de archivos
// 
const uploadToCloudinary = (req, res, next) => {
  if (req.file) {
    cloudinary.v2.uploader.upload_stream((error, result) => {
      if (error) {
        return next(error);
      }
      req.file_url = result.secure_url;
      return next();
    }).end(req.file.buffer);
  } else {
    return next();
  }
};


export { upload, uploadToCloudinary };