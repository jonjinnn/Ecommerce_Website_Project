module.exports = (sequelize, Sequelize) => {
  const Phone = sequelize.define("phone", {
    model: {
      type: Sequelize.STRING
    },
    color: {
      type: Sequelize.STRING
    },
    memory: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.DECIMAL
    },
    description: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.STRING
    },
    image_url: {
      type: Sequelize.STRING
    },
    numUnits: {
      type: Sequelize.INTEGER
    }
  });

  return Phone;
};
