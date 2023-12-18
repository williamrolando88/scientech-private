module.exports = {
  swcMinify: false,
  trailingSlash: true,
  env: {
    // HOST
    HOST_API_KEY: 'https://api-dev-minimal-v4.vercel.app',
    // MAPBOX
    MAPBOX_API: '',
    // FIREBASE
    FIREBASE_API_KEY: process.env.API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    FIREBASE_APPID: process.env.APPID,
    FIREBASE_MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    // AWS COGNITO
    AWS_COGNITO_USER_POOL_ID: '',
    AWS_COGNITO_CLIENT_ID: '',
    // AUTH0
    AUTH0_DOMAIN: '',
    AUTH0_CLIENT_ID: '',
  },
};
