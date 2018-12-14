const nodemailer = require("nodemailer");
const pug = require("pug");
const juice = require("juice");
const htmlToText = require("html-to-text");
const promisify = require("es6-promisify");

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

transport.sendMail({
  from: "Gabs <me@gmail.com>",
  to: "Gabs <me@gmail.com>",
  subject: "Gabs <me@gmail.com>",
  html: "Gabs <me@gmail.com>",
  text: "Gabs <me@gmail.com>"
});

// const generateHTML = (filename, options = {}) => {
//   const html = pug.renderFile(
//     `${__dirname}/../views/email/${filename}.pug`,
//     options
//   );
//   console.log(html);
//   return html;
// };

// exports.send = async options => {
//   const html = generateHTML(options.filename, options);
//   const mailOptions = {
//     from: `Gabss <noreply@mail.com`,
//     to: options.user.email,
//     subject: options.subject,
//     html,
//     text: "This will also be filled in later"
//   };

//   const sendMail = promisify(transport.sendMail, transport);
//   return sendMail(mailOptions);
// };
