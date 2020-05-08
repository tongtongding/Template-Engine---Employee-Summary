const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
let employees=[];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function addEmployee(){
    inquirer
    .prompt([
        { 
            type:"list",
            message:"What type of team member would you like to add?",
            name:"teamMember",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "I don't want to add team member",
              ]
        }
    ])
    .then(
        userChoice =>{
            if(userChoice.teamMember === "Manager"){
                createManager();
            }else if(userChoice.teamMember === "Engineer"){
                createEngineer();
            }else if(userChoice.teamMember === "Intern"){
                createIntern();
            }else{
                if(employees.length >0){
                    
                    let htmlString = render(employees);
                    fs.writeFile(outputPath,htmlString,(err)=>{
                     if(err){
                         console.log(err);
                     }
                         console.log("Successfully write team html");
                    })
                }else{
                    console.log("No employee created");
                }
                
            }
        }
    )
}

addEmployee();

function createManager(){

    inquirer
        .prompt([
            {
                type:"input",
                message: "What is your manager's name?",
                name: "managerName"
            },
            {
                type:"input",
                message: "What is your manager's id?",
                name: "managerID"
            },
            {
                type:"input",
                message: "What is your manager's email?",
                name: "managerEmail"
            },
            {
                type:"input",
                message: "What is your manager's office number?",
                name: "managerOfficeNumber"
            }    
        ])
        .then(
            managerInfo=>{
                let manager = new Manager(managerInfo.managerName, managerInfo.managerID, managerInfo.managerEmail, managerInfo.managerOfficeNumber);

                employees.push(manager);
                addEmployee();
            }
        )

}

function createEngineer(){
    inquirer
        .prompt([
            {
                type:"input",
                message: "What is your engineer's name?",
                name: "engineerName"
            },
            {
                type:"input",
                message: "What is your engineer's id?",
                name: "engineerID"
            },
            {
                type:"input",
                message: "What is your engineer's email?",
                name: "engineerEmail"
            },
            {
                type:"input",
                message: "What is your engineer's Github username?",
                name: "engineerGithub"
            }    
        ])
        .then(
            engineerInfo=>{
                let engineer = new Engineer(engineerInfo.engineerName,engineerInfo.engineerID,engineerInfo.engineerEmail,engineerInfo.engineerGithub);

                employees.push(engineer);
                addEmployee();
            }
        )

}

function createIntern(){
    inquirer
        .prompt([
            {
                type:"input",
                message: "What is your intern's name?",
                name: "internName"
            },
            {
                type:"input",
                message: "What is your intern's id?",
                name: "internID"
            },
            {
                type:"input",
                message: "What is your intern's email?",
                name: "internEmail"
            },
            {
                type:"input",
                message: "What is your intern's school name?",
                name: "internSchool"
            }    
        ])
        .then(
            internInfo=>{
                let intern = new Intern(internInfo.internName,internInfo.internID,internInfo.internEmail,internInfo.internSchool);

                employees.push(intern);
                addEmployee();
            }
        )

}


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
