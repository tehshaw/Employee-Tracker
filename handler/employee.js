const inquirer = require('inquirer')
const chalk = require("chalk")
const { db } = require("../db/db")


const employeeMenu = [
    {
        type: "list",
        name: "action",
        message: "Select an option:",
        choices: [
            new inquirer.Separator(), 
            {
                name: "Show employees",
                value: "get"
            },
            {
                name: "Add employee",
                value: "post"
            },
            {
                name: "Update employee",
                value: "put"
            },
            new inquirer.Separator(), 
            {
                name: "Main Menu",
                value: "quit"
            }],
        default: 0
    }
]



async function manageEmployees(){

    console.log( chalk.bgGray.green.bold("\n Employee Manager \n"));

    const employeeActions =  await inquirer.prompt(employeeMenu)



     switch (employeeActions.action){

        case "get":
            await getEmployees();
            break;
        
        case "post":

            await addEmployee();
            break;

        case "put":
            await updateEmployee();
            break;

        case "quit":
            return;
        default:
            break;
    }

    await manageEmployees();
    
    return;    
}


async function getEmployees() {
    await db.promise().query(`
    select 	e.id as "Employee ID",
    concat(e.first_name, ' ', e.last_name)as "Employee Name",
    roles.title as "Job Title",
    department.name as "Department",
    roles.salary as "Salary",
    concat(e2.first_name, ' ', e2.last_name) as "Manager"
    from employee e
    left join employee e2 on e2.id = e.manager_id
    inner join roles on e.role_id = roles.id
    inner join department on roles.department_id = department.id`,)
    .then(([rows,fields]) => {
        console.log( chalk.bgBlueBright.white("Showing all Employees"));
        console.table(rows);
    } )
    .catch((err) => {
        console.log(err);
    })


}


async function addEmployee(){

    let rolesRaw;
    
    await db.promise().query(`select * from roles;`)
    .then( ([rows,fields])  => {
        rolesRaw = rows;
    })
    .catch(console.error)

    let managerRaw;

    await db.promise().query(`select * from employee;`)
    .then( ([rows,fields])  => {
        managerRaw = rows;
        console.log(managerRaw);
    })
    .catch(console.error)
    

    const newEmployee = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'First Name: ',
            validate(answer){
                return answer.roleName !== "" || "Must not be empty";
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Last Name: ',
            validate(answer){
                return answer.roleName !== "" || "Must not be empty";
            }
        },
        {
            type: 'list',
            name: 'roleAssign',
            message: 'What roles does this employee have? ',
            choices: rolesRaw.map(role => role.title),
            filter: (input) => {
                const roleNum = rolesRaw.find( ({title}) => title === input)
                return roleNum.id
            }
            
        },
        {
            type: 'list',
            name: 'managerAsign',
            message: 'Who will be the manager? ',
            choices: managerRaw.map(manager => manager.first_name + " " + manager.last_name),
            filter: (input) => {
                const manNum = managerRaw.find( name => (name.first_name + " " + name.last_name) === input);
                return manNum.id
            }
            
        }
    ])

    console.log(newEmployee);
    const { firstName, lastName, roleAssign, managerAsign } = newEmployee;

    await db.promise().query(`insert into employee ( first_name, last_name, role_id, manager_id ) values ( ?, ?, ?, ? );`,
    [firstName, lastName, roleAssign, managerAsign])
    .then(([rows,fields]) => {
         console.log( chalk.bgBlueBright.white(`Added ${firstName} ${lastName} to employees`));
    } )
    .catch((err) => {
        console.log(err);
    })

    return;

}

async function updateEmployee(){
    
}



module.exports = { manageEmployees };