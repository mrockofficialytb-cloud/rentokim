// smtp-test-ethereal.js
const nodemailer = require("nodemailer");

async function test() {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });

  const info = await transporter.sendMail({
    from: 'Autopůjčovna <no-reply@local.test>',
    to: 'mrockuw@seznam.cz',
    subject: 'Ethereal test',
    text: 'Testovací zpráva přes Ethereal'
  });

  console.log("Message sent:", info.messageId);
  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
}
test().catch(console.error);