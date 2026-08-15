import multer from 'multer';

// Use memory storage so we can buffer the file and upload to Cloudinary directly
const storage = multer.memoryStorage();

const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  }
});

export default upload;
