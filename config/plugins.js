module.exports = ({ env }) => ({
  'strapi-plugin-populate-deep': {
    config: {
      defaultDepth: 10, // Default is 5
    },
  },
  seo: {
    enable: true,
  },
  documentation: {
    enabled: true,
    config: {
      "x-strapi-config": {
        plugins: [],
      },
    },
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: 'smtp-mail.outlook.com',
        port: 587,
        auth: {
          user: env('EMAIL_ADDRESS'),
          pass: env('EMAIL_PASSWORD'),
        }
      },
      settings: {
        defaultFrom: env('EMAIL_ADDRESS'),
        defaultReplyTo: env('EMAIL_ADDRESS'),
      },
    },
  },
});