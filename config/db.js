const mongoose=require('mongoose');
require('dotenv').config();
exports.db_conn=()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{console.log("db connected succesfully");})
    .catch((err)=>{console.log(err)})
}