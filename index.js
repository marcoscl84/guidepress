import bodyParser from "body-parser";
import express from "express";

const app = express();

// View engine
app.set('view engine', 'ejs');

// Static archives
app.use(express.static('public'));

// Body parser
app.use(bodyParser.urlencoded({extends: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.render("index");
})

app.listen(8080, () => {
    console.log("Server is running on port 8080!");
})