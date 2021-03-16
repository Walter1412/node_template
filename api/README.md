# node_template

# Database

npx sequelize-cli migration:generate --name update-user-column

npx sequelize-cli db:migrate

npx sequelize-cli db:migrate:undo