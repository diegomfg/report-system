module.exports = {
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 8000,
  URL: process.env.BASE_URL || "http:localhost:3000",
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb://diegomfg:diego1210@ds147684.mlab.com:47684/report_system"
};
