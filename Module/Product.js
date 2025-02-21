const mongoose = require('mongoose')

const producSchema = new mongoose.Schema({
    Productname: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    Catagory: [{
        type: String,
        enum: ["Veg", "Non-Veg"],
        required:true
    }],
    Image: {
        type: String,
       
    },

    //Productname, Price, Catagory, Image, BestSeller, Description, 
    BestSeller: {
        type: String,
        required: true
    },
    Description: {
        type: String,
         required: true  
    }, 

    firm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Firm"
    }


})

const Product =mongoose.model('Product', producSchema);
module.exports = Product