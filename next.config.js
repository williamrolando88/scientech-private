module.exports = {
  swcMinify: false,
  trailingSlash: false,
  env: {
    FIREBASE_API_KEY: process.env.API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    FIREBASE_APPID: process.env.APPID,
  },
};
