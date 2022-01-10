const { json } = require('express');
const express = require('express')
const router = express.Router()
router.use(express.json());

/** Use Company from Module directory */
const companyModel = require("../models/company");
const productModel = require('../models/product');

/* -------------------------- COMPANY MODULE -------------------------- */

/** Find/Get all company details from database, here "async" making the request and response asynchronous, "await" which makes the program wait until the Promise resolves. */
router.get("/", async(req, res) => {
    const companyList = await companyModel.find();

    /** Check weather data is stored on company collection/table or not */
    if (companyList.length === 0) {
        return res.json({ message: "No data found on Company" })
    }
    return res.json({ data: companyList });
});

/** Find/Get all company details from database based on product name*/
router.get("/:name", async(req, res) => {
    /** Get Parameter list on name constatnt variable */
    const name = req.params.name

    /** Declare Product model for fetch data from product collection/table  */
    const productModel = require("../models/product");

    /** Find Data from product collection/table where title is same as parameter */
    const index = await productModel.find({ title: name });

    /** Check data found or not on product */
    if (index.length < 1) {
        return res.json({ message: "Sorry No data found by name of ${name}" })
    }

    /** Find Data from company collection/table where company id is same as product id */
    const companyIndex = await companyModel.find({ id: index[0].id });

    /** Check data found or not on company */
    if (companyIndex.length < 1) {
        return res, json({ message: "Sorry No data found by name of ${name}" })
    }

    return res.json({
        "Company Name": companyIndex[0].name,
        "Product Name": index[0].title,
    })
});

/** Fetch all products of a company */
router.get("/product/all", async(req, res) => {
    const companyList = await companyModel.find();

    /** Check weather data is stored on company collection/table or not */
    if (companyList.length === 0) {
        return res.json({ message: "No data found on Company" })
    }
    /** Define json variable for store data */
    const jsonOutput = []

    /** Traverse all company which was fetch from DB */
    for (var i = 0; i < companyList.length; i++) {
        /** Define null array to store Product Name */
        productName = []

        /** Store all array of prodcut ID on variable */
        var countProduct = companyList[i].productid;

        /** Traverse all product which match both side */
        for (var j = 0; j < countProduct.length; j++) {
            const productList = await productModel.find({ "productid": countProduct[j] })

            /** Store data of product on array formate */
            productName[j] = productList[0].title;
        }

        /** Add all formatted data on JSON format */
        jsonOutput.push({
            "Company Name": companyList[i].name,
            "Product Name": productName
        })
    }

    /** Return  json output for display*/
    return res.json({ jsonOutput });
});

/** Add/Post company detail on database. */
router.post("/", (req, res) => {
    const newcompany = req.body;
    companyModel.create(newcompany);
    return res.json({ message: "Company add successfully" });
});

/** Update company */
router.put("/:name", async(req, res) => {
    /** Take parameter name */
    const name = req.params.name;

    /** Get new productids form body */
    const ids = req.body.productid;
    console.log(ids);
    /** Fetch companyList by company Name */
    const companyList = await companyModel.find({ "name": name })

    if (companyList.length < 1) {
        return res.json({ "Message": "Sorry no data found of company name " + name })
    }
    companyModel.findByIdAndUpdate(companyList[0]._id, { productid: ids }, function(err, docs) {
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

    /** Delete company list by company Name */
    productModel.deleteMany({ "name": name }).then(function() {
        console.log("Data deleted"); // Success
        return res.send("Data deleted"); // Success
    }).catch(function(error) {
        console.log(error); // Failure
        return res.send(error); // Failure
    });
});
/** Export router for other file inclusion */
module.exports = router