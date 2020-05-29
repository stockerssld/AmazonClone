const router = require('express').Router()

const Product = require('../models/product')

const aws = require('aws-sdk')
const multer= require('multer')
const multer2= require('multer-s3')
const s3= new aws.S3({accessKeyId:"AKIASPA4H475DDWMVHPS", secretAccessKey:"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"})

module.exports = router;

