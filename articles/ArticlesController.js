import express from "express";
const router = express.Router();

router.get("/articles", (req, res) => {
    res.send("rota art")
});

router.get("/admin/articles/new", (req, res) => {
    res.render("admin/articles/new")
})

export default router;