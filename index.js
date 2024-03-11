// APP CREATE KRNA HAI 
const express=require('express');

const app=express();


// PORT FIND KRNA HAI  
require('dotenv').config();
const port=process.env.PORT||3000


// middleware use krna hai jarurwat wala

app.use(express.json());
const fileUpload=require('express-fileupload');
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
})); 


// DB SE CONNECT KRNA HAI
const { db_conn } = require('./config/db');
const { cloudinaryConnect } = require('./config/cloudinary');
db_conn();




// CLOUD SE CONNECT KRNA HAI
cloudinaryConnect();


// API ROUTE KO MOUNT KRNA HAI

const Upload=require('./routes/FileUpload');
app.use('/api/v1',Upload);

// LISTEN KRNA HAI SERVER ACTIVATE KRNA HAI

app.listen(port,()=>{
    console.log(`server started at ${port}`);
})


