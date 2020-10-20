const sgMail = require("@sendgrid/mail");
const env = require('dotenv');
env.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
    to: "marcosicardochicote15@gmail.com",
    from: "themarckyt@gmail.com",
    subject: "prueba",
    text: "Hola que tal esto es una prueba",
    html: "<h1>aaa</h1>",
}

sgMail.send(msg).then(()=>{
    console.log('Email sent');
}).catch((error)=>{
    console.error(error);
});