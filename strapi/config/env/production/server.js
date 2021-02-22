module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: "https://hyttedeler.no/s/",
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "fe6f6f3fc13244b95fd312a5c4880c46"),
    },
  },
});
