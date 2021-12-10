// const router = require("express").Router();
// const Pin = require("../models/Pin");


// // create a pin
// router.post("/",async(req,res)=>{
//     const newPin = new Pin(req.body)
//     try{
//         const savedPin = await newPin.save()
//         res.status(200).json(savedPin) //when data will show then it will show

//     }catch(err){
//         res.status(500).json(err)
//     }
// })

// // get all pins

// // module.exports = mongoose.model('User', userSchema);
// module.exports = router

const router = require("express").Router();
const Pin = require("../models/Pin");

//create a pin
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all pin

router.get("/",async(req,res)=>{
    try{
        const pins = await Pin.find();
        res.status(200).json(pins)

    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;