console.log("=== Promises ===");

function getAccount(accountId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (accountId === "INVALID") {
                reject(new Error("Account not found"));
                return;
            }
            resolve({ id: accountId, owner: "Ravi", balance: 10000 });
        }, 500);
    });
}

function getTransactions(accountId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { type: "deposit", amount: 5000 },
                { type: "withdrawal", amount: 2000 }
            ]);
        }, 300);
    });
}

// Clean chain — no nesting, one error handler for everything
getAccount("ACC001")
    .then(account => {
        console.log("Account:", account.owner);
        return getTransactions(account.id); // return next Promise to chain it
    })
    .then(transactions => {
        console.log("Transactions:", transactions.length);
        const total = transactions.reduce((sum, t) => sum + t.amount, 0);
        console.log("Total transacted:", total);
    })
    .catch(err => console.log("Error:", err.message));

// Running multiple Promises simultaneously
console.log("\n--- Promise.all: parallel execution ---");
Promise.all([
    getAccount("ACC001"),
    getAccount("ACC002")  // both fetched simultaneously, not sequentially
]).then(([acc1, acc2]) => {
    // WHY Promise.all: fetching sequentially would take 500ms + 500ms = 1000ms
    // Promise.all runs them in parallel: total time = max(500ms, 500ms) = 500ms
    console.log("Both accounts loaded simultaneously");
}).catch(err => console.log("One failed:", err.message));