import express from "express";
import User from "../models/User.js"
import Product from "../models/Product.js";
var router = express.Router();

router.get("/userDetails" , async ( req,res) => { 
     let data = await User.findOne({ email : req.user.email })
     return res.send( data )
})

router.get("/createOrder", async (req,res) => { 
    let products = req.body ;
    let total = 0 
    products.map(({ productName, quantity })=> { 
        Product.findOne({ name : productName }).then((res) => { 
            total += res.price * quantity 
        })
    }) 
    await User.updateOne({ email : req.user.email } , { "$push" : { 
        orders : { products : products , totalAmount : total }
    }})
    return res.send(true)
})


export default router;
