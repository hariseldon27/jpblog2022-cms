module.exports = ({ env }) => ({
    upload: {
        config: {
            provider: 'aws-s3',
            providerOptions: {
                accessKeyId: env('AWS_ACCESS_KEY_ID'),
                secretAccessKey: env('AWS_ACCESS_SECRET'),
                region: env('AWS_REGION'),
                params: {
                    Bucket: env('AWS_BUCKET_NAME'),
                },
                logger: console // Only if you want to `stdout` logs
            },
            actionOptions: {
                upload: {},
                uploadStream: {},
                delete: {},
              },
        },
    },
    'users-permissions': {
        config: {
          jwtSecret: env('ADMIN_JWT_SECRET'),
          jwt: {
            expiresIn: '7d',
          },
        },
      },
  });