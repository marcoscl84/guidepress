import express from "express";
import Category from "../categories/Category.js"

const router = express.Router();

router.get("/articles", (req, res) => {
    res.send("rota art")
});

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories: categories})
    })
})

export default router;