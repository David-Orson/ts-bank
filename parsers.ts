import { BankAccount } from "./bank";

export const parseAccount = (line: string): BankAccount => {
    const parts = line.split(",");
    const account = {} as BankAccount;

    account.name = parts[0];
    account.address = parts[1];
    account.accountNumber = parseInt(parts[2], 10);
    account.accountType = parts[3];
    account.balance = parseInt(parts[4], 10);
    account.pin = parseInt(parts[5], 10);

    return account;
};
