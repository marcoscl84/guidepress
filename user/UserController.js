import express from 'express';
import User from './User.js';
const router = express.Router();
import bcrypt from 'bcryptjs'
import adminAuth from '../middlewares/adminAuth.js';

router.get("/admin/users", adminAuth, (req, res) => {
    User.findAll().then(users => {
        res.render("admin/users/index", {users: users})
    })
});

router.get("/admin/users/create", adminAuth, (req, res) => {
    res.render("admin/users/create")
});

router.post("/users/create", adminAuth, (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where:{email: email}}).then(user => {
        if(user == undefined){

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
        
            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/");
            }).catch(error => {
                res.redirect("/")
            })

        } else {
            res.redirect("/admin/users/create");
        }
    })
});

router.get("/login", (req, res) => {
    res.render("admin/users/login")
});

router.post("/authenticate", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where: {email: email}}).then(user => {
        if(user != undefined){
            var isCorrectPassword = bcrypt.compareSync(password, user.password);

            if(isCorrectPassword) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                
                res.redirect("/admin/articles")
            } else {
                res.redirect("/login")
            }

        } else {
            res.redirect("/login")
        }
    })
})

export default router;