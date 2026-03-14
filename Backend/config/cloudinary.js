import { v2 as cloudinary } from 'cloudinary'                   //targeting version 2 of cloudinary
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'events',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
})

export const upload = multer({ storage })
export default cloudinary



/*MyNotes:
  Multer — its only job is to read files from incoming HTTP requests.
  Without it, req.body only contains text. Multer makes files available. 
  Normally multer saves files to your disk, but you are giving it a custom storage engine instead.
  Cloudinary SDK — this is the official package that lets your Node.js code talk to Cloudinary's API. 
  It handles authentication and the actual upload.
  multer-storage-cloudinary — this is the bridge between the two. 
  It tells multer "instead of saving to disk, send everything straight to Cloudinary".
  It is a custom storage engine for multer.

*/