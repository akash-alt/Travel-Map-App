const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

// register
// here you have to give URL values properly
router.post("/register",async(req,res)=>{
    try{
        // generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt)

        // create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
          });

        // save user and send response
        const user = await newUser.save();
        res.status(200).json(user._id)

    }catch(err){
        res.status(500).json(err)
    }
});

// login
router.post("/login",async(req,res)=>{
    try{
        // find user
        const user = await User.findOne({username:req.body.username})
        !user && res.status(400).json("Wrong username or password!")
        //here username not found then it will show

        // validate password
        const validatePassword = await bcrypt.compare(
            req.body.password,
            user.password
            );
        !validatePassword && res.status(400).json("Wrong username or password!")

        // save user and send response
        // if everything is fine then it will show this
        res.status(200).json({_id:user._id, username: user.username})

    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;