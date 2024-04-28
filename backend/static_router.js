const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('static hit');
    res.redirect('/trackmy');
});

router.get('/trackmy/', async (req, res) => {
    console.log('redirct');
    // res.render('index');
    // console.log("broke");
    res.status(404).send("oops");
});

router.post('/register/', async (req, res) => {

})

// User log in page
router.get('/login/', async (req, res) => {
    //check credentials then fetch page
    res.render('login')
})

// Home page after users have logged in
router.get('/', async (req, res) => {
    res.render('home_before-login');
});

// notifications site
router.get('/notifications/', async (req, res) => {
    res.render('notifs');
});

// Profile page
router.get('/Profile/', async (req, res) => {
    res.render('profile');
});

// about page
router.get('/About/', async (req, res) => {
    res.render('about');
});

router.get('/settings/', async (req, res) => {
    res.render('settings')
})

// Room information
router.get('/Rooms/', async (req, res) => {
    //retrieves data from sql for information on all the rooms
    //const rooms = await pool.query('SELECT * FROM rooms');
    res.render('rooms', );
});

// Specific Room Information
router.get('/Room-Information/', async (req, res) => {
    //const roomId = req.params.roomId;
    //const roomData = await pool.query(SQL statement to get a specific rooms id);
    res.render('Specific_room_info');
});

module.exports = router; 