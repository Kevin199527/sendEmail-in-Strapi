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

---

## Configuração do Agendamento e Envio de E-mail

A configuração do agendamento e envio de e-mail foi atualizada para enviar notificações a partir do banco de dados do Strapi. O código agora verifica as notificações que ainda não foram enviadas e as envia usando o Nodemailer. Após o envio, o status da notificação é atualizado para indicar que foi enviada.

---

OBS: dentro da notificaçao a um campo de tipo boolean que inicia com false se o email ainda nao for enviada.
Se email for enviada ele fica true, assim não ter que enviar de novo.

---

```javascript
// ./config/sendEmail.js
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
          });

        } catch (erro) {
          console.log("Erro => ", erro)
        }
      } else {
        console.log("Email já foi enviado.")
      }
    }
  },
};
```

Neste código:

1. **Configuração do Nodemailer**: O Nodemailer é configurado com as credenciais do Gmail.
2. **Consulta de Notificações**: O código consulta o banco de dados do Strapi para encontrar notificações que ainda não foram enviadas (`enviado: false`).
3. **Envio de E-mail**: Para cada notificação não enviada, o código configura e envia um e-mail usando o Nodemailer.
4. **Atualização do Status**: Após o envio do e-mail, o status da notificação é atualizado no banco de dados para `enviado: true`.

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
