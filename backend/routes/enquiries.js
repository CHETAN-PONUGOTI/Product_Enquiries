const express = require('express');
const router = express.Router();
const db = require('../db/db');

const validateEnquiry = (data) => {
    const { name, email, message, product_id } = data;
    const errors = {};
    if (!name) errors.name = 'Name is required.';
    if (!email || !/\S+@\S+\.\S+/.test(email)) errors.email = 'A valid email is required.';
    if (!message) errors.message = 'Message is required.';
    if (!product_id) errors.product_id = 'Product ID is required.';
    if (product_id && isNaN(parseInt(product_id))) errors.product_id = 'Product ID must be a number.';
    return errors;
};

router.post('/', (req, res) => {
    const { product_id, name, email, phone, message } = req.body;

    const errors = validateEnquiry(req.body);
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ message: 'Validation failed', errors });
    }

    const sql = `INSERT INTO enquiries (product_id, name, email, phone, message) VALUES (?, ?, ?, ?, ?)`;
    const params = [product_id, name, email, phone || null, message];

    db.run(sql, params, function (err) {
        if (err) {
            console.error('Error inserting enquiry:', err.message);
            if (err.message.includes('FOREIGN KEY constraint failed')) {
                return res.status(400).json({ message: 'Invalid Product ID.' });
            }
            return res.status(500).json({ message: 'Failed to submit enquiry due to server error.' });
        }
        res.status(201).json({ message: 'Enquiry submitted successfully!', id: this.lastID });
    });
});

const checkAdminAuth = (req, res, next) => {
    const receivedToken = req.headers['x-admin-token'];
    
    const expectedToken = process.env.ADMIN_SECRET_TOKEN ? process.env.ADMIN_SECRET_TOKEN.trim() : null;
    
    if (receivedToken && receivedToken.trim() === expectedToken) {
        next();
    } else {
        console.warn('Unauthorized attempt to access /api/enquiries. Token mismatch or missing.');
        res.status(401).json({ message: 'Unauthorized. Invalid or missing admin token.' });
    }
};

router.get('/', checkAdminAuth, (req, res) => {
    const sql = `
        SELECT 
            e.*, 
            p.name as productName 
        FROM enquiries e
        LEFT JOIN products p ON e.product_id = p.id
        ORDER BY e.created_at DESC
    `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error fetching enquiries:', err.message);
            return res.status(500).json({ message: 'Failed to retrieve enquiries.' });
        }
        res.json(rows);
    });
});

module.exports = router;