const UserModel = require('../models/user.model');

exports.getRoles = async function(req, res){
    try{
        let roles = mainModule.utils.clone(mainModule.constants.ROLES);
        roles.pop();
        mainModule.requestUtils.successResponse(res, roles, "getRoles");
    }catch(error){
        mainModule.requestUtils.failureResponse(res, error,"getRoles")
    } 
}

exports.get = async function (req, res){
    try{
        const userObjectId = mainModule.utils.getObjectId(req.params.id);
        const user = await UserModel.findById(userObjectId,mainModule.utils.getDefaultUserProjection());
        mainModule.requestUtils.successResponse(res, user, "get User ");
    }catch(error){
        mainModule.requestUtils.failureResponse(res, error,"get User")
    }   
}

exports.getAll = async function (req, res){
    try{
        const users = await UserModel.find();
        mainModule.requestUtils.successResponse(res, users, "get all Users ");
    }catch(error){
        mainModule.requestUtils.failureResponse(res, error,"getAll" )
    }   
}

exports.create = async function (req, res){
    try{
        const {username, password, role} = req.body;
        const user = new UserModel({ username: username, password: password,role: role });
        const savedUser = await user.save();
        mainModule.requestUtils.successResponse(res,savedUser, "New user created ")
    }catch(error){
        mainModule.requestUtils.failureResponse(res, error,"create")
    }   
}

exports.delete = async function (req, res){
    try{
        const userObjectId = mainModule.utils.getObjectId(req.params.id);
        let result =  await UserModel.findByIdAndRemove(userObjectId);
        mainModule.requestUtils.successResponse(res, result , "User gets deleted")
    }catch(error){
        mainModule.requestUtils.failureResponse(res, error,"delete user")
    }   
}
exports.deleteAll = async function (req, res){
    try{
        let result = await UserModel.deleteMany({"username":{$nin:["Administrator"]}})
        mainModule.requestUtils.successResponse(res, result,"All users deleted except Administrator")
    }catch(error){
        mainModule.requestUtils.failureResponse(res, error,"deleteAll")
    }   
}