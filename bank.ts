import { getIntegerInput, getStringInput } from "./io";
import { parseAccount } from "./parsers";
import {
    deleteAccount,
    getAccount,
    getAccounts,
    readFile,
    saveAccountToFile,
    updateAccount,
} from "./files";

export type BankAccount = {
    name: string;
    address: string;
    accountNumber: number;
    accountType: string;
    balance: number;
    pin: number;
};

const filePath = "./accounts.dat";

export const createAccount = async () => {
    const account = {} as BankAccount;

    account.name = await getStringInput("Please enter your name: ");
    account.address = await getStringInput("Please enter your address: ");
    account.accountType = await getStringInput(
        "Please enter your account type: "
    );
    account.pin = await getIntegerInput("Please enter your pin: ");

    const accountNumbers = await getAccountNumbers();
    if (accountNumbers.length === 0) {
        account.accountNumber = 12345678;
    } else {
        account.accountNumber = Math.max(...accountNumbers) + 1;
    }
    account.balance = 0;

    saveAccountToFile(filePath, account);
};

export const getAccountDetails = async () => {
    const accountNumber = await getIntegerInput(
        "Please enter your account number: "
    );
    const pin = await getIntegerInput("Please enter your pin: ");
    const account = await getAccount(filePath, accountNumber);

    if (account) {
        if (account.pin !== pin) {
            console.error("Invalid pin.");
            return;
        }
        console.log("here are the details of your account: ");
        console.log(account);
    } else {
        console.error("Account not found.");
    }
    return account;
};

export const getAccountNumbers = async (): Promise<number[]> => {
    const accounts = await getAccounts(filePath);
    return accounts.map((account) => account.accountNumber);
};

export const depositFunds = async () => {
    const accountNumber = await getIntegerInput(
        "Please enter your account number: "
    );
    const pin = await getIntegerInput("Please enter your pin: ");
    const amount = await getIntegerInput("Please enter the amount: ");

    const account = await getAccount(filePath, accountNumber);
    if (account) {
        if (account.pin !== pin) {
            console.error("Invalid pin.");
            return;
        }

        account.balance += amount;
        updateAccount(filePath, account);
        console.log("Thank you, you're new balance is: " + account.balance);
    } else {
        console.error("Account not found.");
    }
};

export const withdrawFunds = async () => {
    const accountNumber = await getIntegerInput(
        "Please enter your account number: "
    );
    const pin = await getIntegerInput("Please enter your pin: ");
    const amount = await getIntegerInput("Please enter the amount: ");

    const account = await getAccount(filePath, accountNumber);
    if (account) {
        if (account.pin !== pin) {
            console.error("Invalid pin.");
            return;
        }

        if (account.balance < amount) {
            console.error("Insufficient funds.");
            return;
        }

        account.balance -= amount;
        updateAccount(filePath, account);
        console.log("Thank you, you're new balance is: " + account.balance);
    } else {
        console.error("Account not found.");
    }
};

export const transferFunds = async () => {
    const fromAccountNumber = await getIntegerInput(
        "Please enter your account number: "
    );
    const pin = await getIntegerInput("Please enter your pin: ");
    const toAccountNumber = await getIntegerInput(
        "Please enter the account number to transfer to: "
    );
    const amount = await getIntegerInput("Please enter the amount: ");

    const fromAccount = await getAccount(filePath, fromAccountNumber);
    const toAccount = await getAccount(filePath, toAccountNumber);
    if (fromAccount && toAccount) {
        if (fromAccount.pin !== pin) {
            console.error("Invalid pin.");
            return;
        }

        if (fromAccount.balance < amount) {
            console.error("Insufficient funds.");
            return;
        }

        fromAccount.balance -= amount;
        toAccount.balance += amount;
        await updateAccount(filePath, fromAccount);
        await updateAccount(filePath, toAccount);
        console.log(
            "Thank you, the funds have been transfered, you're new balance is : " +
                fromAccount.balance
        );
    } else {
        console.error("Account not found.");
    }
};

export const removeAccount = async () => {
    const accountNumber = await getIntegerInput(
        "Please enter your account number: "
    );
    const pin = await getIntegerInput("Please enter your pin: ");

    const account = await getAccount(filePath, accountNumber);
    if (account) {
        if (account.pin !== pin) {
            console.error("Invalid pin.");
            return;
        }

        await deleteAccount(filePath, accountNumber);
        return;
    } else {
        console.error("Account not found.");
    }
};
