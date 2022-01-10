const express = require('express');
const { Mongoose } = require('mongoose');
const router = express.Router()
router.use(express.json());

/** Use Saller from Module directory */
const sallerModel = require("../models/saller");
const productModel = require("../models/product");

/* -------------------------- SELLER  MODULE -------------------------- */

/** Find/Get all product details from database, here "async" making the request and response asynchronous, "await" which makes the program wait until the Promise resolves. */
router.get("/", async(req, res) => {
    const sallerList = await sallerModel.find();

    /** Check weather data is stored on product collection/table or not */
    if (sallerList.length === 0) {
        return res.json({ message: "No data found on Saller" })
    }
    return res.json({ data: sallerList });
});

/** Add/Post saller detail on database. */
router.post("/", (req, res) => {
    const newsaller = req.body;
    sallerModel.create(newsaller);
    return res.json({ message: "Saller add successfully" });
});

/** Fetch seller details based on product name */
router.get("/:name", async(req, res) => {

    /** Get Parameter list on name constatnt variable */
    const name = req.params.name

    /** Declare Product model for fetch data from product collection/table  */
    const productModel = require("../models/product");
    // console.log(productModel);
    /** Find Data from product collection/table where title is same as parameter */
    const index = await productModel.find({ title: name });

    /** Check data found or not on product */
    if (index.length < 1) {
        return res.json({ message: "Sorry No data found by name of ${name}" })
    }

    /** Find Data from company collection/table where saller id is same as product id */
    const a = []
    var id = index[0].sellerid
    for (var i = 0; i < id.length; i++) {
        const sallerIndex = await sallerModel.find({ sallerid: id[i] })
        a.push(sallerIndex)
    }
    res.json({ a })

});

/** Fetch all products of a saller */
router.get("/product/all", async(req, res) => {
    const sallerList = await sallerModel.find();

    /** Check weather data is stored on saller collection/table or not */
    if (sallerList.length === 0) {
        return res.json({ message: "No data found on Saller" })
    }
    /** Define json variable for store data */
    const jsonOutput = []

    /** Traverse all saller which was fetch from DB */
    for (var i = 0; i < sallerList.length; i++) {
        /** Define null array to store Product Name */
        productName = []

        /** Store all array of prodcut ID on variable */
        var countProduct = sallerList[i].productid;

        /** Traverse all product which match both side */
        for (var j = 0; j < countProduct.length; j++) {
            const productList = await productModel.find({ "productid": countProduct[j] })

            /** Store data of product on array formate */
            productName[j] = productList[0].title;
        }

        /** Add all formatted data on JSON format */
        jsonOutput.push({
            "Saller Name": sallerList[i].name,
            "Product Name": productName
        })
    }

    /** Return  json output for display*/
    return res.json({ jsonOutput });
});

/** Update Saller */
router.put("/:name", async(req, res) => {
    /** Take parameter name */
    const name = req.params.name;

    /** Get new productids form body */
    const ids = req.body.productid;

    /** Fetch companyList by company Name */
    const sallerList = await sallerModel.find({ "name": name })

    if (sallerList.length < 1) {
        return res.json({ "Message": "Sorry no data found of company name " + name })
    }
    sallerModel.findByIdAndUpdate(sallerList[0]._id, { productid: ids }, function(err, docs) {
        if (err) {
            log(err);
        } else {
            res.json({ "Updated Data : ": docs });
        }
    });
})

/** Delete Saller */
router.delete("/:name", async(req, res) => {
    const name = req.params.name;

    /** Fetch product list by product Name */
    sallerModel.deleteMany({ "name": name }).then(function() {
        console.log("Data deleted"); // Success
        return res.send("Data deleted"); // Success
    }).catch(function(error) {
        console.log(error); // Failure
        return res.send(error); // Failure
    });
});

/** Export router for other file inclusion */
module.exports = router