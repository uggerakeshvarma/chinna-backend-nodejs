const express = require('express');
const mongoose = require('mongoose');

const FirmSchema = new mongoose.Schema({
    FirmName: {
        type: String,
        required: true,
        unique: true
    },
    Area: {
        type: String,
        required: true
    },
    Catagory: {
        type: [
            {
                type: String,
                enum: ["Veg", "Non-Veg"],
                required: true  // Ensure this field is required
            }
        ],
        required: true  // Ensure the category array is provided
    },
    Region: {
        type: [
            {
                type: String,
                enum: ['South-Indian', 'North-Indian', 'Chinese', 'Bakery'],
                required: true  // Ensure this field is required
            }
        ],
        required: true  // Ensure the region array is provided
    },
    Offer: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: false 
    },
    Vendor: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor',
            required: true // Ensure a vendor is linked to the firm
        }
    ],
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
        
});

const Firm = mongoose.model('Firm', FirmSchema);
module.exports = Firm;
