#! /usr/bin/env node
import inquirer from "inquirer"

let randomNumber: number = Math.floor(10000 + Math.random() *90000)

let myBalance: number = 0

let answer = await inquirer.prompt(
    [
        {
            name: "student",
            type: "input",
            Message: "Enter student name",
            validate: function(value) {
                if (value.trim() !=="") {
                    return true;
                }
                return "please Enter a value";
            },
        },
        {
            name: "Course",
            type: "list",
            message: "Select your Course",
            choices:["BSCS","BBA","BSIT","MS Data Science", "MS Computer Science"]
        }
    ]
);

const tutionFee: {[key: string]: number} = {
    "BSCS" : 105000,
    "BBA": 87000,
    "BSIT": 92000,
    "MS Data Science": 165000,
    "MS Computer Science": 140000,
} 
console.log(`\ntutionFee: ${tutionFee[answer.Course]}/-\n`);
console.log(`Balance: ${myBalance}\n`);

let paymentType = await inquirer.prompt([{
    name: "payment",
    type: "list",
    message: "Select Payment method",
    choices: ["Bank Transfer", "Easypaisa","Jazzcash"]
},
{
    name: "amount",
    type: "number",
    message: "Transfer Money",
    validate: function(value){
        if (value > 0){
            return true
        }
        return "Please Enter Amount.";
    },
}
]
);
console.log(`\nYou select Payment Method ${paymentType.payment}\n`);

const tutionFees = tutionFee[answer.Course];
const paymentAmount = parseFloat(paymentType.amount)

if (tutionFees === paymentAmount){
    console.log(`congratulation, you successfully enrolled in ${answer.Course}.\n`);
  
    let ans = await inquirer.prompt([{
    name: "select",
    type: "list",
    message:"What would you want next",
    choices: ["View Status", "Exit"]
  }])

  if (ans.select === "View Status"){
    console.log("\nStatus\n");
    console.log(`Student Name: ${answer.student}`);
    console.log(`Student ID: ${randomNumber}`);
    console.log(`Course ${answer.Course}`);
    console.log(`Tution Fee Paid: ${paymentAmount}`);
    console.log(`Balance: ${myBalance += paymentAmount}`);
  }
  else{ 
    console.log(`\n Exit Student Management System\n`);
  }

}
else {
    console.log("invalid amount due to course\n")
};
