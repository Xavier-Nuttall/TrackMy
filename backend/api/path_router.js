const express = require('express');
const pool = require('./db');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('SUP');
    res.redirect('/trackmy');
});

router.get('/trackmy/', async (req, res) => {
    console.log('redirct');
    // res.render('index');
    // console.log("broke");
    res.status(404).send("oops");
});

module.exports = router; 