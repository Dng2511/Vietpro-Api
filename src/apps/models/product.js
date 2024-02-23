const database = require('../../common/database')();
const ProductSchema = new database.Schema({
    name: string,
    price: number,
});


