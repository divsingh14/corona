const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const casesRoute = require('./routes/case');
const errorController = require('./controller/error');

app.set('view engine','ejs');
app.set('views','views');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(casesRoute);
app.use(errorController.pageNotFound);
app.listen(3000);