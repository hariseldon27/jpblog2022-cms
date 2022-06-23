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
      origin: ['north141.com', 'local.north141.com']
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
