const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfferSchema = new Schema({ 
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    discountPercentage: {
        type: Number,
        required: true,
    },
    minOrderAmount: {
        type: Number,
        required: true,
    },
    locationId: {
        type: Schema.Types.ObjectId,
        ref: 'Location',  // Linking to a specific restaurant branch
        required: true,
    },
   
}, { timestamps: true });

module.exports = mongoose.model('Offer', OfferSchema);
