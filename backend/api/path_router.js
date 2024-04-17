const express = require('express');
const pool = require('./dbsetup');
const router = express.Router();
const socketIo = require('socket.io-client');
const socket = socketIo('http://localhost:3000');

router.get('/', async (req, res) => {
    console.log('SUP');
    res.redirect('/trackmy');
});

router.get('/trackmy/', async (req, res) => {
    console.log('SUP');
    res.render('index');
});

module.exports = router; 