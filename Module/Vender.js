const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    // Often Firm create then add here Firm
    firm: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Firm'
        }
    ]
    
});

const Vendor = mongoose.model("Vendor", VendorSchema);

module.exports = Vendor;
