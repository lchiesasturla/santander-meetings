var nodemailer = require('nodemailer'); 
const Email = require('email-templates');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});

exports.sendInvitationEmail = function(username,emailTo, meetingId){
    try {
        const email = new Email({
            transport: transporter,
            send: true,
            preview: false,
          });
      
          email.send({
            template: 'guest_invited',
            message: {
              from: 'Santander Meetings',
              to: emailTo,
            },
            locals: {
              username,
              meetingId
            }
          }).then(() => console.log(`[Mail] - Guest invited - Email has been sent to ${username} - ${emailTo}!`));
    } catch (error) {
        console.log(`[Mail] - ${error}`);
    }
};

exports.sendCancelledEmail = function(username,emailTo, meeting){
    try {
        const email = new Email({
            transport: transporter,
            send: true,
            preview: false,
          });
      
          email.send({
            template: 'guest_cancelled',
            message: {
              from: 'Santander Meetings',
              to: emailTo,
            },
            locals: {
              username,
              meeting
            }
          }).then(() => console.log(`[Mail] - Guest cancelled - Email has been sent to ${username} - ${emailTo}!`));
    } catch (error) {
        console.log(`[Mail] - ${error}`);
    }
};