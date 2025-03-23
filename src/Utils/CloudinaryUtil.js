const cloudinary = require('cloudinary').v2;

const uploadFilToCloudinary = async (file) => {

    const config = cloudinary.config({
        cloud_name: "drjtxitr0",
        api_key: "294976875342731",
        api_secret: "Nm3YN30yDZOWhR7KM0uMiyt9ihs"
    }) 

    const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
    return cloudinaryResponse;
};

module.exports = {
    uploadFilToCloudinary
};