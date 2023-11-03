import bodyParser from "body-parser";
import express from "express";
import { connection } from './database/database.js';

const app = express();

// View engine
app.set('view engine', 'ejs');

// Static archives
app.use(express.static('public'));

// Body parser
app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());

// Database
connection.authenticate().then(() => {
    console.log('Conection success!');
}).catch((error) => {
    console.log(error);
})

app.get("/", (req, res) => {
    res.render("index");
})

app.listen(8080, () => {
    console.log("Server is running on port 8080!");
})