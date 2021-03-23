# node_template

## Develop

```bash
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## Sequelize

- config path

`
/src/config/database.js
`

- sequelize setting file path

`
.sequelizerc
`

- create new migrate template

```bash
npx sequelize-cli migration:generate --name update-user-column
```

- update SQL

```bash
npx sequelize-cli db:migrate
```
- undo migrate

```bash
npx sequelize-cli db:migrate:undo
```

## Loaders

- [x] exprexx
- [x] logger
- [x] sequelize
- [x] swagger