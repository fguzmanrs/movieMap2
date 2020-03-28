const nodemailer = require("nodemailer");
const { welcomeTemplate } = require("./emailTemplate");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = "Emily Yu <domato1618@naver.com>";
  }

  newTransport() {
    return nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "55d49066c9cda4",
        pass: "52583d121b2b20"
      }
    });
  }

  async send(template, subject) {
    let html;

    if (template === "welcome") {
      html = welcomeTemplate;
    }

    const message = {
      from: this.from,
      to: this.to,
      subject,
      html
    };

    await this.newTransport().sendMail(message);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to Movie Map!");
  }

  async sendResetPwd() {
    await this.send("resetPwd", "Reset your password within 10 minutes");
  }
};

// // Transporter + setting
// const transporter = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "55d49066c9cda4",
//     pass: "52583d121b2b20"
//   }
// });

// // Message
// const message = {
//   from: "domato1618@naver.com",
//   to: "bluerainmango@gmail.com",
//   subject: "Welcome to Movie Map!",
//   text: "Plain version of the message",
//   html: "<p>HaHaHa</p><button>click here</button>"
// };

// // Send email
// transporter.sendMail(message, (err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Message sent: " + res.message);
//   }
//   transporter.close();
// });
