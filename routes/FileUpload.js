const express=require('express');
const router=express.Router();
// ab sare handler le aata hu
const{localFileUpload, imageUpload,videoUpload}=require('../controllers/fileUpload')


// router.post("/imageUpload",imageUpload)

// router.post("/videoUpload",videoUpload)

// router.post("/imageReducerUpload",imageReducerUpload)

router.post("/localFileUpload",localFileUpload)
router.post("/imageUpload",imageUpload)
router.post("/videoUpload",videoUpload)
module.exports=router;

