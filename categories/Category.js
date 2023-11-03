import { Sequelize } from "sequelize";
import { connection } from "../database/database";

const Category = connection.define('categories', {
    title: {
        title: Sequelize.STRING,
        allowNull: false
    }, 
    slug: {
        title: Sequelize.STRING,
        allowNull: false
    }
})

export default Category;