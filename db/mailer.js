const URL = 'http://localhost:4200/login';

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'happy.goto.movie@gmail.com',
    pass: 'Maodiapasy123!'
  }
});

const sendMail = function (mailOptions) {
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

export const sendForgotPassword = function (email, password) {
  var mailOptions = {
    from: 'noreply-happygotomovie@gmail.com',
    to: email,
    subject: 'Réinitialisation mot de passe',
    html: `<h1>HAPPY GO TO MOVIE</h1>
    <p>Voici votre nouveau mot de passe: ${ password }</p>
    <p>Cliquez <a href="${ URL }">ici</a> pour se connecter</p>
    <p>Cordialement, <br> L'equipe HAPPY GO TO MOVIE</p>`
  };
  sendMail(mailOptions);
};
