/** Include mongoose. For using MongoDB. It will create using "npm -i mongoose*/
const mongoose = require('mongoose');

/** Craete Products Schema */
const productSchema = mongoose.Schema({
    productid: String,
    title: String,
    price: String,
    category: Array,
    companyid: String,
    sellerid: Array
});

/** Create model of product here .model("{name}" is use as table/collection name of mongoDB) 
 * Last parameter contain exact name for collection/table if it will not specified then it will gave extra 's' on first parameter like product => prdocts
 * Else you can also define this at satrting of the file "mongoose.pluralize(null);"
 */
const productModel = mongoose.model("product", productSchema, "product");

/** Exprote model for use on other file */
module.exports = productModel;