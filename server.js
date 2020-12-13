const express = require('express');
const handlebars = require("handlebars");
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access");
const db = require('./models');
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ 
defaultLayout: "main",
handlebars: allowInsecurePrototypeAccess(handlebars) 
}));
app.set("view engine", "handlebars");





const dogsController = require('./controllers/dogsController.js');
app.use(dogsController);

const volunteersController = require('./controllers/volunteersController.js');
app.use(volunteersController);

const dashboardController = require('./controllers/dashboardController.js');
app.use(dashboardController);

// db.sequelize.sync({force: true}).then(() => {
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("App listening on http://localhost:" + PORT);
    })
})
