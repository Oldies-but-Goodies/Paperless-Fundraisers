# Paperless-Fundraisers

# Motivation for the Project

As a director of many fundraisers it is very frustrating and tedious trying to manually manage all of the order tracking and money reconciliation. It is very difficult to track all of the orders and decipher other peoples handwriting as well as keeping track of payments made. The purpose of this application is to provide one spot for a director of a fundraiser to be able to track their fundraising throughout the entire process. Paperless Fundraisers aims to provide one place for all of this information to be tracked and easily managed by the director of the fundraiser and also by the individual salespeople raising money for the fundraiser.

# Overview of the Application

Paperless Fundraisers gives the user the ability to login and easily keep track of their fundraisers and orders that they have taken. It provides an overview of each fundraiser with the goal and how much money has been raised. There are a variety of options for the salespeople and an additional level of options for the Admin of the fundraiser. Salespeople can enter a customers order and track the money that has been paid. Admins can create the fundraiser, add products, reconcile payments from the customers and salespeople and add new salespeople. Admins can send email invites to anyone wanting to join the fundraiser, they can also update the fundraiser, update salespeople, orders and products. Admins can also delete a user, update their information and also reset their password. This application is unique in that it provides the capability to track both the customers payment for the product as well as the salespersons payment of their collected orders.

The workflow for the application is as follows:

1. Admin creates the fundraiser and adds the products to be sold.
2. Admins then send email invites to the sellers.
3. Sellers sell the products and insert/update customer orders.
4. Sellers reconcile the money collected and keep track of which customers have already paid.
5. Admin keeps track of the orders and how much money is being raised.
6. Admin keeps track of how much money each salesperson has raised.
7. Admins also reconcile the money collected and keep track of which salespeople have already paid.

## How to deploy for local development

1. clone this repo
2. install server side dependencies (cd to root of project and run `npm i`)
3. install client side dependencies (cd to ./client and run `npm i`)
4. install mysql community edition and ensure that mysqld is running

   - [detailed instructions for installing MySQL on Windows](./docs/mysql-windows-guide.md)
   - [detailed instructions for installing MySQL on MacOS](./docs/mysql-mac-guide.md)

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

## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.

| Description                                    | Method | Route                                           | Requires Authentication |
| :--------------------------------------------- | :----- | :---------------------------------------------- | :---------------------: |
| Get all customers                              | GET    | `/api/customer/`                                |           Yes           |
| Get a single customer                          | GET    | `/api/customer/:id`                             |           Yes           |
| Create a customer                              | POST   | `/api/customer/`                                |           No            |
| Update a customer                              | PUT    | `/api/customer/:id`                             |           Yes           |
| Delete a customer                              | DELETE | `/api/customer/:id`                             |           Yes           |
| Send an email                                  | POST   | `/api/emailRoutes/`                             |           Yes           |
| Get all fundraisers                            | GET    | `/api/fundraiser/`                              |           No            |
| Get my fundraisers                             | GET    | `/api/fundraiser/my`                            |           Yes           |
| Get a single fundraiser                        | GET    | `/api/fundraiser/:id`                           |           Yes           |
| Create a fundraiser                            | POST   | `/api/fundraiser/`                              |           Yes           |
| Update a fundraiser                            | UPDATE | `/api/fundraiser/:id`                           |           Yes           |
| Delete a fundraiser                            | DELETE | `/api/fundraiser/:id`                           |           Yes           |
| Get all orders for a fundraiser                | GET    | `/api/fundraiser/all/:id`                       |           Yes           |
| Get all orders for a user                      | GET    | `/api/fundraiser/allOrdersforUser/:id`          |           Yes           |
| Get a single order                             | GET    | `/api/fundraiser/:id`                           |           Yes           |
| Create an order                                | POST   | `/api/fundraiser/`                              |           Yes           |
| Update an order                                | PUT    | `/api/fundraiser/:id`                           |           Yes           |
| Delete an order                                | DELETE | `/api/fundraiser/:id`                           |           Yes           |
| Get all order details                          | GET    | `/api/orderDetails/`                            |           Yes           |
| Get all order details for OrderId              | GET    | `/api/orderDetails/allOrderDetailsForOrder/:id` |           Yes           |
| Get a single order detail                      | GET    | `/api/orderDetails/:id`                         |           Yes           |
| Create an order detail                         | POST   | `/api/orderDetails/`                            |           Yes           |
| Update an order detail                         | PUT    | `/api/orderDetails/:id`                         |           Yes           |
| Delete an order detail                         | DELETE | `/api/orderDetails/:id`                         |           Yes           |
| Get all active products for a given fundraiser | GET    | `/api/product/fundraiser/all/:id`               |           Yes           |
| Get all products for a given fundraiser        | GET    | `/api/product/fundraiser/adminall/:id`          |           Yes           |
| Get all product details for OrderId            | GET    | `/api/product/fundraiser/adminall/:id`          |           Yes           |
| Get a single product detail                    | GET    | `/api/product/:id`                              |           Yes           |
| Create an product                              | POST   | `/api/product/`                                 |           Yes           |
| Update an product detail                       | PUT    | `/api/product/:id`                              |           Yes           |
| Delete an product detail                       | DELETE | `/api/product/:id`                              |           Yes           |
| Get Me                                         | GET    | `/api/users/`                                   |           No            |
| Sign Up + Login                                | POST   | `/api/users/signup`                             |           No            |
| Login                                          | POST   | `/api/users/login`                              |           No            |
| Logout                                         | POST   | `/api/users/logout`                             |           No            |
| Change Password                                | PUT    | `/api/users/updatePassword`                     |           Yes           |
| Admin Force Password Change                    | PUT    | `/api/users/adminUpdatePassword`                |           Yes           |
| Update a user                                  | PUT    | `/api/users/:id`                                |           Yes           |
| Get all User-Fundraiser associations           | GET    | `/api/userFundraiser/:fundid/users/:userid`     |           Yes           |
| Get my fundraisers                             | GET    | `/api/userFundraiser/myfundraisers`             |           Yes           |
| Link user to fundraiser                        | POST   | `/api/userFundraiser/addusertofundraiser`, obj  |           Yes           |
