const jwt = require('jsonwebtoken');
const Vendor = require('../Module/Vender'); 

const secretKey = process.env.mySecretkey;

const VerifyToken = async (req, res, next) => {
    const token = req.headers.token; 

    if (!token) {
        return res.status(401).json({ error: 'Token is required' });
    }

    try {
        const decoded = jwt.verify(token, secretKey); // Verify the token

       
        const vendor = await Vendor.findById(decoded.vendorid); // Ensure the correct field is used from the token

        if (!vendor) {
            return res.status(404).json({ error: 'Vendor not found' });
        }

        req.vendorId = vendor._id;  // Attach vendorId to the request object
        next();  // Proceed to the next middleware or handler

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Invalid token or token expired' });
    }
};

module.exports = VerifyToken;
