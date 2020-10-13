
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const userRoutes = require('./Routes/UserRoutes');
const shoppingList = require('./Routes/ShoppingListRoutes');

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/shopping', shoppingList);

module.exports = app;