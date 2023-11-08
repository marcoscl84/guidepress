import bodyParser from "body-parser";
import express from "express";
import { connection } from './database/database.js';

import categoriesController from './categories/CategoriesController.js'
import articlesController from './articles/ArticlesController.js'
import usersController from './user/UserController.js'

import Article from "./articles/Article.js";
import Category from "./categories/Category.js";
import User from "./user/User.js";

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
});

app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", usersController);

app.get("/", (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories});
        })
    })
});

app.get("/:slug",(req, res) => {
    var val = req.params.slug;

    Article.findOne({
        where: {
            slug: val
        }
    }).then(article => {
        if (article != undefined){
            Category.findAll().then(categories => {
                res.render("article", {article: article, categories: categories});
            })            
        } else {
            res.redirect("/");
        }
    }).catch(error => {
        res.redirect("/");
    })
});

// Busca categoria por slug
app.get("/category/:slug", (req, res) => {
    var val = req.params.slug
    Category.findOne({
        where: {
            slug: val
        },
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined){
            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles, categories: categories})
            })
        } else {
            res.redirect("/");
        }
    }).catch(error => {
        res.redirect("/");
    })
})

app.listen(8080, () => {
    console.log("Server is running on port 8080!");
})