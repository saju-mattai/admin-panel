const { response } = require('express');
var express = require('express');
var router = express.Router();
var userHelper=require('../helpers/user')
var userHelper_1=require('../helpers/userhelpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    res.redirect('/home')
  }else{
    res.render('user-signup')
  }
 
});
router.post('/',(req,res)=>{
  userHelper_1.doSignup(req.body)
  res.redirect('/login')
})
router.get('/login',(req,res)=>{
  if(req.session.user){
    res.redirect('/home')
  }else{

  res.render('user-login',{loginErr:req.session.loginErr})
  req.session.loginErr=false
  }
})


router.post('/login',(req,res)=>{
 

  userHelper_1.doLogin(req.body).then((response)=>{

    if(response.status){
      req.session.user=response.user
      res.redirect('/home')
    }else{
    req.session.loginErr='invalid user or password'
      res.redirect('/login')
    }
  })
    
  })

  router.get('/home',(req,res)=>{
    let user=req.session.user
    if(req.session.user){
      res.render('home-page',{user})
    }
    else{
       res.redirect('/login')
    }

})
router.get("/logout",(req,res)=>{
    req.session.user=false
    res.redirect('/login')
})



module.exports = router;
