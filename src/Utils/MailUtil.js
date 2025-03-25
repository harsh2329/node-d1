const mailer = require('nodemailer');

const sendingMail = async (to, subject, text, htmlContent = null) => {
    try {
        const transporter = mailer.createTransport({
            service: 'gmail',
            auth: {
                user: "bhookbusterofficial@gmail.com",
                pass: "jnxd pqhq ebsg liwq"
            },
            tls: {
                rejectUnauthorized: false // Ignore self-signed certificate
            }
        });

        const mailOptions = {
            from: 'bhookbusterofficial@gmail.com',
            to: to,
            subject: subject,
            text: text,
        };
        
        // Use the provided HTML content if available, otherwise use the default
        if (htmlContent) {
            mailOptions.html = htmlContent;
        } else {
            mailOptions.html = 'Embedded image: <img src="cid:unique@nodemailer.com"/>';
            mailOptions.attachments = [
                {
                    filename: 'mail.png',
                    path: __dirname + '/mail.png',
                    cid: 'unique@nodemailer.com'
                }
            ];
        }

        const mailresponse = await transporter.sendMail(mailOptions);
        console.log(mailresponse);
        return mailresponse;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Re-throw the error to handle it further up the call stack if needed
    }
};

module.exports = { sendingMail };

// sendingMail("mbpfocus21@gmail.com", "test mail", "this is a test mail")
//     .catch(error => {
//         console.error('Failed to send email:', error);
//     });
