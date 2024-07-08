const mongoose = require('mongoose');

// Product Schema
const ProductSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    product_price: {
        type: String,
        required: true
    },
    isInStock: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

// Export Product model
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
