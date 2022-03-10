const { use } = require("passport/lib")
const validator = require("validator")

const validate = user => {
    const error = {}
    if(!user.name){
        error.name = "Please Provide your name!"
    }
    if(!user.email){
        error.email = "Please Provide your email!"
    }else if(!validator.isEmail(user.email)){
        error.email = "Please Provide a Valid email!"
    }
    
    if(!user.password){
        error.password = "Please Provide your Password!"
    } else if(user.password.length < 6){
        error.password = "Your Password must be grater than or equal 7 characters"
    }

    if(!user.confirmPassword){
        error.confirmPassword = "Please Provide your Conferm Password!"
    }if(user.password !== user.confirmPassword){
        error.confirmPassword = "Your password doesn\'t match!"
    }
    return {
        error,
        isValid : Object.keys(error).length === 0
    }

}

module.exports = validate