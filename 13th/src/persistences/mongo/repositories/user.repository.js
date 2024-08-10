import {userModel} from "../models/user.model.js"

const getAll = async (query, option) =>{
  const users = await userModel.paginate(query, options);
  return users; 
}

  
  const getByID = async (id) =>{
    const user = await userModel.findById(id);
    return user;
  }

  const getByEmail = async (email) => {

    const user = await userModel.findOne({email});
    return user;

  }

  
  const create = async  (data)=>{
    const user = await userModel.create(data);
    return user;
  }

  
  const update = async (id, data) =>{
    const user = await userModel.findByIdAndUpdate (id, data, {new: true});
    return user;
  }

  
  const del = async (id) =>{
    const user = await userModel.deleteOne({_id: id});
    if(user.deletedCount === 0) return false;

    return true;
  }
  
  
  export default {
      getAll,
      getByID,
      getByEmail,
      create,
      update,
      del
  }