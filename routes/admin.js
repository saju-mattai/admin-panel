const { response } = require('express');
var express = require('express');
var router = express.Router();
var adminhelper = require('../helpers/admin-helper')
const { ObjectID, ObjectId } = require('mongodb');
const session = require('express-session');


/* GET home page. */
router.get('/admin', function (req, res, next) {
  if(req.session.admin){
    res.redirect('/admin-panel',);
  }else{
    //evide also===============================================
    res.render('admin',{loginErr:req.session.loginErr})
    req.session.loginErr=false
  }
 
});

router.get('/admin-panel', (req, res) => {
     if(req.session.admin){
    
      adminhelper.getAllProducts().then((product) => {
        
        res.render('admin-panel', { product })
      })
     }
     else{
      res.redirect('/admin')
     }
  

})


router.post('/admin-panel', function (req, res, next) {

 
    res.render('admin-panel')
  })





router.get('/add-user', (req, res) => {
if(req.session.admin){
  res.render('add-user')
}else{
  res.redirect('/admin')
}
  
})

router.post('/add-user', (req, res) => {

  adminhelper.doSignup(req.body)
  res.redirect('/admin-panel')


})


router.get('/delete-product',(req,res)=>{
  
  let proId= ObjectId(req.query.id)
   
  adminhelper.deleteProduct(proId).then((response)=>{
    res.redirect('/admin-panel')
  })

})

router.get('/edit-user/:id',async(req,res)=>{
  if(req.session.admin){
    adminhelper.getProductDatails(req.params.id).then((data)=>{
      res.render('edit-user',{data})
    })
  }else{
res.redirect('/admin')
  }
})

router.post('/edit-user/:id',(req,res)=>{
  adminhelper.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin-panel')
  })
})
router.post('/admin',(req,res)=>{
 adminhelper.adminLogin(req.body).then((response)=>{
  if(response.loginStatus){
    req.session.admin=response.admin
    res.redirect('/admin-panel')
   }else{
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    req.session.loginErr="invalid username or password"
    res.redirect('/admin')
   }
 })
 

})
router.get('/admin-logout',(req,res)=>{
req.session.admin=false
res.redirect('/admin')
})

module.exports = router;
