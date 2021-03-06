const chalk = require('chalk')
const inquirer = require('inquirer')
const departments = require('./handler/department')
const employee = require('./handler/employee')
const role = require('./handler/roles')
const { db } = require("./db/db")

async function init(){

    console.log( chalk.bgGray.green.bold(" Welcome to the employee database. \n"));

    await inquirer.prompt([
        {
            type: 'input',
            name: 'welcome',
            message: 'Press ENTER to continue, CTRL+C to QUIT at any time'
        }
    ])

    console.clear()

    await employeeDatabase();

    db.end();
    
    return;

}


async function employeeDatabase() {

    console.log( chalk.bgGray.green.bold("\n Please choose an option below. \n"));

    const manageChoice = await inquirer.prompt(mainMenu);

    console.clear();
     
    switch (manageChoice.mainMenuChoice){

        case "employees":
            await employee.manageEmployees();
            break;

        case "departments":
            await departments.manageDepartments();
            break;

        case "roles":
            await role.manageRoles();
            break;

        case "quit":
            if(manageChoice.exitProgram) {
                return;
            }else{
                break;
            }
        default:
            break;
    }

    await employeeDatabase();


    return;

}

const mainMenu = [
    {
        type: "list",
        name: "mainMenuChoice",
        message: "Select an option:",
        choices: [
            new inquirer.Separator(), 
            {
                name: "Manage Employees",
                value: "employees"
             },
             {
                 name: "Manage Departments",
                 value: "departments"
             },
             {
                 name: "Manage Roles",
                 value: "roles"
              },
              new inquirer.Separator(),
              {
                  name: "Quit",
                  value: "quit"
              } 
            ],
        default: 0,
    },

    {
        type: "confirm",
        name: "exitProgram",
        message: "Are you sure you want to quit?",
        when:(answers ) => {
            return answers.mainMenuChoice === "quit"
        }
    }
]



init();