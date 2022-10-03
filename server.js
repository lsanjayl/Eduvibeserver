const express = require('express');
const app = express();
const nodemailer=require("nodemailer")
const PORT =process.env.PORT||5000;
//MIDDLEWARE
app.use(express.static('./'));
app.use(express.json())
app.get('/',(req,res)=>{
    res.sendFile(__dirname +'./index.html');
})
app.post('https://creatoverse.herokuapp.com/contact',(req,res)=>{
    console.log(req.body);

    const transporter =nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:'contact@creatorslab.in',
            pass:'ottfyrvkhldwcfwu'
        }
    })
    const mailOptions = {
        from:req.body.email,
        to:'jabez@creatorslab.in',
        subject:`Message from ${req.body.email}:${req.body.name}`,
        html:`<p>Name:${req.body.name}</p><p>Phone:${req.body.phone}</p><p>Department:${req.body.department}</p><p>Collegename:${req.body.collegename}</p><p>Currentyear:${req.body.currentyear}</p><p>Message:${req.body.message}</p>`,
    }
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log(error);
            res.send('error');
        }
        else{
            console.log('Email sent');
            res.send('success');
        }
    })
})
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})