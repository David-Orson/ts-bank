import * as fs from "fs";
import { BankAccount } from "./bank";
import { parseAccount } from "./parsers";

export const readFile = async (filename: string): Promise<string> =>
    new Promise((resolve, reject) => {
        fs.readFile(filename, "utf8", (err, data) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            resolve(data);
        });
    });

export const saveAccountToFile = (filename: string, account: BankAccount) => {
    const accountData = `${account.name},${account.address},${account.accountNumber},${account.accountType},${account.balance},${account.pin}\n`;

    fs.appendFileSync(filename, accountData);
};

export const saveAccountsToFile = (
    filename: string,
    accounts: BankAccount[]
) => {
    if (accounts.length === 0) {
        fs.rmSync(filename);
        return;
    }
    const accountData = accounts
        .map((account) => {
            return `${account.name},${account.address},${account.accountNumber},${account.accountType},${account.balance},${account.pin}`;
        })
        .join("\n");

    fs.writeFileSync(filename, accountData);
};

export const getAccounts = async (filename: string): Promise<BankAccount[]> => {
    if (!fs.existsSync(filename)) return [];

    const file = await readFile(filename);

    return file
        .split("\n")
        .map((line) => {
            return parseAccount(line);
        })
        .filter((account) => account.name !== "");
};

export const getAccount = async (
    fileName: string,
    accountNumber: number
): Promise<BankAccount | undefined> => {
    const accounts = await getAccounts(fileName);
    return accounts.find((account) => account.accountNumber === accountNumber);
};

export const getAccountNumbers = async (
    fileName: string
): Promise<number[]> => {
    const accounts = await getAccounts(fileName);
    return accounts.map((account) => account.accountNumber);
};

export const updateAccount = async (fileName: string, account: BankAccount) => {
    const accounts = await getAccounts(fileName);
    const index = accounts.findIndex(
        (a) => a.accountNumber === account.accountNumber
    );
    accounts[index] = account;

    saveAccountsToFile(fileName, accounts);
};

export const deleteAccount = async (
    fileName: string,
    accountNumber: number
) => {
    const accounts = await getAccounts(fileName);
    const index = accounts.findIndex((a) => a.accountNumber === accountNumber);
    accounts.splice(index, 1);

    saveAccountsToFile(fileName, accounts);
};
