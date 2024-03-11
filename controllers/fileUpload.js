const File=require('../models/File');

exports.localFileUpload=async(req,res)=>{
    try{

        const file=req.files.file;
        console.log(file);
        

        const path=__dirname+"/files/"+Date.now()+".jpeg";
        
        file.mv(path,(err)=>{console.log(err)});

        res.json({
            success:true,
            message:"Local file upload succesfully"
        })



    }
    catch(err){
        console.log(err);


    }



}

const cloudinary=require('cloudinary').v2;

async function uploadFileToCloudinary(file,folder){

    const options={folder};
    const result=await cloudinary.uploader.upload(file.tempFilePath,options);
    return result;


}

function isfileType(type,supportedTypes)
{
    return supportedTypes.includes(type)
}

exports.imageUpload=async(req,res)=>{

    try{

        const {name,tags,email}=req.body;
        console.log(name,tags,email);
        const file=req.files.file;

        // yha file hai wo key hai dhyan rhe

        // console.log(file);

        const supportedTypes=["jpg","jpeg","png"];

        const filetype=file.name.split('.')[1].toLowerCase();

        if(!isfileType(filetype,supportedTypes)){

            return res.json({
                success:false,
                message:"Image format is unsupported type"
            })
        }

        // agar file format supported hai

        console.log("Yha tak chal rha");

        const  response=await uploadFileToCloudinary(file,"first")
        console.log(response);

        
        // db k andr entry save krni hai

        const fileData= File.create({name,tags,email,imageUrl:response.url})


        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"file uploaded succesfully"
        })


    }
    catch(err)
    {
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        })


    }
      


}

exports.videoUpload=async(req,res)=>{

    try{
        // naam gaw sab nikal lenge

        const{name,email,tags}=req.body;
        console.log(name,email,tags);
        const file=req.files.videoFile;
        // console.log(file);

        const supportedTypes=["mp4","jpeg","mov","png"];

        const filetype=file.name.split('.')[1].toLowerCase();

        console.log("filetype =>",filetype)

        if(!isfileType(filetype,supportedTypes)){

            return res.json({
                success:false,
                message:"Image format is unsupported type"
            })
        }


        // ab upload krne ki baari

        const response=await uploadFileToCloudinary(file,"first")
        console.log(response);


        // upload krne k baad db me entry v chahiyea n


        const fileData= File.create({name,tags,email,imageUrl:response.url})



        res.json({
            message:"File upload succesfully"
        })


    }
    catch(err){
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        })


    }

}