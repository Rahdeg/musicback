const admin = require('../config/firebase');
const User = require("../models/users.model").User;


exports.login= async function (req,res) {
    if (!req.headers.authorization) {
      return  res.status(500).send({message:"invalid token"})
    }
    const token= req.headers.authorization.split(" ")[1];
    try {
        const decodeValue= await admin.auth().verifyIdToken(token)
        if (!decodeValue) {
            res.status(505).json({message:"Un Authorised"})
        }else{
            const userExist= await User.findOne({'userId':decodeValue.user_id})
            if (userExist) {
                const filter={userId:decodeValue.user_id}
               const option={
                upsert:true,
                new:true
               }
               try {
                const user= await User.findOneAndUpdate(filter,{authTime:decodeValue.auth_time},option);
              res.status(200).send(user)
               } catch (error) {
                res.status(400).send({success:false,message:error}) 
               }

              }else {
                const details={
                    name: decodeValue.name,
                    email: decodeValue.email,
                    imageUrl: decodeValue.picture,
                    userId: decodeValue.user_id,
                    role: 'member',
                    authTime:decodeValue.auth_time,
                    emailVerified:decodeValue.email_verified,
                };
                try {
                const user = new User(details);
                user.save();
                res.status(200).send(user)
                } catch (error) {
                   res.status(400).send({success:false,message:error}) 
                }
              }
            
            
        }
    }catch (error) {
        res.status(400).send({success:false,message:error}) 
     }
}

exports.getUsers = async function (req, res) {
  try {
    const option={
      sort:{
        createdAt:1,
      },
    }
    data = await User.find(option);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error });
  }
};

exports.getUser = async function (req, res) {
  try {
    const data = await User.findById({_id:req.params.id});
    if (!data) {
      return res.status(404).json({ msg: "Not Found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    if (error.name == "CastError") {
      return res.status(400).json(error.message);
    }
    return res.status(500).json(error);
  }
};

exports.deleteUser = async function (req, res) {
  try {
    const user = await User.findByIdAndDelete({_id:req.params.id});
    if (!user) {
      return res
        .status(404)
        .json({ msg: `No user with id ${req.params.id}` });
    } else {
      return res
        .status(200)
        .json({ msg: "user Deleted Successfully", data: null });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.updateRole= async function(req,res){
  const role = req.body;
  User.findByIdAndUpdate(req.params.id, role ,{new:true}, (err, data)=>{
      if (data) {
          return  res.status(200).send({success:true, user:data}); 
      }
      if (err) {
          return  res.status(400).send({success:false, msg:'data not found'});
      }
  })
}