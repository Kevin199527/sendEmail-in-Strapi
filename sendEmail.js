// ./config/sendEmail.js
module.exports = async ({ strapi }) => {

  const cron = require('node-cron');
  const nodemailer = require('nodemailer');

  cron.schedule('* * * * *', async () => {

    let sendNodemailer = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kevinlily.cv@gmail.com',
        pass: 'ovjgvynzfiyaarqs'
      }
    });

    const configEmail = {
      to: 'aveiga.l20@us.edu.cv',
      from: 'kevinlily.cv@gmail.com',
      subject: 'The Strapi Email plugin worked successfully',
      text: 'The Strapi Email plugin worked successfully',
      html: `
    <table style="background-color: #f4f4f4; padding: 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 5px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <tr>
              <td style="padding: 20px; text-align: center; background-color: #4CAF50; color: #ffffff;">
                <h1 style="margin: 0; font-size: 24px; font-family: Arial, sans-serif;">Fundação DRET.U</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; text-align: left; font-family: Arial, sans-serif; color: #333333;">
                <p style="font-size: 16px; line-height: 1.5; margin: 0 0 10px;">
                  Caro destinatário,
                </p>
                <p style="font-size: 16px; line-height: 1.5; margin: 0 0 10px;">
                  Estamos felizes em informar que o teste de envio de e-mail foi bem-sucedido.
                </p>
                <p style="font-size: 16px; line-height: 1.5; margin: 0 0 10px;">
                  A Fundação DRET.U está comprometida em fornecer a melhor experiência para você.
                </p>
                <p style="font-size: 16px; line-height: 1.5; margin: 0;">
                  Atenciosamente,<br>
                  Equipe DRET.U
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; text-align: center; background-color: #f4f4f4; font-family: Arial, sans-serif; color: #777777;">
                <p style="font-size: 12px; line-height: 1.5; margin: 0;">
                  Fundação DRET.U, Rua Exemplo, 123, Cidade, País
                </p>
                <p style="font-size: 12px; line-height: 1.5; margin: 0;">
                  Este é um e-mail automático, por favor, não responda.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table> `
    };

    sendNodemailer.sendMail(configEmail, (error, info) => {
      if (error) {
        console.log("Erro ao enviar email", error);
      } else {
        console.log('Email sent: ' + configEmail);
      }
    });

  });
};
