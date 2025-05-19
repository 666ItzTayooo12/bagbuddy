/*
const mongoose = require('mongoose');
const dbgr = require("debug")("development:mongoose") //alternative of console.log(), and give more control, development is custom category we can write anything 
//to  run dbgr,terminal command for windows user (if terminal is bash)->set DEBUG=development:* for cmd windows=> use set instead of export
//to stop this => export DEBUG=

const config = require('config');
mongoose
.connect(`${config.get("MONGODB_URI")}/scatch`) //this (when uri mongodb://127.0.0.1:27017) will connect only mongodb running on local machine (i.e. laptop) //hence this code for development phase only
.then(function(){
    dbgr("connected")
})
.catch(function(err){
    dbgr(err)
})
module.exports = mongoose.connection //mongoose.connection get all control of database scatch 
*/


//for production phase
const mongoose = require('mongoose')
const dbgr = require('debug')("development:mongoose") //alternative of console.log() to print only on developemnt phase only
require('dotenv').config();
const DBURI = process.env.MONGODB_URI
mongoose.connect(DBURI)
.then(function(){
    dbgr("Mongodb atlas database connected")
})
.catch(function(err){
    dbgr("Error in databse connection")
})