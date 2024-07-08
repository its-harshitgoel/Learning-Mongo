require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose
    .connect(
        process.env.MONGODB_URI,
    )
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log('Connection failed', err);
    });

// ProductSchema
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

const productModel = mongoose.model('Product', ProductSchema);

// Get All Products
app.get('/api/products', async (req, res) => {
    try {
        const products = await productModel.find({});
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error });
    }
});

// Get a product by ID
app.get('/api/products/:id', async (req, res) => {
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
        return res.status(500).json({ message: 'An error occurred', error });
    }
});

// Create A Product
app.post('/api/products', async (req, res) => {
    try {
        const product = await productModel.create({
            product_name: req.body.product_name,
            product_price: req.body.product_price,
            isInStock: req.body.isInStock,
            category: req.body.category
        });
        return res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error });
    }
});

// Delete A Product
app.delete('/api/products/:id', async (req, res) => {
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
});

// Update A Product
app.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        const product = await productModel.findByIdAndUpdate(
            id,
            {
                product_name: req.body.product_name,
                product_price: req.body.product_price,
                isInStock: req.body.isInStock,
                category: req.body.category
            },
            { new: true, runValidators: true }
        );
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error });
    }
});

app.listen(8086, () => {
    console.log('Server is running on port 8086');
});
