const express = require('express');
const pool = require('./db');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('SUP');
    res.redirect('/trackmy');
});

router.get('/trackmy/', async (req, res) => {
    console.log('SUP');
    res.render('index');
});

module.exports = router; 