const bcrypt = require('bcrypt')
const User = require('../model/User')
const registerValidator = require('../validator/registerValidator')

module.exports = {

    login(req,res){

    },
    register(req,res){
      let {name, email, password, confirmPassword} = req.body
      let validate = registerValidator({name, email, password, confirmPassword})


      if(!validate.isValid){
           res.status(400).json(validate.error)
      }else{
        console.log(email)
      
          User.findOne({email})
           .then(user => {
             
              if(user){
                return res.status(400).json({
                  message : "Email Already Exist!"
                })
              }

              bcrypt.hash(password, 10, (err, hash) => {
                if(err){
                  res.status(500).json({
                    message : "Server error occurred"
                  })
                }
                let newuser = new User({
                  name,
                  email,
                  password : hash
                })
                newuser.save()
                    .then(user => {
                      res.status(201).json({
                        message : "User successfully created!",
                        user
                      })
                    })
                    .catch(err => {
                      res.status(500).json({
                        message : "Server error occurred to save data"
                      })
                    })

              })

           })
           .catch(error => {
             
            res.status(500).json({
              message : `Server error occurred to find email ${error.message}`
            })
           })
  
      }
       // Validation check user data == Done
       // Check for duplicate user data
       // New User Object
       // Save to database
       // Response back with new data
    }
}