const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/categories', (req, res) => {
    res.render('categories');
});

module.exports = router;