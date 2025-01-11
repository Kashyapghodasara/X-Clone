import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import multer from 'multer';
import { fileURLToPath } from 'url';

// Get the current file's directory name properly
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the upload path
const uploadPath = path.join(__dirname, '..', 'public', 'images');

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(16, (err, name) => {
            if (err) cb(err, null);
            const fn = name.toString('hex') + path.extname(file.originalname);
            cb(null, fn);
        });
    }
});

const upload = multer({ storage: storage });
export default upload;