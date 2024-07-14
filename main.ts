#!/bin/env node
import inquirer from "inquirer";

console.log(`**************************   Welcome To SOBIA FURQAN Vocational Training Institute  **************************`);
const randomNumber: number = Math.floor(10000 + Math.random() * 90000);
console.log(`Your generated student ID is: ${randomNumber}`);

let myBalance: number = 0;

async function main() {
    const answer = await inquirer.prompt([
        {
            name: "studentName",
            type: "input",
            message: "Enter student name",
            validate: function (value) {
                if (value.trim() !== "") {
                    return true;
                }
                return "Please enter some value";
            }
        },
        {
            name: "course",
            type: "list",
            message: "Please select a course of your choice",
            choices: ["Cooking", "Baking", "Hand Crafts", "Hand Embroidery", "Flower Making", "Grooming"]
        }
    ]);

    const tuitionFee: { [key: string]: number } = {
        "Cooking": 1000,
        "Baking": 2000,
        "Hand Crafts": 500,
        "Hand Embroidery": 900,
        "Flower Making": 600,
        "Grooming": 2500
    };

    const selectedCourse = answer.course;
    const fee = tuitionFee[selectedCourse];

    console.log(`\nTuition Fee for ${selectedCourse}: ${fee}/-\n`);
    console.log(`Balance: ${myBalance}\n`);

    myBalance += fee;

    console.log(`Updated Balance after enrolling in ${selectedCourse}: ${myBalance}\n`);

    const payment = await inquirer.prompt([
        {
            name: "paymentType",
            type: "list",
            message: "Please select a payment method",
            choices: ["Bank transfer", "Easypaisa", "Jazzcash"]
        },
        {
            name: "amount",
            type: "input",
            message: "Enter the amount to transfer",
            validate: function (value) {
                const valid = !isNaN(parseFloat(value)) && parseFloat(value) > 0;
                return valid || "Please enter a valid amount";
            }
        }
    ]);

    console.log(`Payment method selected: ${payment.paymentType}`);
    console.log(`Amount entered: ${payment.amount}`);
    
    const paymentAmount = parseFloat(payment.amount);

    if (paymentAmount === fee) {
        console.log(`Payment done successfully. Congratulations! You have been enrolled in ${selectedCourse}`);
        myBalance += paymentAmount;
    } else {
        console.log(`Invalid amount of fee for ${answer.course} course \n`);
    }

    const nextAction = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "What would you like to do next?",
            choices: ["View course", "Exit"]
        }
    ]);

    if (nextAction.select === "View course") {
        console.log("\n*************** View Status **************\n");
        console.log(`Student Name: ${answer.studentName}`);
        console.log(`Student ID: ${randomNumber}`);
        console.log(`Course Enrolled: ${selectedCourse}`);
        console.log(`Balance: ${myBalance}`);
    } else {
        console.log("Exiting student management system");
    }
}

main();
