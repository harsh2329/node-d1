const OfferModel = require('../models/OfferModel');
const LocationModel = require('../models/LocationModel');

const addOffer = async (req, res) => {
    try {
        let { startDate, endDate, ...restData } = req.body;

        // Convert string dates to JavaScript Date objects
        startDate = new Date(startDate);
        endDate = new Date(endDate);

        // Validate if dates are valid
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD format." });
        }

        const savedOffer = await OfferModel.create({ startDate, endDate, ...restData });

        res.status(201).json({
            message: "Offer added successfully",
            data: savedOffer,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getAllOffers = async (req, res) => {
    try {
        const offers = await OfferModel.find().populate("locationId createdBy");
        res.status(200).json({
            message: "All offers fetched successfully",
            data: offers,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getOfferById = async (req, res) => {
    try {
        const offer = await OfferModel.findById(req.params.id).populate("locationId createdBy");
        if (!offer) {
            return res.status(404).json({ message: "Offer not found" });
        }
        res.status(200).json({
            message: "Offer fetched successfully",
            data: offer,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
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
        res.status(500).json({ message: err.message });
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
        res.status(500).json({ message: err.message });
    }
};

module.exports = { addOffer, getAllOffers, getOfferById, updateOffer, deleteOffer };
