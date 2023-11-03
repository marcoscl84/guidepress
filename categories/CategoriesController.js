import express from "express";
const router = express.Router();

router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
});

export default router;