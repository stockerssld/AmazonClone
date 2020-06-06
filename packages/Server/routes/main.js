const router = require('express').Router();
const Category= require('./../models/category')

router.route('/categories')
    .get((req,res,next)=>{
        Category.find({},(err, categories)=>{
            res.json({
                success: true,
                message: "Success",
                categories: categories
            })
        })
    })
    .post((req, res, next)=>{
        console.log(req)
        const {name}= req.body
        let category = new Category()
        category.name= name
        category.save();
        res.json({
            success: true,
            message: "Successful",
        })
    })

module.exports = router