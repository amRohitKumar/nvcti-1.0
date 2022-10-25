const {sendMail} = require('./utilities/mailsender');
require('dotenv').config();
sendMail({to_email: "marnisaisanjay@gmail.com", subject_email: "hello", text_email:"this is the body", html_email: `<b>hi</b>`});

