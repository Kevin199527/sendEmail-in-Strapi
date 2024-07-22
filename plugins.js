 email:{
        config:{
          provider: `nodemailer`,
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
    },
