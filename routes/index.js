const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

router.get('/', (req, res) => {
    let error = req.flash("Error"); //exttracted Error flash message from  isLoggedIn error part by redirecting on it
    res.render('index', { error, loggedin: false }); //sending this error message to index.ejs page
    //sending loggedin:false show that control the visibilty of some nav link based on authentication
})

//protected route by middleware isLoggedIn
router.get('/shop', isLoggedIn, async (req, res) => {
    let products = await productModel.find();
    let success = req.flash('success') //retriving flash mesage from '/addtocart/:productid'
    res.render('shop', { products, success }); //sending success flash mesage to shop.ejs
    // res.send("shop page")
})

router.get('/addtocart/:productid', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email })
    user.cart.push(req.params.productid)
    await user.save()
    req.flash("success", "Added to cart");
    res.redirect('/shop') //now we can access the value of success flash message at '/shop'
})

router.get('/cart', isLoggedIn, async (req, res) => {
    let user = await userModel
        .findOne({ email: req.user.email })
        .populate("cart") //making only id of the product in cart to all details of product in cart

        let totalProductPrice = 0;
        let totalDiscount = 0;
        user.cart.forEach((item)=>{
                totalProductPrice+=item.price
                totalDiscount+=item.discount
        })
        // console.log(totalProductPrice)
    res.render('cart', {user, totalProductPrice, totalDiscount})
})
module.exports = router