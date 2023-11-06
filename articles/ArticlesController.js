import express from "express";
import Category from "../categories/Category.js";
import Article from './Article.js';
import slugify from "slugify";

const router = express.Router();

router.get("/admin/articles", (req, res) => {
    res.render("admin/articles/index")
});

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories: categories})
    })
});

router.post("/articles/save", (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect("/admin/articles");
    })
})

export default router;