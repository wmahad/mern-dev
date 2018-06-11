const path = require('path');
const express = require('express');

const app = express();

// create virtual prefix to serve static files
const rootDir = path.join(path.dirname(path.basename(path.dirname(__dirname))), 'public');
app.use('/assets', express.static(rootDir));

// set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// import models
require('./models')();
// import routes
require('./routes')(app, express.Router());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server listening on port ${port}`))