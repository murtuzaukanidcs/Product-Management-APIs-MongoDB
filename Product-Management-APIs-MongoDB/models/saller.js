/** Include mongoose. For using MongoDB. It will create using "npm -i mongoose*/
const mongoose = require('mongoose');

/** Craete Company Schema */
const sallerSchema = mongoose.Schema({
    sallerid: String,
    name: String,
    productid: Array
});

/** Create model of saller here .model("{name}" is use as table/collection name of mongoDB) 
 * Last parameter contain exact name for collection/table if it will not specified then it will gave extra 's' on first parameter like saller => prdocts
 * Else you can also define this at satrting of the file "mongoose.pluralize(null);"
 */
const sallerModel = mongoose.model("saller", sallerSchema, "saller");

/** Exprote model for use on other file */
module.exports = sallerModel;