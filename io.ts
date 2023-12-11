import * as readline from "readline";

export const getStringInput = (prompt: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question(prompt, (input) => {
            resolve(input);
            rl.close();
        });
    });
};

export const getIntegerInput = (prompt: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question(prompt, (input) => {
            const parsedInput = parseInt(input, 10);

            if (isNaN(parsedInput)) {
                reject(new Error("Input is not a valid integer."));
            } else {
                resolve(parsedInput);
            }

            rl.close();
        });
    });
};
