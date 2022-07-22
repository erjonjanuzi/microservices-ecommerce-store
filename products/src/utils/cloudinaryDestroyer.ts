import cloudinary from 'cloudinary';

const cloudinaryDestroyer = cloudinary.v2.uploader.destroy;

export { cloudinaryDestroyer };