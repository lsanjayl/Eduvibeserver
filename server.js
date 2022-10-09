const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));
const nodemailer=require("nodemailer")
const cors = require('cors') 
app.use(cors({
    origin:"*",
}))
const PORT =process.env.PORT||5000;
app.post('/', (req, res) => {
    console.log(req.body);
    // res.send("helloa");
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
        html:`<p>Name:${req.body.name}</p><p>Phone:${req.body.phone}</p><p>Collegename:${req.body.collegename}</p><p>Projectrunningstatus:${req.body.Projectrunningstatus}</p><p>finalyear${req.body.finalyear}</p><p>department${req.body.department}</p><p>time${req.body.phone}</p><p>Message:${req.body.message}</p>`,
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
});
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
// fetch("/echo/json/",
// {
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     method: "POST",
//     body: JSON.stringify({a: 1, b: 2})
// })