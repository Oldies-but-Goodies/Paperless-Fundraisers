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
7. from the root of the project, execute `npx run seed`
8. `npm run start:dev`

### seed usernames / password

| username                      | password | role  |
| ----------------------------- | -------- | ----- |
| jason.e.jones+test1@gmail.com | password | admin |
| jason.e.jones+test2@gmail.com | password | admin |
| jason.e.jones+test3@gmail.com | password | admin |
| jason.e.jones+test4@gmail.com | password | admin |
| jason.e.jones+test5@gmail.com | password | user  |

[_Learn more about GMAIL task specific email addresses._](https://support.google.com/a/users/answer/9308648?hl=en)

# Server Dependencies

Developed in June 2021, this application was first written with the following server side dependencies:

| module                | version |
| --------------------- | ------- |
| bcrypt                | ^5.0.1  |
| bcryptjs              | ^2.4.3  |
| bootstrap             | ^4.6.0  |
| dotenv                | ^8.6.0  |
| express               | ^4.17.1 |
| express-mysql-session | ^2.1.4  |
| express-session       | ^1.17.1 |
| if-env                | ^1.0.4  |
| mysql2                | ^2.2.5  |
| passport              | ^0.4.1  |
| passport-local        | ^1.0.0  |
| react-bootstrap       | ^1.6.1  |
| react-router          | ^5.2.0  |
| sequelize             | ^6.3.5  |

# Client Dependencies

| module           | version  |
| ---------------- | -------- |
| axios            | ^0.20.0  |
| bootstrap        | ^4.6.0   |
| lodash           | ^4.17.20 |
| react            | ^16.13.1 |
| react-bootstrap  | ^1.6.1   |
| react-dom        | ^16.13.1 |
| react-router-dom | ^5.2.0   |
| react-scripts    | 3.4.3    |
