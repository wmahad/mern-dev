const express = require('express');

const app = express();

// import models
require('./models')();
// import routes
require('./routes')(app, express.Router());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server listening on port ${port}`))