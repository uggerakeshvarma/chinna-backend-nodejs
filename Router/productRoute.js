 const express = require('express');
const ProductControl = require('../Contoller/ProductController');


 const route = express.Router();

route.post('/Add-product/:firmId' , ProductControl.AddProduct );
route.get("/:firmId/:products" , ProductControl.getProductId);

route.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.headersSent('Content-type' , 'image/jpeg');
     res.sendFile(path.join(__dirname, '..', 'uploads' , imageName))
});

route.delete('/deleteProduct', ProductControl.DelateProduct)

 module.exports= route;