import express from "express";

const app = express();

// View engine
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("index");
})

app.listen(8080, () => {
    console.log("Server is running on port 8080!");
})