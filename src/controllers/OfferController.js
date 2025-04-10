
// const OfferModel = require('../models/OfferModel');
// const multer = require('multer');
// const cloudinaryUtil = require("../Utils/CloudinaryUtil");
// const mongoose = require('mongoose');

// // Predefined categories for offers
// // const categories = [
// //     "pizza",
// //     "burger",
// //     "biryani",
// //     "shake",
// //     "samosa",
// //     "cake",
// //     "rolls",
// //     "dosa",
// //     "momos",
// //     "noodles"
// // ];

// // Multer storage configuration
// const storage = multer.diskStorage({
//     filename: function(req, file, cb) {
//         cb(null, file.originalname)
//     }
// });

// // Multer upload configuration
// const upload = multer({
//     storage: storage
// }).single("OfferImage");

// const addOffer = async (req, res) => {
//     try {
//         let { startDate, endDate, ...restData } = req.body;

//         // Convert string dates to JavaScript Date objects
//         startDate = new Date(startDate);
//         endDate = new Date(endDate);

//         // Validate if dates are valid
//         if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
//             return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD format." });
//         }

//         const savedOffer = await OfferModel.create({ startDate, endDate, ...restData });

//         res.status(201).json({
//             message: "Offer added successfully",
//             data: savedOffer,
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ 
//             message: "Error adding offer", 
//             error: err.message 
//         });
//     }
// };

// const addOfferWithFile = async (req, res) => {
//     upload(req, res, async (err) => {
//         if (err) {
//             return res.status(500).json({
//                 message: err.message
//             });
//         }

//         try {
//             let { startDate, endDate, ...restData } = req.body;

//             // Convert string dates to JavaScript Date objects
//             startDate = new Date(startDate);
//             endDate = new Date(endDate);

//             // Validate if dates are valid
//             if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
//                 return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD format." });
//             }

//             // Upload image to Cloudinary if file exists
//             if (req.file) {
//                 const cloudinaryResponse = await cloudinaryUtil.uploadFilToCloudinary(req.file);
//                 restData.OfferImage = cloudinaryResponse.secure_url;
//             }

//             // Create offer with image URL
//             const savedOffer = await OfferModel.create({ 
//                 startDate, 
//                 endDate, 
//                 ...restData 
//             });

//             res.status(201).json({
//                 message: "Offer added successfully with file",
//                 data: savedOffer,
//             });
//         } catch (err) {
//             console.error(err);
//             res.status(500).json({
//                 message: "Error adding offer with file",
//                 error: err.message,
//             });
//         }
//     });
// };

// const getAllOffers = async (req, res) => {
//     try {
//         const offers = await OfferModel.find().populate();
//         res.status(200).json({
//             message: "All offers fetched successfully",
//             data: offers,
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ 
//             message: "Error fetching offers", 
//             error: err.message 
//         });
//     }
// };

// const getOfferById = async (req, res) => {
//     try {
//         // Log the incoming request ID for debugging
//         console.log('Requested Offer ID:', req.params.id);
    
//         // Validate ObjectId before querying
//         if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//             return res.status(400).json({ 
//                 message: "Invalid Offer ID format" 
//             });
//         }
    
//         const offer = await OfferModel.findById(req.params.id);
    
//         // Log if offer is found or not
//         if (!offer) {
//             console.log('No offer found with ID:', req.params.id);
//             return res.status(404).json({ 
//                 message: "Offer not found" 
//             });
//         }
    
//         res.status(200).json({
//             message: "Offer fetched successfully",
//             data: offer
//         });
    
//     } catch (err) {
//         console.error('Offer Fetch Error:', err);
//         res.status(500).json({
//             message: "Error fetching offer",
//             error: err.message
//         });
//     }
// };

// const updateOffer = async (req, res) => {
//     try {
//         const updatedOffer = await OfferModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedOffer) {
//             return res.status(404).json({ message: "Offer not found" });
//         }
//         res.status(200).json({
//             message: "Offer updated successfully",
//             data: updatedOffer,
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ 
//             message: "Error updating offer", 
//             error: err.message 
//         });
//     }
// };

// const deleteOffer = async (req, res) => {
//     try {
//         const deletedOffer = await OfferModel.findByIdAndDelete(req.params.id);
//         if (!deletedOffer) {
//             return res.status(404).json({ message: "Offer not found" });
//         }
//         res.status(200).json({
//             message: "Offer deleted successfully",
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ 
//             message: "Error deleting offer", 
//             error: err.message 
//         });
//     }
// };

// // New endpoint to get all categories
// // const getCategories = async (req, res) => {
// //     try {
// //         res.status(200).json({
// //             message: "Categories fetched successfully",
// //             data: categories,
// //         });
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).json({ 
// //             message: "Error fetching categories", 
// //             error: err.message 
// //         });
// //     }
// // };

// module.exports = { 
//     addOffer, 
//     getAllOffers, 
//     getOfferById, 
//     updateOffer, 
//     deleteOffer, 
//     addOfferWithFile
// };


const OfferModel = require('../models/OfferModel');
const multer = require('multer');
const cloudinaryUtil = require("../Utils/CloudinaryUtil");
const mongoose = require('mongoose');

// Multer storage configuration
const storage = multer.diskStorage({
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

// Multer upload configuration
const upload = multer({
    storage: storage
}).single("OfferImage");

const addOffer = async (req, res) => {
    try {
        let { startDate, endDate, ...restData } = req.body;

        startDate = new Date(startDate);
        endDate = new Date(endDate);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD format." });
        }

        const savedOffer = await OfferModel.create({ startDate, endDate, ...restData });

        res.status(201).json({
            message: "Offer added successfully",
            data: savedOffer,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            message: "Error adding offer", 
            error: err.message 
        });
    }
};

const addOfferWithFile = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        try {
            let { startDate, endDate, ...restData } = req.body;

            startDate = new Date(startDate);
            endDate = new Date(endDate);

            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD format." });
            }

            if (req.file) {
                const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file); // Fixed typo in function call
                restData.OfferImage = cloudinaryResponse.secure_url;
            }

            const savedOffer = await OfferModel.create({ startDate, endDate, ...restData });

            res.status(201).json({
                message: "Offer added successfully with file",
                data: savedOffer,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Error adding offer with file",
                error: err.message,
            });
        }
    });
};

const getAllOffers = async (req, res) => {
    try {
        const offers = await OfferModel.find();
        res.status(200).json({
            message: "All offers fetched successfully",
            data: offers,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            message: "Error fetching offers", 
            error: err.message 
        });
    }
};

const getOfferById = async (req, res) => {
    try {
        console.log('Requested Offer ID:', req.params.id);
    
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid Offer ID format" });
        }
    
        const offer = await OfferModel.findById(req.params.id);
    
        if (!offer) {
            console.log('No offer found with ID:', req.params.id);
            return res.status(404).json({ message: "Offer not found" });
        }
    
        res.status(200).json({
            message: "Offer fetched successfully",
            data: offer
        });
    
    } catch (err) {
        console.error('Offer Fetch Error:', err);
        res.status(500).json({
            message: "Error fetching offer",
            error: err.message
        });
    }
};

const updateOffer = async (req, res) => {
    try {
        const updatedOffer = await OfferModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOffer) {
            return res.status(404).json({ message: "Offer not found" });
        }
        res.status(200).json({
            message: "Offer updated successfully",
            data: updatedOffer,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            message: "Error updating offer", 
            error: err.message 
        });
    }
};

const deleteOffer = async (req, res) => {
    try {
        const deletedOffer = await OfferModel.findByIdAndDelete(req.params.id);
        if (!deletedOffer) {
            return res.status(404).json({ message: "Offer not found" });
        }
        res.status(200).json({
            message: "Offer deleted successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            message: "Error deleting offer", 
            error: err.message 
        });
    }
};

const getCategories = async (req, res) => {
    try {
        res.status(200).json({
            message: "Categories fetched successfully",
            data: categories,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            message: "Error fetching categories", 
            error: err.message 
        });
    }
};

module.exports = { 
    addOffer, 
    getAllOffers, 
    getOfferById, 
    updateOffer, 
    deleteOffer, 
    addOfferWithFile,
    getCategories
};
