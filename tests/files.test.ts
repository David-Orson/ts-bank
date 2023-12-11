import * as path from "path";
import * as fs from "fs";
import {
    readFile,
    saveAccountToFile,
    saveAccountsToFile,
    getAccounts,
    getAccount,
    getAccountNumbers,
    updateAccount,
    deleteAccount,
} from "../files";

const testFilePath = path.join(__dirname, "accounts.test.dat");
const initialData = "Account1,here,12345678,current,0,1111\n";

beforeEach(() => {
    // Delete the file if it exists
    if (fs.existsSync(testFilePath)) {
        fs.unlinkSync(testFilePath);
    }
    // Create the file with initial data
    fs.writeFileSync(testFilePath, initialData);
});

test("readFile", async () => {
    const file = await readFile(testFilePath);
    expect(file).toBe(initialData);
});

test("saveAccountToFile", async () => {
    const account = {
        name: "Account2",
        address: "there",
        accountNumber: 87654321,
        accountType: "savings",
        balance: 1000,
        pin: 2222,
    };
    await saveAccountToFile(testFilePath, account);

    const file = await readFile(testFilePath);
    expect(file).toBe(
        initialData + "Account2,there,87654321,savings,1000,2222" + "\n"
    );

    const account2 = {
        name: "Account3",
        address: "everywhere",
        accountNumber: 12344321,
        accountType: "current",
        balance: 2000,
        pin: 3333,
    };

    await saveAccountToFile(testFilePath, account2);
    const file2 = await readFile(testFilePath);
    console.log(file2);
    expect(file2).toBe(
        initialData +
            "Account2,there,87654321,savings,1000,2222" +
            "\n" +
            "Account3,everywhere,12344321,current,2000,3333" +
            "\n"
    );
});

test("saveAccountsToFile", async () => {
    const accounts = [
        {
            name: "Account2",
            address: "there",
            accountNumber: 87654321,
            accountType: "savings",
            balance: 1000,
            pin: 2222,
        },
        {
            name: "Account3",
            address: "everywhere",
            accountNumber: 12344321,
            accountType: "current",
            balance: 2000,
            pin: 3333,
        },
    ];
    await saveAccountsToFile(testFilePath, accounts);

    const file = await readFile(testFilePath);
    expect(file).toBe(
        "Account2,there,87654321,savings,1000,2222\n" +
            "Account3,everywhere,12344321,current,2000,3333"
    );
});

test("getAccounts", async () => {
    const accounts = await getAccounts(testFilePath);
    expect(accounts.length).toBe(1);
    expect(accounts[0].name).toBe("Account1");
});

test("getAccount", async () => {
    const account = await getAccount(testFilePath, 12345678);
    expect(account?.name).toBe("Account1");
});

test("getAccountNumbers", async () => {
    const accountNumbers = await getAccountNumbers(testFilePath);
    expect(accountNumbers.length).toBe(1);
    expect(accountNumbers[0]).toBe(12345678);
});

test("updateAccount", async () => {
    const account = await getAccount(testFilePath, 12345678);

    if (account) {
        account.balance += 1000;
        await updateAccount(testFilePath, account);
    }

    const updatedAccount = await getAccount(testFilePath, 12345678);
    expect(updatedAccount?.balance).toBe(1000);
});

test("deleteAccount", async () => {
    await deleteAccount(testFilePath, 12345678);

    expect(fs.existsSync(testFilePath)).toBe(false);
});
