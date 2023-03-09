import express from "express";
import Product from "../models/Product.js";

var router = express.Router();

router.post("/create" , async (req,res,next) => { 
    if (req.user.isAdmin) { 
         await Product.create(req.body) // name : ,description : ,price : 
         return res.send(true)
    }
    return res.send("Dont have permission")
})


router.post("/archive" , async (req,res,next) => { 
    if (req.user.isAdmin) { 
         await Product.updateOne({ name : req.body.name} , {"$set" : {
             isActive : false 
         }}) // name : ,description : ,price : 
         return res.send(true)
    }
    return res.send("Dont have permission")
})


router.post("/update" , async (req,res,next) => { 
    if (req.user.isAdmin) { 
         await Product.update({ "name" : req.body.name }, { "$set" : req.body.update }) // name : ,description : ,price : 
         return res.send(true)
    }
    return res.send("Dont have permission")
})

router.get("/getProduct",async (req,res) => { 
    let data = await Product.findOne(req.body) 
    return res.send( data )
})

router.get("/activeProducts",async (req,res) => { 
    let data = await Product.find({ isActive : true }) 
    return res.send( data )
})






export default router ; 