import express from "express";
const router = express.Router();

router.get("/categories", (req, res) => {
    res.send("rota categ")
});

router.get("/admin/categories/new", (req, res) => {
    res.send("Nova")
})

export default router;