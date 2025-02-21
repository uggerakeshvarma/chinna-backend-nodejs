
const firmController = require('../Contoller/FirmController')
const express = require('express')
const { route } = require('./VendoerRoute')
const VerifyTokens = require('../MiddleWare/VerifyToken')

const router = express.Router()

router.post('/Add-Firm' , VerifyTokens, firmController.AddFirm);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.headersSent('Content-type' , 'image/jpeg');
     res.sendFile(path.join(__dirname, '..', 'uploads' , imageName))
});

router.delete('/:DleteFirm' , firmController.deletFirm)

module.exports = router