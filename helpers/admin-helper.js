var db=require('../confiq/connection')
var collection=require('../confiq/collection')
const bcrypt=require('bcrypt')
const { response } = require('express')
const { ObjectID, ObjectId } = require('mongodb');
module.exports={
    doSignup:(userData)=>{
        return new Promise(async (resolve, reject) => {
            
                bcrypt.hash(userData.password,10,(err,hash)=>{
                    userData.password=hash
                    console.log(hash);
                    console.log(userData.password);
                    db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                        resolve(data.insertedId)
                    })
                })
               
        
    
            })
        },
        getAllProducts:()=>{
            return  new Promise((resolve, reject) => {
                let product= db.get().collection(collection.USER_COLLECTION).find().toArray()
                resolve(product)
            })
        },
        deleteProduct:(proId)=>{
            return new Promise((resolve, reject) => {
                db.get().collection(collection.USER_COLLECTION).deleteOne({_id:proId}).then(()=>{
                    resolve(response)
                })
            })
        },
        getProductDatails:(proId)=>{
            return new Promise((resolve,reject)=>{
                db.get().collection(collection.USER_COLLECTION).findOne({_id:ObjectId(proId)}).then((product)=>{
                    resolve(product)
                })

            })
        },
        updateProduct:(proId,prooductDetails)=>{
            return new Promise((resolve, reject) => {
                db.get().collection(collection.USER_COLLECTION)
                .updateOne({_id:ObjectId(proId)},{
                    $set:{
                        name:prooductDetails.name,
                        username:prooductDetails.username,
                        password:prooductDetails.password
                    }
                }).then((response)=>{
                    resolve()

                })
            })
          
        },
        adminLogin:(userData)=>{
            return new Promise(async(resolve, reject) => {
                let response={}
                let loginStatus=false
                let admin=await db.get().collection(collection.ADMIN_COLLECTION).findOne({username:userData.usernamee})
                if(admin.password==userData.password){
                    response.loginStatus=true
                    response.admin=admin
                    resolve(response)
                    console.log('succusess');

                }else{
                    resolve(loginStatus=false)
                    console.log('failllllllllllllllll');
                }
            })
        }

}



