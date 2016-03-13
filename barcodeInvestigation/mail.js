var mailer = require("nodemailer");
var fs = require('fs')
    // Use Smtp Protocol to send Email
    var smtpTransport = mailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: "XXXXXXXX@gmail.com",
            pass: "XXXXXXXXXXXXX"
        }
    });

    

    

   module.exports = function(email,hash,callback)
   {
      var pathToImage = "./barcodes/"+ email+".jpeg";
      var mail = {
        from: "XXXXXXXXXXXXXXXXX <XXXXX@gmail.com>",
        to: email,
        subject: "Send Email Using Node.js",
        text: "This is your barcode",
        html:"<b>Check the attachment</b> ",
        attachments:[
      {
        fileName:'barcode.jpeg',
        streamSource: fs.createReadStream(pathToImage)
      }
    ]
    }

      smtpTransport.sendMail(mail, function(error, response){
        smtpTransport.close();
        return callback(error,response);
    });  
   }