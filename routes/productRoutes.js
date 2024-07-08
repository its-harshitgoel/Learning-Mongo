const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');

// Create a new product
router.post('/', productController.createProducts);

// Get all products
router.get('/', productController.getAllProducts);

// Get a product by ID
router.get('/:id', productController.getById);

// Update a product by ID
router.put('/:id', productController.updateProduct);

// Delete a product by ID
router.delete('/:id', productController.deleteProduct);

module.exports = router;
