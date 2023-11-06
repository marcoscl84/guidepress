import { Sequelize } from "sequelize";

export const connection = new Sequelize('guidepress', 'root', '4497', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});