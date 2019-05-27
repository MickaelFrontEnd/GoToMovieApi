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

export const sendAdminPassword = function (email, password) {
  var mailOptions = {
    from: 'noreply-happygotomovie@gmail.com',
    to: email,
    subject: 'Identifiant et mot de passe administrateur',
    html: `<h1>HAPPY GO TO MOVIE</h1>
    <p>Voici l'identifiant et mot de passe admin: admin@outlook.fr/Maodiapasy123! </p>
    <p>Cliquez <a href="${ URL }">ici</a> pour se connecter</p>
    <p>Cordialement, <br> L'equipe HAPPY GO TO MOVIE</p>`
  };
  sendMail(mailOptions);
};

export const sendWelcomeEmail = function(userName, userEmail) {
  var mailOptions = {
    from: 'noreply-happygotomovie@gmail.com',
    to: userEmail,
    subject: 'Bienvenu sur HAPPY GO TO MOVIE',
    html: `<h1>WELCOME TO HAPPY GO TO MOVIE</h1>
    <p>Bonjour ${ userName }</p>
    <p>Nous vous souhaitons le bienvenu sur HAPPY GO TO MOVIE. Pour toute assistance et/ou questions ,veuillez nous contactez sur cet adresse email</p>
    <p>Cordialement, <br> L'equipe HAPPY GO TO MOVIE</p>`
  };
  sendMail(mailOptions);
}
