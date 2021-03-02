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
        queryInterface.addColumn(
          'Users',
          'slat',
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t },
        ),
        queryInterface.addConstraint('Users', {
          fields: ['email'],
          type: 'unique',
          name: 'custom_unique_constraint_name',
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
      return Promise.all([queryInterface.removeColumn('Users', 'slat', { transaction: t })]);
    });
  },
};
