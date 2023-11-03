import { Sequelize } from "sequelize";
import { connection } from "../database/database";

const Article = connection.define('articles', {
    title: {
        title: Sequelize.STRING,
        allowNull: false
    }, 
    slug: {
        title: Sequelize.STRING,
        allowNull: false
    },
    body: {
        title: Sequelize.TEXT,
        allowNull: false
    }
})

export default Article;