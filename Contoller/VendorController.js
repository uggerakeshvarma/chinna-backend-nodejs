const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  // Fixed import name
const DOTENV = require("dotenv");
const Vendor = require('../Module/Vender');
const { json } = require('body-parser');


DOTENV.config();
const secretKey = process.env.mySecretkey;

const vendorRegister = async (req, res) => {
    const { UserName, Email, Password } = req.body;

    try {
        const existingVendor = await Vendor.findOne({ Email });
        if (existingVendor) {
            return res.status(400).json({ Message: "Email already used" });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        const newVendor = new Vendor({
            UserName,
            Email,
            Password: hashedPassword
        });

        await newVendor.save();
        res.status(201).json({ Message: "Vendor registered successfully" });
        console.log('Vendor registered successfully');
    } catch (error) {
        console.error('Error during register:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const Vendorlogin = async (req, res) => {
    const { Email, Password } = req.body

    try {

        const vendor = await Vendor.findOne({ Email });
        if (!vendor || !(await bcrypt.compare(Password, vendor.Password))) {
            return res.status(401).json({ error: "Involid UserName nad Password" })
        }
        const token = jwt.sign({ vendorid: vendor._id }, secretKey, { expiresIn: "1h" });

        console.log("Generated Token:", token); // Log the token to confirm it's generated properly
        


        res.status(200).json({ Sucsess: "Login Succsesfully", token })
        console.log(Email, "This Is My ", token)

    } catch (error) {
        console.log(error)
        res.status(400).json([error, "Internal Server Error"])
    }
}

//get Vendor Id

const getVendorID = async(req, res) => {
    try {
        const vendor = await Vendor.find().populate('firm')
        res.json({vendor})
    } catch (error) {
        console.log(error)
        res.status(400).json([error, "Internal Server Error"])
    }
}

//get by each Id
const getsingleid = async (req, res) => {
    const vendorId = req.params.id;
   // Log the ID for debugging
    try {
        const vendor = await Vendor.findById(vendorId).populate('firm');
        if (!vendor) {
            return res.status(404).json({ error: "Vendor Not Found" });
        }
        return res.status(200).json(vendor);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: "Internal Server Error"});
    }
};


module.exports = { vendorRegister, Vendorlogin,getVendorID , getsingleid };
