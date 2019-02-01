const sendGridCreds = require('./config/sendGrid_creds.js');
const express = require('express');
server = express();

server.use(express.json());
server.use(express.urlencoded({extended: false}));

server.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

server.post('/sendemail', ( request, response ) => {
    console.log('request body: ', request.body)
    const { name, email, message } = request.body;

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(sendGridCreds.sendGridKey);
    const msg = {
        to: 'jcquirante@gmail.com',
        from: 'mailerdaemon@justenquirante.com',
        subject: 'Received a message at ' + (new Date()).toLocaleString(),
        reply_to: email,
        text: `
            Name: ${ name }
            Email: ${ email }
            Message: ${ message }
        `,
        html: `
            <div>Name: ${ name } </div>
            <div>Email: ${ email }</div>
            <div>Message: ${ message }</div>
        `,
    };
    
    sgMail.send(msg).then(function() {
        console.log(arguments)
        let output = {
            success: true,
        }
        response.send(output);
    }).catch(function(error){
        console.log(error);
    });

    

})

server.listen(4444, function(){
    console.log('server is up and running')
})