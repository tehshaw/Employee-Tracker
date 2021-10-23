DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);

CREATE TABLE 'role' (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  CONSTRAINT role_FK 
  FOREIGN KEY (role_id) 
  REFERENCES role(id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT manager_FK 
  FOREIGN KEY (manager_id) 
  REFERENCES employee(id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

