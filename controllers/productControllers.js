const productModel = require('../models/product');
const mongoose = require('mongoose');

// Create a new product
exports.createProducts = async (req, res) => {
    try {
        const { product_name, product_price, isInStock, category } = req.body;
        const product = await productModel.create({ product_name, product_price, isInStock, category });
        return res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error });
    }
};

// Get a product by ID
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product by ID:', error); // Log detailed error to console
        return res.status(500).json({ message: 'An error occurred', error }); // Return error response
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { product_name, product_price, isInStock, category } = req.body;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        const product = await productModel.findByIdAndUpdate(
            id,
            { product_name, product_price, isInStock, category },
            { new: true, runValidators: true }
        );
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        const product = await productModel.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product deleted successfully', product });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error });
    }
};
