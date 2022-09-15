if (process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

//SET-UP
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');  
const ejsMate = require('ejs-mate');

app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


// SECURITY
const mongoSanitize = require('express-mongo-sanitize');
app.use(
    mongoSanitize({
      replaceWith: ' ',
    }),
);



app.get('/home', (req, res) => {
    res.send("NVCTI WEB TEAM");
})


const port = process.env.PORT || 3000;

app.listen(port);