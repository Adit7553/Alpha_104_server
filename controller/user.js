const usersSchema = require('../model/Users')
const bcrypt = require('bcrypt')
const Toastify = require('toastify-js')


exports.addNewUser = async (req,res,next)=>{
     if(req.body){
            const User = new usersSchema(req.body)
            const existingUser = await usersSchema.findOne({email : req.body.email})
            console.log("existingUser : ",existingUser );
                if(existingUser){
                  return res.render("registration.pug", {message : "User already exist with this email."})
              }else{
                console.log("b");
                const salt = await bcrypt.genSalt(10)
                User.password = await bcrypt.hash(User.password, salt)
                 User.save().then((user)=>{
                   res.status(201).render("login.pug", {message : `Congratulation ${user.name} , you are registerd successfully, Now you can login with ${user.email} `})
                   console.log("User registreted successfuly")
                 }).catch((err)=>{
                   res.status(500).json({message : err.message})
                   console.log("There is a problem to register the new user, Here is the error : ",err)
                 })
              }  
            }        
}


exports.loginUser = async(req,res)=>{
  try {
    if(req.body){
      const userByThisEmail = await usersSchema.findOne({email : req.body.email}) 
      if(userByThisEmail){
       const passwordCompareStatus = await bcrypt.compare(req.body.password, userByThisEmail.password)
        if(passwordCompareStatus){
          res.status(200).render("home.pug", {message: `Welcome ${userByThisEmail.name}, How may i help you`})
        }else{
          res.status(402).json({message : "You have entered wrong password, Try again"})
        }
      }else{
        res.status(401).json({message : "User not exist with this email id"})
      }
    }
  } catch (error) {
    console.log("there is a error to login the user", error)
  }
}


exports.getAllUser = async(req,res)=>{
    try {
        const allUserData = await usersSchema.find()
        res.status(200).json(allUserData)
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}


exports.updateOneUser = async(req,res)=>{
    try {
        const foundUser = await usersSchema.findById(req.params.id)
        console.log(foundUser)
        if(foundUser == null){
            res.status(405).json({message : "User not found"})
          }
          const updatedUser = await usersSchema.findOneAndUpdate({name : foundUser.name},{$set:{name : req.body.name}})
          console.log("updatedUser : ",updatedUser)
    } catch (error) {
        
    }
}



exports.getOneUser = async(req,res)=>{
    try {
        console.log(req.params.id);
        const foundUser = await usersSchema.findById(req.params.id)
        console.log(foundUser);
      if(foundUser == null){
        res.status(405).json({message : "User not found"})
      }
        res.status(202).json(foundUser)
    } catch (error) {
        res.status(504).json({message : "Cannot search for this id"})
    }
}


// ////for static method
exports.getOneUserByName = async()=>{
  try {
    const result = await usersSchema.byName("Adi")
    console.log(result);
  } catch (error) {
    res.status(504).json({message : "Not found any person with this name"})
  }
}



////for query method
// const run1 = async()=>{
//   const result = await usersSchema.find().byName("Adi")
//   console.log(result);
//   console.log("final : ",result.namedEmail)
// }

// const run1 = async()=>{
//   const result = await usersSchema.findOne({name : "Raja pandey"})
//   console.log(result);
//   console.log("final : ",result.namedEmail)
// }

// // run();
// run1();

// exports.getUserById = async (req,res,next)=>{
//     try {
//       const foundUser = await usersSchema.findById(req.params.id)
//       if(foundUser == null){
//         res.status(405).json({message : "User not found"})
//       }
//     } catch (error) {
//         res.status(501).json({message : error.message})
//     }
//     res.foundUser = foundUser
//     next();
// }
    
