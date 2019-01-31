const sendGridCreds = require('./config/sendGrid_creds.js');
const express = require('express');
server = express();

server.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

server.get('/sendemail', ( request, response ) => {

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(sendGridCreds.sendGridKey);
    const msg = {
        to: 'jcquirante@gmail.com',
        from: 'mailerdaemon@justenquirante.com',
        subject: 'Received a message at ' + (new Date()).toLocaleString(),
        reply_to: request.query.email,
        text: `
            Name: ${ request.query.name }
            Email: ${ request.query.email }
            Message: ${ request.query.message }
        `,
        html: `
            <div>Name: ${ request.query.name } </div>
            <div>Email: ${ request.query.email }</div>
            <div>Message: ${ request.query.message }</div>
        `,
    };
    
    sgMail.send(msg).then(function() {
        console.log(arguments)
        response.send('done');
    }).catch(function(error){
        console.log(error);
    });

    

})

server.listen(4444, function(){
    console.log('server is up and running')
})