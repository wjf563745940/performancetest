'use strict';

module.exports = app => {
    const Sequelize= app.Sequelize;
  const { STRING, INTEGER, DATE } = app.Sequelize;
 
  const Test2 = app.model.define('test2', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      addc:{
        type: Sequelize.STRING
      },
      createdAt: {
      //  allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
     //   allowNull: false,
        type: Sequelize.DATE
      }
  });

  return Test2;
};