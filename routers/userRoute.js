const router = require("express").Router()
const {register,login} = require("../controllers/userController")
// Register Route
// localhost:4000/api/users/register
router.post('/register', register)

// Login Router
// localhost:4000/
   
router.post('/login', login)
module.exports = router 
