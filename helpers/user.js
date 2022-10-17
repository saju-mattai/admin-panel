var db=require('../confiq/connection')
module.exports={

addUser:(user,callback)=>{
    console.log('user');
    db.get().collection('user').insertOne(user).then((data)=>{
callback(true)
    })

}

}