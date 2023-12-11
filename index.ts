import * as readline from "readline";
import * as fs from "fs";
import {
    createAccount,
    depositFunds,
    getAccountDetails,
    removeAccount,
    transferFunds,
    withdrawFunds,
} from "./bank";
import { getIntegerInput } from "./io";

async function main() {
    try {
        const userInput = await getIntegerInput("Please enter an integer: ");
        if (userInput === 1) createAccount();
        if (userInput === 2) getAccountDetails();
        if (userInput === 3) depositFunds();
        if (userInput === 4) withdrawFunds();
        if (userInput === 5) transferFunds();
        if (userInput === 6) removeAccount();
    } catch (error) {
        console.error(error);
    }
}

console.log("Welcome to the bank!");
console.log("How can we help you today?");

console.log("Please choose an option:");
console.log("1. Create Account");
console.log("2. Get Account Details");
console.log("3. Deposit Funds");
console.log("4. Withdraw Funds");
console.log("5. Transfer Funds");
console.log("6. Delete Account");
console.log("7. Exit");
main();
