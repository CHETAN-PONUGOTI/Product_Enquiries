const express = require('express');
const router = express.Router();
const db = require('../db/db');

const escapeSearch = (term) => term.replace(/([%_])/g, '$$1');

router.get('/', (req, res) => {
  const { search, category, page = 1, limit = 6 } = req.query;
  const parsedLimit = parseInt(limit) || 6;
  const currentPage = parseInt(page) || 1;
  const offset = (currentPage - 1) * parsedLimit;

  let whereClauses = [];
  let params = [];
  let countParams = []; 

  if (search) {
    whereClauses.push(`name LIKE ?`);
    const searchTerm = `%${escapeSearch(search)}%`;
    params.push(searchTerm);
    countParams.push(searchTerm);
  }

  if (category && category !== 'All') {
    whereClauses.push(`category = ?`);
    params.push(category);
    countParams.push(category);
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

  const countSql = `SELECT COUNT(id) AS total FROM products ${whereSql}`;
  
  db.get(countSql, countParams, (err, countRow) => {
    if (err) {
      console.error('SQL Error fetching product count:', err.message);
      return res.status(500).json({ message: 'Error fetching product count.' });
    }
    
    const totalItems = countRow.total;
    const totalPages = Math.ceil(totalItems / parsedLimit);

    const productSql = `SELECT * FROM products ${whereSql} LIMIT ? OFFSET ?`;
    params.push(parsedLimit, offset);

    db.all(productSql, params, (err, rows) => {
      if (err) {
        console.error('SQL Error fetching products:', err.message);
        return res.status(500).json({ message: 'Error fetching products due to database query failure.' });
      }

      res.json({
        products: rows,
        page: currentPage,
        limit: parsedLimit,
        totalItems,
        totalPages,
      });
    });
  });
});

router.get('/', (req, res) => {
  console.log('--- HIT PRODUCTS ROUTE ---'); 
  
  res.json({
    products: [{ id: 99, name: "TEST PRODUCT", price: 1.00, category: "Test" }],
    page: 1,
    limit: 1,
    totalItems: 1,
    totalPages: 1,
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM products WHERE id = ?';

  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching product details.' });
    }
    if (!row) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.json(row);
  });
});


router.get('/categories', (req, res) => {
  const sql = 'SELECT DISTINCT category FROM products ORDER BY category ASC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('SQL Error fetching categories:', err.message);
      return res.status(500).json({ message: 'Error fetching categories.' });
    }
    const categories = rows.map(row => row.category);
    res.json(categories);
  });
});

module.exports = router;