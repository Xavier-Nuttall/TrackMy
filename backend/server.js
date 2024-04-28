const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

/* create the server */
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 3001;

// Serve static files from the 'build' directory (for production)
app.use(express.static(path.join(__dirname, 'build')));

console.log(__dirname);


app.use('/api', require('./api/api'));
 
/* path routing and endpoints */
app.use('/', require('./static_router'));

 
// Route all other requests to the React app's entry point
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

/* start the server */
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});    