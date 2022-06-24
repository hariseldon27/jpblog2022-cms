module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'strapi-jpblog2022-storage.s3.us-west-2.amazonaws.com',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'strapi-jpblog2022-storage.s3.us-west-2.amazonaws.com',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  { 
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: ['https://api.north141.com', 'https://local.north141.com', 'https://dev.north141.com']
    }
  },
  {
    name: 'strapi::body',
    config: {
      formLimit: "256mb", 
      jsonLimit: "256mb", 
      textLimit: "256mb", 
      formidable: {
        maxFileSize: 200 * 1024 * 1024, 
      }
    }
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
