# Basic Banking Application in TypeScript

## About

I was once inspired by a group of computer science students who were working on a bank functionality like this. They were writing it in C, and it seems to be a good way for them to learn more about their programming language. I decided to implement the functionality myself for fun. Also, as I am already experienced with databases, and wanted to work with files more, so I handled data with a very basic csv format .dat file. I wrote the csv parser from scratch for this use case and didn't use a heavier library like csv-parse. I also wrote tests for this so that I could develop the parser first, and check the behaviour.

I plan to complete this project also in: Golang, Rust, C.

## How to run

First, compile the project with `tsc index.ts`.

Then, run the project with `node index.js`

There is a test suite for the csv parser file, to run the test run `npm test`

## component functionality

I quickly wrote notes for what I believed the project would require, and I didn't need to deviate from this, so the project scope is as follows:

```
csv
AddAccount
GetAccount
GetAccountNumbers
UpdateBalance
DeleteAccount

bank
createAccount
getAccountDetails
DepositFunds
WithdrawFunds
TransferFunds
DeleteAccount

io
getInputString
getInputInteger
getInputOptions

main
createAccount
getAccountDetails
DepositFunds
WithdrawFunds
TransferFunds
DeleteAccount
```

I did not take inspiration from any other project for the implementation, all code is original.
