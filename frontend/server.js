const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const fileUpload = require('express-fileupload');

/* create the server */
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());

const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* host public/ directory to serve: images, css, js, etc. */
app.use(express.static('public'));
 
/* path routing and endpoints */
app.use('/', require('./backend/api/path_router'));

 
app.get('*', (request, response) => {
    response.status(404);
    response.render('404'); 
});    

/* start the server */
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
}); 