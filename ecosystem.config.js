module.exports = {
    apps: [
      {
        name: 'jpblog2022-cms', // Your project name
        script: 'npm', // For this example we're using npm, could also be yarn
        args: 'run develop', // Script to start the Strapi server, `start` by default
        env: {
          NODE_ENV: 'dev',
          DATABASE_HOST: 'strapi-jpblog2022-database.c4pzwblrnggf.us-west-2.rds.amazonaws.com', // database Endpoint under 'Connectivity & Security' tab
          DATABASE_PORT: '5432',
          DATABASE_NAME: 'jpblog2022db', // DB name under 'Configuration' tab
          DATABASE_USERNAME: 'postgres', // default username
          DATABASE_PASSWORD: 'YMQqi7c6WNknMSc',
          AWS_ACCESS_KEY_ID: 'AKIART6YM46AKD7WVGD7',
          AWS_ACCESS_SECRET: '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', // Find it in Amazon S3 Dashboard
          AWS_REGION: 'us-west-2',
          AWS_BUCKET_NAME: 'strapi-jpblog2022-storage',
          APP_KEYS: [
              'asfdw3rasf',
              'asfeagsw9458',
              '0urnqwlk453'
          ],
          API_TOKEN_SALT: 'AFEat4sl348sncjppa[ew05/.,1w]sa', 
          ADMIN_JWT_SECRET: 'FTRybBgi8GedYv1MIBjysQ==',
        },
      },
    ],
  };