import cloudinary from 'cloudinary';

const cloudinaryUploader = cloudinary.v2.uploader.upload;

export { cloudinaryUploader };
