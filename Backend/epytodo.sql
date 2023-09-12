DROP DATABASE IF EXISTS epytodo;
CREATE DATABASE epytodo;

use epytodo;

DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id INT unsigned  NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS todo;
CREATE TABLE todo (
    id INT unsigned NOT NULL AUTO_INCREMENT,
    title VARCHAR (255) NOT NULL,
    description text NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    due_time DATETIME NOT NULL,
    status ENUM('not started', 'todo', 'in progress', 'done') NOT NULL DEFAULT 'not started',
    user_id INT unsigned NOT NULL,
    PRIMARY KEY (id)
);
