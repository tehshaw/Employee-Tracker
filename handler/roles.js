const inquirer = require('inquirer')
const chalk = require("chalk")
const { db } = require("../db/db")



const rolesMenu = [
    {
        type: "list",
        name: "action",
        message: "Select an option:",
        choices: [
            new inquirer.Separator(), 
             {
                 name: "Add role",
                 value: "add"
             },
             new inquirer.Separator(), 
             {
                 name: "Main Menu",
                 value: "quit"
             }],
        default: 0
    }
]

async function manageRoles(){

    console.log( chalk.bgGray.green.bold("\n Roles Manager \n"));

    const rolesActions =  await inquirer.prompt(rolesMenu)

    let deptsRaw;
    
    await db.promise().query(`select * from department;`)
    .then( ([rows,fields])  => {
        deptsRaw = rows;
    })
    .catch(console.error)
    .then( () => {})

     switch (rolesActions.action){
        
        case "add":

            const newRole = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'roleName',
                    message: 'Enter title: ',
                    validate(answer){
                        return answer.roleName !== "" || "Must not be empty";
                    }
                },
                {
                    type: 'number',
                    name: 'salary',
                    message: 'Enter annual salary: ',
                    validate(answer){
                        return answer.salary !== "" || "Must not be empty";
                    }
                },
                {
                    type: 'list',
                    name: 'deptAssign',
                    message: 'what department does this role belong? ',
                    choices: deptsRaw.map(dept => dept.name),
                    filter: (input) => {
                        const deptNum = deptsRaw.find( ({name}) => name === input).id
                        return deptNum
                    }
                    
                },
            ])

            const { roleName, salary, deptAssign } = newRole;

            await db.promise().query(`
            insert into roles ( title, salary, department_id ) values ( ?, ?, ? );`,
            [roleName, salary, deptAssign])
            .then(([rows,fields]) => {
                console.log(`Added ${roleName} to Roles`);
            } )
            .catch((err) => {
                console.log(err);
            })

            break;

        case "quit":
            return;
        default:
            break;
    }

    await manageRoles();
    
    return;    
}









module.exports = { manageRoles };