INSERT INTO department (name)
VALUES  ("Sales"),
        ("Warehouse"),
        ("Management"),
        ("Human Resources"),
        ("Cusomter Service");

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Associate", 80000, 1),              #1
        ("Lead Sales Agent", 100000, 1),            #2
        ("Sales Manager", 130000, 1),               #3
        ("Warehouse Clerk", 32000, 2),              #4
        ("Warehouse Supervisor", 60000, 2),         #5
        ("Warehouse Manager", 80000, 2),            #6
        ("CFO", 500000, 3),                         #7
        ("CEO", 1200000, 3),                        #8  
        ("COO", 350000, 3),                         #9
        ("VP of Sales", 350000, 3),                 #10
        ("VP of Operations", 350000, 3),            #11
        ("Payroll Manager", 64000, 4),              #12    
        ("HR Manager", 80000, 4),                   #13 
        ("Training Manager", 64000, 4),             #14
        ("Customer Service Rep", 32000, 5),         #15
        ("Supervisor", 64000, 5),                   #16
        ("Team Manager", 80000, 5),                 #17
        ("Intern", 0, 1);                           #18

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  
        ("Zahid", "Hardin",     8, Null),
        ("Toby", "Garcia ",     7, null),
        ("Augustus", "Barbula", 9, Null),
        ("Maximus", "Lepidus", 10, Null),
        ("Cassius", "Dives", 11, Null),
        ("Lloyd", "Hourglass", 3, Null),
        ("Kikelia", "Wina", 6, Null),
        ("Arvy", "Winterrowd", 14, Null);

      
