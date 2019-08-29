const mongoose = require('mongoose');
let collection = mongoose.model('donate');
const { responseModel } = require('../model');
const { query } = require('../query');
const { commonService }= require('../service');

async function add(req) {
  try {
    let message ="";
    let userFind = await query.find(mongoose.model('user'),{
      isActive:true
    });
    let add = await query.insert(collection,{
      name: req.body.name,
      description:req.body.description,
      userId:req.authenticationUser.authId,
      price:req.body.price || 0,
      address:req.body.address
    });
    if(req.body.type=='CASH'){
      
      let add = await query.insert(mongoose.model('balance'),{
        userId:found._id,
        description:req.body.description,
        price:req.body.price,
        type:'INCOME',
      });
    }
     message =req.body.description;
    
    commonService.pushNotigication(userFind,message);
    return responseModel.successResponse("create donate ", add);
  } catch (err) {
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("donate not create", {}, errMessage);
  }
}

async function getAll(req) {
  try {
    let alldonate = await query.find(collection,{});
    return responseModel.successResponse("get donate ", alldonate);   
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("donate not get", {}, errMessage);
  }
}
async function deletes(req) {
  try {
    let deletedonate = await query.deleteMany(collection,{_id:req.params.donateId});
    return responseModel.successResponse("donate delete ", deletedonate);   
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("donate not delete", {}, errMessage);
  }
}
module.exports = {
  add,
  getAll,
  deletes
}