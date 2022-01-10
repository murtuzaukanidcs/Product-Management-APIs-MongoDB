/** Include mongoose. For using MongoDB. It will create using "npm -i mongoose*/
const mongoose = require('mongoose');

/** Craete Company Schema */
const companySchema = mongoose.Schema({
    companyid: String,
    name: String,
    productid: Array
});

/** Create model of company here .model("{name}" is use as table/collection name of mongoDB) 
 * Last parameter contain exact name for collection/table if it will not specified then it will gave extra 's' on first parameter like company => prdocts
 * Else you can also define this at satrting of the file "mongoose.pluralize(null);"
 */
const companyModel = mongoose.model("company", companySchema, "company");

/** Exprote model for use on other file */
module.exports = companyModel;