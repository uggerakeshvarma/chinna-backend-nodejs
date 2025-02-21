const mongoose = require('mongoose');

const Firm = require('../Module/Firm')
const multer = require('multer');
const Product = require('../Module/Product');


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


const AddProduct = async (req, res) => {
    try {
        // Destructure input from req.body
        const { Productname, Price, Catagory, BestSeller, Description } = req.body;

        // Handle image file
        const Image = req.file ? req.file.filename : undefined;
        const firmId = req.params.firmId

        // Find the firm using firmId
        const firm = await Firm.findById(firmId);
        if (!firm) {
            return res.status(404).json({ error: "Firm not found is fdo" });
        }

        // Create a new product
        const product = new Product({
            Productname,
            Price,
            Catagory,
            BestSeller,
            Image,
            Description,
            firm: firm._id
        });


        const savedProduct = await product.save();


        firm.products.push(savedProduct);


        await firm.save();


        res.status(201).json({ message: "Product added successfully", product: savedProduct });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding product", error: error.message });
    }
};

const getProductId = async (req, res) => {
    try {
        const firmId = await req.params.firmId;

        const firm = await Firm.findById(firmId);
        if (!firm) {
            return res.status(404).json({ error: "Firm Not Found" });

        }

        const RestaruntName = firm.FirmName;
        const products = await Product.find({ firm: firmId });
        res.status(200).json({ RestaruntName, products })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

const DelateProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const delateproduct = await Product.findByIdAndDelete(productId);
        if (!delateproduct) {
            return res.status(404).json({ error: "Not Found Product" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports = {
    AddProduct: [upload.single('Image'), AddProduct],
    getProductId,
    DelateProduct


};

