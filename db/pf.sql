CREATE DATABASE pf_db;
DROP DATABASE IF EXISTS pf_db;

USE pf_db;

CREATE TABLE user (
  id INT NOT NULL,
  first_name VARCHAR(40) NULL,
  last_name VARCHAR(40) NULL,
  email VARCHAR(50) NULL,
  passwords VARCHAR(50) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE product (
  id INT NOT NULL,
  product_name VARCHAR(40) NULL,
  product_description VARCHAR(60) NULL,
  price DECIMAL(10,2) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE customer (
  id INT NOT NULL,
  first_name VARCHAR(40) NULL,
  last_name VARCHAR(40) NULL,
  email VARCHAR(50) NULL,
  address_line 1 VARCHAR(50)
  address_line 2 VARCHAR(50)
  city VARCHAR(50),
  us_state VARCHAR(50),
  zip VARCHAR(50),
  phone VARCHAR(15),
  passwords VARCHAR(50) NULL, 
  created_date TIMESTAMP,
  updated_date TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE order (
  id INT NOT NULL,
  customer_id INT NOT NULL,
  order_total DECIMAL(10,2) NOT NULL,
  customer_remit VARCHAR(20)NOT NULL,
  seller_remit VARCHAR(20)NOT NULL,
  order_status VARCHAR(15) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE order_details (
  id INT NOT NULL,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  product_qty INT NOT NULL,
  line_total DECIMAL(10,2) NOT NULL,
  created_date DATETIME NULL,
  updated_date DATETIME NULL,
  PRIMARY KEY (id)
);

CREATE TABLE fundraiser (
  id INT NOT NULL,
  fundraiser_name VARCHAR(40),
  start_day DATE NOT NULL,
  end_day DATE NOT NULL,
  fundraiser_description VARCHAR(40),
  fundraiser_goal DECIMAL(10,2),
  created_date DATETIME NULL,
  updated_date DATETIME NULL,
  PRIMARY KEY (id)
);

CREATE TABLE user_fundraiser (
  id INT NOT NULL,
  user_id INT NOT NULL,
  fundraiser_id INT NOT NULL,
  admin_level VARCHAR(15),
  PRIMARY KEY (id)
);


-- CREATE TABLE `pf` (
--   `pf_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
--   `expires` int(11) unsigned NOT NULL,
--   `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
--   PRIMARY KEY (`session_id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE sessions (
  session_id varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  expires int(11) unsigned NOT NULL,
  data text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (session_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;