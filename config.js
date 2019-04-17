module.exports = {
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 8000,
  URL: process.env.BASE_URL || "http:localhost:8000",
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "URL_DATABASE_GOES_HERE",
  SECRET_KEY: process.env.JWT_SECRET || "secretkey"
};
