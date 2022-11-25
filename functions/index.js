const functions = require("firebase-functions");
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "axtateenemailservice@gmail.com",
        pass: "yhaofxzgrmwsgfce",
    },
});

const sendContactForm = (values) => {
    return transport
        .sendMail({
            subject: values.subject,
            bcc: values.email,
            html: values.message,
        })
        .then((r) => {
            console.log("Accepted => ", r.accepted)
            console.log("Rejected => ", r.rejected)
        })
        .catch((e) => console.log(e))
}

exports.contactForm = functions.https.onRequest((req, res) => {
    if (req.body.secret !== 'firebaseIsCool') return res.send('Missing secret');
    sendContactForm(req.body);
    res.send("Sending email...");
});