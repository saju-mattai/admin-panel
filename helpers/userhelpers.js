var db=require('../confiq/connection')
var collection=require('../confiq/collection')
const bcrypt=require('bcrypt')
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
    doLogin:(userData)=>{
        return new Promise(async(resolve, reject) => {
            let loginStatus=false
            let response={}
            console.log(userData.username);
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({username:userData.username})
            
            if (user){
                bcrypt.compare(userData.password,user.password).then((data)=>{
                    if(data){
                        response.status = true
                        response.user = user
                        resolve(response)
                        console.log('loginsuccessss');
                    }else{
                        resolve({status:false})
                        console.log('login failed');
                    }

                })

            }else{
                console.log('login failedFFFFFFFFFFF');
            }
        })
    }
}
   
   