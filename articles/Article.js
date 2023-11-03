import { Sequelize } from "sequelize";
import { connection } from '../database/database.js';
import Category from '../categories/Category.js';

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Category.hasMany(Article) // relacinamento 1 x m
Article.belongsTo(Category) // relacionamento 1 x 1

// Article.sync({ force: true });

export default Article;