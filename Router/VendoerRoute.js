const express = require('express')

const VendorControllers = require('../Contoller/VendorController')


const router =  express.Router()

router.post('/register' ,  VendorControllers.vendorRegister);
router.post("/Login" , VendorControllers.Vendorlogin)
router.get('/getall-vendor',  VendorControllers.getVendorID)
router.get('/single/:id', VendorControllers.getsingleid);



module.exports = router;