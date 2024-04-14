const express = require('express');
const pool = require('./db/db.js');
const router = express.Router();
const path = require('path');

router.get('/', async (req, res) => {
    res.redirect('/trackmy');
});

router.get('/trackmy/', async (req, res) => {
    res.render('index');
});