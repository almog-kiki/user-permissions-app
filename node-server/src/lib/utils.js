const UserModel = require('../models/user.model');

const clone =(obj)=>{
return JSON.parse(JSON.stringify(obj));
}

const getObjectId = (id) =>{
    if (id){
        id = mainModule.mongo.ObjectID(id);
    }
    return id;
}

const getDefaultUserProjection = () =>{
    return {
        __v: false
    };
}

const isLessThen10 =(number)=>{
    return number<10;
}

const addZeroIfNeeded =(number)=>{
    if(isLessThen10(number)) 
    {
        number ='0'+ number;
    }
    return number;
}

 const getDateDisplay=(date)=>{
    let dd = addZeroIfNeeded(date.getDate());
    let mm = addZeroIfNeeded(date.getMonth()+1);
    let hour = addZeroIfNeeded(date.getHours());
    let minutes = addZeroIfNeeded(date.getMinutes());

    const formatedDay = dd + "/" + mm + "/"+ date.getFullYear();
    const formatedHour = hour + ":" + minutes;
    return formatedDay + " - " + formatedHour;
}

 const log = (str) =>{
    let logMsg = getDateDisplay(new Date()) + ` ----   ` + str;
    // console.log(logMsg);
    mainModule.tcpSocketClient.write(logMsg);
}

const getGuestUser = () =>{
    const role = mainModule.constants.ROLES[2];
    return {
        _id: role.id,
        username: role.name,
        role: role
    }
}

const getAdminUserDefault = ()=>{
    const role = mainModule.constants.ROLES[0];
    return {
        username: role.name,
        password:"123",
        role:  role
    }
}
const isDefaultAdminExists = async () =>{
    const adminUser = await UserModel.findOne(getAdminUserDefault())
    return adminUser !== null;
}

const createDefaultAdminUser = async () =>{
    try{
        if( !await isDefaultAdminExists())
        {
            let defaultAdmin = await new UserModel(getAdminUserDefault());
            await defaultAdmin.save()
            mainModule.utils.log("Created admin user successful");
        } else{
            mainModule.utils.log("admin user aleady exists");
        }
        return true;
    } catch(error){
        mainModule.utils.log("cannot create admin user  - " + error.stack);
        return false;
    }
}

const prepareUserobjectToClient = (userFromDb) =>{
    let user = JSON.parse(JSON.stringify(userFromDb));
    delete user.password;
    delete user.__v;
    return user;
}


module.exports = {
    isLessThen10: isLessThen10,
    log: log,
    createDefaultAdminUser: createDefaultAdminUser,
    getObjectId: getObjectId,
    getDefaultUserProjection:getDefaultUserProjection,
    prepareUserobjectToClient:prepareUserobjectToClient,
    getGuestUser:getGuestUser,
    clone:clone
}