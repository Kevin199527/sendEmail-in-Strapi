Aqui está uma explicação detalhada do código de configuração do envio de e-mails e do agendamento de tarefas, e sobre instalações e links para documentações relevantes.


# Explicação do Código de Envio de E-mails e Agendamento de Tarefas

## Arquivo `.env`

O arquivo `.env` contém as variáveis de ambiente necessárias para a configuração do provedor de e-mail.

```plaintext
EMAIL_SUPORT=emil_configurado
PASS_EMAIL_SUPORT=ovjgvynzfiyaarqs
HOST_EMAIL=smtp.gmail.com
PROT_EMAIL=465
```

## Configuração do Plugin de E-mail

A configuração do plugin de e-mail no Strapi é feita no arquivo de configuração de plugins, utilizando as variáveis de ambiente definidas no arquivo `.env`.

```javascript
module.exports = ({ env }) => ({
  // Outras configurações de plugins
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('HOST_EMAIL'),
        port: env('PROT_EMAIL'),
        secure: true,
        auth: {
          user: env('EMAIL_SUPORT'),
          pass: env('PASS_EMAIL_SUPORT')
        }
      },
      settings: {
        defaultFrom: 'fundacaodretu.dev@gmail.com',
        defaultReplyTo: 'noreply@fundacaodrtu.cv',
      }
    }
  }
});
```

## Script de Envio de E-mails

O script de envio de e-mails é responsável por enviar um e-mail de teste usando o Nodemailer e é agendado para ser executado a cada minuto utilizando o `node-cron`.

### Configuração do Agendamento e Envio de E-mail

```javascript
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
      to: '',
      from: '',
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
        </table>
      `
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
```

## Instalações Necessárias

Para configurar o envio de e-mails e agendamento de tarefas, é necessário instalar algumas dependências.

### Nodemailer

Nodemailer é utilizado para enviar e-mails.

```bash
npm install nodemailer
```

### Node-cron

Node-cron é utilizado para agendar tarefas.

```bash
npm install node-cron
```

## Documentação

- **Strapi Documentation**: [Strapi Documentation](https://docs.strapi.io)
- **Nodemailer Documentation**: [Nodemailer](https://nodemailer.com/about/)
- **Node-cron Documentation**: [node-cron](https://github.com/node-cron/node-cron)
