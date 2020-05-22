const router = require('express').Router()
const jwt = require('jsonwebtoken');

const User = require('../models/user')
const config = require('./../config')
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

module.exports = router