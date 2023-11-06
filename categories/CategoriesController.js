// import express from "express";
// const router = express.Router();

// router.get("/admin/categories/new", (req, res) => {
//     res.render("admin/categories/new");
// });

// export default router;

import express from "express";
const router = express.Router();
import Category from "./Category.js";
import slugify from "slugify";

router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
});

router.post("/categories/save", (req, res) => {
    var title = req.body.title;
    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/admin/categories/new");
        })
    } else {
        res.redirect("/admin/categories/new");
    }
});

// Lista todas as categorias
router.get("/admin/categories", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/categories/index", {categories: categories})
    })
});

router.post("/categories/delete", (req, res) => {
    var id = req.body.id;

    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/categories");
            })
        } else {
            res.redirect("/admin/categories");
        }
    } else {
        res.redirect("/admin/categories");
    }
});

router.get("/admin/categories/edit/:id", (req, res) => {
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/categories");
    }

    Category.findByPk(id).then(category => {

        console.log(id)

        if(category != undefined){
            res.render("admin/categories/edit", {category: category})
        } 
    }).catch(error => {
        res.redirect("/admin/categories")
    })
})

export default router;