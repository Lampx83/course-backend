module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:*', 'http://127.0.0.1:*', 'https://fit-frontend-3y56.vercel.app', 'https://fit.neu.edu.vn', 'http://localhost:63342'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'Access-Control-Allow-Origin'],
      keepHeaderOnError: true,
    },
  },
  /*{
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'http://101.96.66.219:8015', 'https://fit.neu.edu.vn'],
        }
      }
    }
  },*/
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'default-src': ["'self'", 'http:'],
          'connect-src': ["'self'", 'http://101.96.66.219:8015', 'https://fit.neu.edu.vn', 'http://fit.neu.edu.vn'],
          'img-src': ["'self'", 'data:', 'blob:'],
          'media-src': ["'self'", 'data:', 'blob:'],
          'frame-ancestors': ["'self'"],
          'script-src': ["'self'", "'unsafe-inline'", 'http:'],
          'style-src': ["'self'", 'http:', "'unsafe-inline'"],
        },
      },
    },
  },
];
