module.exports = {

  "* * * * *": async ({strapi}) => {

    const nodemailer = require('nodemailer');

    let sendNodemailer = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kevinlily.cv@gmail.com',
        pass: 'ovjgvynzfiyaarqs',
      }
    });

    const notificacao = await strapi.db.query('api::notificacao.notificacao').findMany({
      where:{
        enviado: false
      }
    });

    for (let listNotification of notificacao){

      const configEmail = {
        to: listNotification.email,
        from: 'kevinlily.cv@gmail.com',
        subject: listNotification.titulo,
        text: listNotification.mensagem,
      };

      if(listNotification.enviado === false){

        try {

          sendNodemailer.sendMail(configEmail, async (error, info) => {
            if (error) {
              console.log("Erro ao enviar email =>", error);
            } else {
              console.log('Email sent: ' + configEmail);
            }
          });

          console.log("listNotification =>", listNotification)

          await strapi.db.query('api::notificacao.notificacao').update({
            where: {
              id: listNotification.id
            },
            data: {
              enviado: true
            }
          })

        } catch (erro) {
          console.log("Erro => ", erro)
        }
      }else{
        console.log("Email ja foi enviado.")
      }

    }

  },
};
