const inquirer = require('inquirer')
const chalk = require("chalk")
const { db } = require("../db/db")



const deptMenu = [
    {
        type: "list",
        name: "action",
        message: "Select an option:",
        choices: [
            new inquirer.Separator(), 
            {
                name: "Show active departments",
                value: "get"
             },
             {
                 name: "Add department",
                 value: "post"
             },
            //  {
            //      name: "Remove department",
            //      value: "delete"
            //  },
             new inquirer.Separator(), 
             {
                 name: "Main Menu",
                 value: "quit"
             }],
        default: 0
    }
]

async function manageDepartments(){

    console.log( chalk.bgGray.green.bold("\n Department Manager \n"));

    const deparmentActions =  await inquirer.prompt(deptMenu)


    switch (deparmentActions.action){
        
        case "get":
            await db.promise().query(`select department.name  as "Department Name",
            sum(roles.salary) as "Total Salary Budget"
            from department
            inner join roles on department.id = roles.department_id 
            inner join employee on roles.id = employee.role_id
            where department.id = roles.department_id and roles.id = employee.role_id
            group by department.name`)
            .then( ([rows,fields]) => {
                console.log( chalk.bgBlueBright.white ("Showing all departments"));
                console.table(rows);
            })
            .catch(console.error())


            break;
        case "post":

            const dept = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'deptName',
                    message: 'Enter department name: ',
                    validate(answer){
                        return answer.deptName !== "" || "Must not be empty";
                    }
                }
            ])



            await db.promise().query(`
            insert into department ( name ) values ( ? );`,
            dept.deptName)
            .then( ([rows,fields]) => {
                console.log( chalk.bgBlueBright.white (`Added ${dept.deptName} to Departments`));
            }) 



            break;

        case "quit":
            return;
        default:
            break;
    }

    await manageDepartments();
    
    return;    
}









module.exports = { manageDepartments };