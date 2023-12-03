// knexfile.js
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "hayes",
      password: "Ikopup",
      database: "joy_of_painting",
      charset: "utf8",
    },
    migrations: {
      directory: "./db/migrations",
    },
  },
};
