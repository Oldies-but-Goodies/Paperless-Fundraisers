# Paperless-Fundraisers

## How to deploy for local development

1. clone this repo
2. install server side dependencies (cd to root of project and run `npm i`)
3. install client side dependencies (cd to ./client and run `npm i`)
4. install mysql community edition and ensure that mysqld is running
5. in the root of the project, create `.env` file - which we're expecting the following

```DB_HOST=[insert IP address or hostname of your MySQL database - for dev environments maybe this is 127.0.0.1]
DB_PORT=[insert the port your MYSQL server is running on - the default is 3306]
DB_USER=[insert your username here - maybe root]
DB_PASS=[insert your password here]
DB_DB=[insert the name of the database - we used pf_db]
DB_CHECK_EXP_INTERVAL=900000
DB_EXPIRATION=86400000
DB_SECRET=keyboard_cat
```

6. edit the `./config/config.json` file and in "development" set password to the same as DB_PASS
7. from the root of the project, execute `npx sequelize db:migrate`
8. We need to create the sessions table:

```
CREATE TABLE sessions (
  session_id varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  expires int(11) unsigned NOT NULL,
  data text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (session_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

9. `npm run start:dev`

# Dependencies

Developed in June 2021, this application was first written with the following server side dependencies:

| module                | version |
| --------------------- | ------- |
| bootstrap             | ^4.6.0  |
| crypto                | ^1.0.1  |
| dotenv                | ^8.6.0  |
| express               | ^4.17.1 |
| express-mysql-session | ^2.1.4  |
| express-session       | ^1.17.1 |
| if-env                | ^1.0.4  |
| mysql2                | ^2.2.5  |
| passport              | ^0.4.1  |
| passport-local        | ^1.0.0  |
| react-bootstrap       | ^1.6.1  |
| sequelize             | ^6.3.5  |

```

```
