const express = require('express')
const router = express.Router();
const ownerModel = require('../models/owner-model');

// console.log(process.env.NODE_ENV)  //will give development , if envirnoment setup by export NODE_ENV= , it is directly saved into memory
//now making route available only in developemnt phase so that we will create 1 owner during developemnt phase
//and no other owner can be created in production phase 
if(process.env.NODE_ENV==="development"){
    router.post('/create', async (req, res)=>{
        let owners = await ownerModel.find();
        if(owners.length>0){
            res.status(403) //forbidden //“This action is forbidden to everyone, logged in or not as user.”
            .send("This action is forbidden to everyone, logged in or not as user.")
        }
        //if no owners then allow to create only one owner account in developemnt phase only
        let {fullName, email, password} =req.body;
        let createdOwner = await ownerModel.create({
            fullName,
            email,
            password
        })
        res.status(200).send(createdOwner)
    })
}
//now test this code by postman by craeting account through field -> body -> x-www-form-urlencoded by using {{base url test}}/create using post method

router.get('/admin', (req, res)=>{
    let success = req.flash("success");
    res.render('createproducts', {success})
    // res.send("hey, admin panel is working perfectally")
})

module.exports = router;