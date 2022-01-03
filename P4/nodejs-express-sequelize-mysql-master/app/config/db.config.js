module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Wz112585",
  DB: "phonedb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
