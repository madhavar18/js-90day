console.log("Callback");

// simulating bank operations with delays
function getAccount(accountId, callback) {
    console.log(`fetching account ${accountId}...`);
    setTimeout(() => {
        if(accountId === "INVALID") {
            callback(new Error("Account not found"), null);
            return;
        }
        callback(null, {id: accountId, owner: "ravi", balance: 10000});
    }, 500);
}

function getTransactions(accountId, callback) {
    setTimeout(() => {
        callback(null, [
            {type: "deposit", amount: 5000},
            {type: "withdrawal", amount: 2000}
        ]);
    }, 300);
}

// callback hell demo
getAccount("ACC001", (err, account) => {
    if(err) {
        console.log("Effor: ", err.message); 
        return;
    }
    console.log("Account: ", account.owner);

    getTransactions(account.id, (err, transactions) => {
        if(err) {
            console.log("Error: ", err.message); 
            return;
        }
        console.log("Transactions: ", transactions.length);
    });
});

//error case
getAccount("INVALID", (err, account) => {
    if(err) {
        console.log("Handled error: ", err.message);
    }
});