export const config = {
  mode: process.env.APP_MODE || "production",
  apiKey: process.env.API_KEY,
  dbHost: process.env.DB_HOST || "127.0.0.1",
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  featureFlagCheckout: process.env.FEATURE_FLAG_NEW_CHECKOUT === "true",
};
