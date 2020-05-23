const router = require('express').Router()
const jwt = require('jsonwebtoken');

const User = require('../models/user')
const config = require('./../config')
const checkJWT = require('./../middlewares/check.jwt')
router.post('/signup',(req, res, next)=>{
    // console.log(req.body);
    const {name, email,password, isSeller}= req.body
    let user = new User()
    user.name = name;
    user.email = email
    user.password = password
    user.picture = user.gravatar( )
    user.isSeller = isSeller

    User.findOne({email: email},(err, existinguser)=>{
        if(existinguser){
            res.json({
                success: false,
                message: 'Account with thath email is already exits',
            })
        }else{
            user.save()
            var token =jwt.sign({
                user: user,
            }, config.secret,{
                expiresIn:'7d'
            })
            res.json({
                success:true,
                message:'Enjoy  your token',
                token: token
            })
        }
    })
})

router.post('/login', (req, res, next) => {

    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;
  
      if (!user) {
        console.log(1)

        res.json({
          success: false,
          message: 'Authenticated failed, User not found'
        });
      } else if (user) {
          const validPassword=user.comparePassword(req.body.password)
          if (!validPassword) {
            res.json({
              success: false,
              message: 'Authentication failed. Wrong password'
            });
          } 
        else {
          var token = jwt.sign({
            user: user
          }, config.secret, {
            expiresIn: '7d'
          });
    
          res.json({
            success: true,
            mesage: "Enjoy your token",
            token: token
          });
        }
      } 
    });
  });

router.route('/profile')
.get(checkJWT,(req, res, next)=>{
  User.findOne({_id: req.decoded.user._id}, (err, user)=>{
    res.json({
      success: true,
      user: user, 
      message: "Successful"
    })
  })
})
.post(checkJWT, (req, res, next)=>{
  User.findOne({_id: req.decoded.user._id}, (err, user)=>{
    const {name, email, password, isSeller} = req.body
    if(err) return next(err)
    if(name) user.name = name
    if(email) user.email = email
    if(password) user.password = password

    user.isSeller = isSeller

    user.save()
    res.json({
      success: true,
      message: 'Successfully edited your profile.'
    })
  })
})
router.route('/address')
  .get(checkJWT,(req, res, next)=>{
    User.findOne({_id: req.decoded.user._id}, (err, user)=>{
      res.json({
        success: true,
        address: user.address, 
        message: "Successful"
      })
    })
  })
  .post(checkJWT, (req, res, next)=>{
    User.findOne({_id: req.decoded.user._id}, (err, user)=>{
      // const {addr1, email, password, isSeller} = req.body
      console.log(req.body)
     if(err) return next(err)
     if(req.body.addr1) user.address.addr1 = req.body.addr1
     if(req.body.addr2) user.address.addr2 = req.body.addr2
     if(req.body.city) user.address.city = req.body.city
     if(req.body.country) user.address.country = req.body.country
     if(req.body.postalCode) user.address.postalCode = req.body.postalCode

     
      user.save()
      res.json({
        success: true,
        message: 'Successfully edited your address.'
      })
    })
  })

module.exports = router