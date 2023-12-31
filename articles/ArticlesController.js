import express from "express";
import Category from "../categories/Category.js";
import Article from './Article.js';
import slugify from "slugify";
import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

router.get("/admin/articles", adminAuth, (req, res) => {
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
        res.render("admin/articles/index", {articles: articles})
    });
});

router.get("/admin/articles/new", adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories: categories})
    });
});

router.post("/articles/save", adminAuth, (req, res) => {
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
});

// Excluir
router.post("/articles/delete", adminAuth, (req, res) => {
    var id = req.body.id;

    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles");
            })
        } else {
            res.redirect("/admin/articles");
        }
    } else {
        res.redirect("/admin/articles");
    }
});

// Acessa artigo pela id
router.get("/admin/articles/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id;
    
    Article.findByPk(id).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("admin/articles/edit", {article: article, categories: categories});
            })
        } else {
            res.redirect("/");
        }
    }).catch(error => {
        res.redirect("/")
    })
});

// Update artigo
router.post("/articles/update", adminAuth, (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.update({title:title, body: body, categoryId: category, slug: slugify(title)}, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/articles")
    }).catch(error => {
        res.redirect("/")
    })
});

// Paginação
router.get("/articles/page/:num", (req, res) => {
    var page = req.params.num
    var offset = 0;
    var limit = 4;

    if(isNaN(page) || page == 1){
        offset = 0;
    } else {
        offset = (parseInt(page) - 1) * limit;
    }

    Article.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [
            ['id', 'DESC']
        ],
    }).then(articles => {
        var nextPage;
        if(offset + limit >= articles.count){
            nextPage = false;
        } else {
            nextPage = true;
        }

        var result = {
            page: parseInt(page),
            nextPage: nextPage,
            articles: articles 
        }

        Category.findAll().then(categories => {
            res.render("admin/articles/page", {result: result, categories: categories});
        })

    })
})

export default router;