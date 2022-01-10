const express = require('express')
const router = express.Router()
router.use(express.json());

/** Use Prodcut from Module directory */
const productModel = require("../models/product");

/* -------------------------- PRODUCT MODULE -------------------------- */
/** Find/Get all product details from database, here "async" making the request and response asynchronous, "await" which makes the program wait until the Promise resolves. */
router.get("/", async(req, res) => {
    const productList = await productModel.find();

    /** Check weather data is stored on product collection/table or not */
    if (productList.length === 0) {
        return res.json({ message: "No data found on Product" })
    }
    return res.json({ data: productList });
});

/** Add/Post product detail on database. */
router.post("/", (req, res) => {
    const newProduct = req.body;
    productModel.create(newProduct);
    return res.json({ message: "Product add successfully" });
})

/** Update product (add/remove category) */
router.put("/:name", async(req, res) => {
    /** Take parameter name */
    const name = req.params.name;

    /** Get new product category form body */
    const category = req.body.category;

    /** Fetch product list by product Name */
    const productList = await productModel.find({ "title": name })

    if (productList.length < 1) {
        return res.json({ "Message": "Sorry no data found of product name " + name })
    }
    productModel.findByIdAndUpdate(productList[0]._id, { category: category }, function(err, docs) {
        if (err) {
            log(err);
        } else {
            res.json({ "Updated Data : ": docs });
        }
    });
})

/** Delete product */
router.delete("/:name", async(req, res) => {
    const name = req.params.name;

    /** Fetch product list by product Name */
    productModel.deleteMany({ "title": name }).then(function() {
        console.log("Data deleted"); // Success
        return res.send("Data deleted"); // Success
    }).catch(function(error) {
        console.log(error); // Failure
        return res.send(error); // Failure
    });
});

/** Export router for oy=ther file inclusion */
module.exports = router