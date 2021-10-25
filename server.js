const path = require('path');
const inquirer = require('inquirer')






async function init(){

    console.log("Welcome to the employee database.\n");

    await inquirer.prompt([
        {
            type: 'input',
            name: 'welcome',
            message: 'Press ENTER to continue, CTRL+C to QUIT at any time'
        }
    ])

    console.log(`
    Welcome to the Employee Database
    `);

    employeeDatabase();
    
}


async function employeeDatabase() {

    const manageChoice = await inquirer.prompt(mainMenu)
     
    switch (manageChoice.mainMenuChoice){

        case "employees":

            break;

        case "departments":

            break;

        case "roles":

            break;

        case "quit":
            if(manageChoice.exitProgram) {
                return -1;
            }else{
                break;
            }
    }


    employeeDatabase();

}

const mainMenu = [
    {
        type: "list",
        name: "mainMenuChoice",
        message: "Select an option:",
        choices: ["Manage Employees", "Manage Departments","Manage Roles", "Quit"],
        default: 3,
        filter: async (answer) => {
            return  answer == "Manage Employees" ? "employees" :
                    answer == "Manage Departments" ? "departments" :
                    answer == "Manage Roles" ? "roles" :
                    "quit";
        }
    },
    {
        type: "confirm",
        name: "exitProgram",
        message: "Are you sure you want to quit?",
        when(answers){
            return answers.mainMenuChoice === "quit"
        }
    }

]



init();