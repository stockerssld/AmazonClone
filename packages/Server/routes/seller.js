const router = require('express').Router()

const Product = require('../models/product')

const aws = require('aws-sdk')
const multer= require('multer')
const multer3= require('multer-s3')
const s3= new aws.S3({accessKeyId:"AKIASPA4H475DDWMVHPS", secretAccessKey:"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"})

const checkJWT = require('./../middlewares/check.jwt')
const upload = multer({
    storage: multer3({
        s3: s3,
        bucket: 'amazonowebappapplication',
        metadata: function(req, file, cb){
            cb(null, {fieldName: file.fieldname})
        },
        key: function(req, file, cb){
            cb(null, Date.now().toString())
        }
    })
})

router.route('/products')
    .get()
    .post([checkJWT, upload.single('product_picture')],(req, res, next)=>{
        
        const {categoryId, title, price, description} = req.body
        const {location} = req.file

        const owner = req.decoded.user._id

        let product = new Product()
        product.owner = owner
        product.category = categoryId
        product.title = title
        product.price = price
        product.descripcion = description
        product.image = location
        product.save()
        
        res.json({
            success: true,
            message: 'Succesfully Added the product.'
        })

    })

module.exports = router;

