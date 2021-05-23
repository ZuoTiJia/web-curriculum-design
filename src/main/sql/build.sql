
USE web;

DROP TABLE records;
DROP TABLE goods;
DROP TABLE order_forms;
DROP TABLE users;

CREATE TABLE IF NOT EXISTS users(
    phone BIGINT PRIMARY KEY,
    pass_word CHAR(20) NOT NULL,
    name VARCHAR(10) NOT NULL,
    user_type CHAR(10) NOT NULL,
    user_address VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS order_forms (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    custom_phone BIGINT ,
    address VARCHAR (100) NOT NULL,
    `time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total_price DOUBLE NOT NULL,
    FOREIGN KEY(custom_phone) REFERENCES users(phone)
);

CREATE TABLE IF NOT EXISTS goods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    price DOUBLE NOT NULL,
    business_phone BIGINT NOT NULL,
    remnant_inventory INT NOT NULL,
    goods_type CHAR(15) NOT NULL,
    state CHAR(15) NOT NULL,

    photo_path CHAR(20) ,
    `describe` VARCHAR(200),
    cumulative_sales INT,
    FOREIGN KEY(business_phone) REFERENCES users(phone)
);

CREATE TABLE IF NOT EXISTS records (
    order_form_id INT ,
    goods_id INT  NOT NULL,
    number INT NOT NULL,
    record_type CHAR(10) NOT NULL,
    `time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY(order_form_id) REFERENCES order_forms(id),
    FOREIGN KEY(goods_id) REFERENCES goods(id)
);

INSERT INTO users (phone, pass_word, name, user_type, user_address) VALUE(18843336720, "asd123", "ccx", "Admin", null);
