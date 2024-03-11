const mongoose=require('mongoose');
const nodemailer = require('nodemailer');

const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    tags:{
        type:String

    },
    email:{
        type:String

    }


})

fileSchema.post('save', async function(doc) {
    // Send email here
    try {
        const transporter = nodemailer.createTransport({


            // Your email service configuration
            service: 'gmail',
            auth: {
                user: 'kumarrupesh2000@gmail.com', // Your Gmail email address
                pass: 'zlcl slfq pket ckpk' // Your Gmail password or App Password if 2-step verification is enabled
            }
        });

        await transporter.sendMail({
            from: 'kumarrupesh2000@email.com',
            to: 'd.04.rupesh@gmail.com',
            subject: 'Data Inserted into Database',
            text: 'Data has been inserted into the database.',
            // You can customize the email content as needed
        });

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
});



module.exports=mongoose.model("File",fileSchema);