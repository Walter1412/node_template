'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable('UserVerification', {
          userAccountId: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          sendTime: {
            type: Sequelize.DATE,
          },
          purpose: {
            type: Sequelize.INTEGER,
          },
          type: {
            type: Sequelize.CHAR(10),
          },
          time: {
            type: Sequelize.DATE,
          },
          errCount: {
            type: Sequelize.INTEGER,
          },
          hasVerified: {
            type: Sequelize.CHAR(10),
          },
          createdUser: {
            type: Sequelize.INTEGER,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedUser: {
            type: Sequelize.INTEGER,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        }),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([queryInterface.dropTable('UserVerification')]);
    });
  },
};
