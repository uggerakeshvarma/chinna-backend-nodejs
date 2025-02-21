const Firm = require('../Module/Firm');
const multer = require('multer');
const Vendor = require('../Module/Vender'); // Ensure correct import path
const path = require('path');

// Configure multer storage settings
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Initialize multer with the storage settings
const upload = multer({ storage: storage }); 

const AddFirm = async (req, res) => {
    try {
        const { FirmName, Area, Catagory, Region, Offer } = req.body;

        // Handle the image upload
        const Image = req.file?.filename || undefined;

        // Ensure vendorId is available, either from the token or the body
        const vendorId = req.vendorId || req.body.vendorId;  // This line checks both token and body
        if (!vendorId) {
            return res.status(400).json({ message: 'Vendor ID is required' });
        }

        console.log("Vendor ID received:", vendorId);

        // Find the vendor by vendorId
        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor Not Found' });
        }

        // Create and save the new Firm
        const firm = new Firm({
            FirmName, 
            Area, 
            Catagory, 
            Region, 
            Offer, 
            Image, 
            Vendor: [vendor._id]  // Store vendor ID as an array (if your schema expects an array)
        });

        await firm.save();

        // Add the new firm to the vendor's firm array
        vendor.firm.push(firm._id);
        await vendor.save();  // Save the updated vendor

        return res.status(200).json({ message: 'Firm Added Successfully', firm });

    } catch (error) {
        console.error("Error adding firm:", error);
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

const deletFirm = async(req, res) => {
    try {
     const FirmId = req.params.FirmId   ;
     const deletefirm = await Firm.findByIdAndDelete(FirmId)
     if(!deletefirm){
        return res.status(404).json({error: "Not found Firm"})
     }

    } catch (error) {
        console.error("Error adding firm:", error);
        return res.status(500).json({ message: 'Internal Server Error', error });
        
    }
}


// Export the middleware and the handler
module.exports = { AddFirm: [upload.single('Image'), AddFirm],
    deletFirm

 };
