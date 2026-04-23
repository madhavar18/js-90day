console.log("=== async/await ===");

// Reusing the same Promise-based functions from 03-promises.js
function getAccount(accountId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (accountId === "INVALID") reject(new Error("Account not found"));
            else resolve({ id: accountId, owner: "Ravi", balance: 10000 });
        }, 500);
    });
}

function getTransactions(accountId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([{ type: "deposit", amount: 5000 }, { type: "withdrawal", amount: 2000 }]);
        }, 300);
    });
}

// async/await: same Promises, synchronous-looking code
async function loadAccountSummary(accountId) {
    try {
        console.log(`Loading ${accountId}...`);
        const account = await getAccount(accountId);     // pauses HERE, not the whole thread
        const transactions = await getTransactions(account.id); // pauses HERE

        const totalIn = transactions
            .filter(t => t.type === "deposit")
            .reduce((sum, t) => sum + t.amount, 0);

        console.log(`Owner: ${account.owner}`);
        console.log(`Transactions: ${transactions.length}`);
        console.log(`Total deposited: ${totalIn}`);

        return account;
    } catch (error) {
        // try/catch works normally — this is why async/await is preferred
        console.log("Error:", error.message);
    }
}

// Sequential: one after the other (total ~1600ms)
async function sequential() {
    console.log("\n--- Sequential ---");
    await loadAccountSummary("ACC001");
    await loadAccountSummary("ACC002");
}

// Parallel: both simultaneously (total ~800ms)
async function parallel() {
    console.log("\n--- Parallel (Promise.all + await) ---");
    const [acc1, acc2] = await Promise.all([
        loadAccountSummary("ACC001"),
        loadAccountSummary("ACC002")
    ]);
    console.log("Both loaded in parallel");
}

// Error case
async function errorCase() {
    console.log("\n--- Error case ---");
    await loadAccountSummary("INVALID");
}

// Run them
sequential()
    .then(() => parallel())
    .then(() => errorCase());