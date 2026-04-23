// ── SECTION 1: Arrow functions and 'this' ──────────────────────────

console.log("=== Arrow functions and this ===");

function BankTimer() {
    this.elapsed = 0;
    this.accountId = 'ACC001';
}

// Broken with regular function
BankTimer.prototype.startBroken = function() {
    setInterval(function() { this.elapsed++; console.log(this.elapsed); }, 1000);
    // 'this' inside the callback is NOT the BankTimer object
};

// Fixed with arrow function
BankTimer.prototype.startFixed = function() {
    let count = 0;
    const interval = setInterval(() => {
        count++;
        this.elapsed++;
        console.log(`[${this.accountId}] Elapsed: ${this.elapsed}s`);
        if (count >= 3) clearInterval(interval);
    }, 100); // using 100ms so tests run fast
};

const timer = new BankTimer();
timer.startFixed();

// Implicit return shorthand
const double = x => x * 2;
const add = (a, b) => a + b;
const makeAccount = id => ({ id, balance: 0 }); // object needs wrapping parens
console.log(double(5));
console.log(add(3, 4));
console.log(makeAccount('ACC999'));

// ── SECTION 2: Destructuring ───────────────────────────────────────

console.log("\n=== Destructuring ===");

const account = { id: 'ACC001', owner: 'Ravi', balance: 10000, type: 'savings' };

// Object destructuring
const { id, owner, balance } = account;
console.log(id, owner, balance);

// Rename on extract
const { owner: accountHolder, balance: currentBalance } = account;
console.log(accountHolder, currentBalance);

// Default values
const { limit = 3, currency = 'INR' } = account;
console.log(`Limit: ${limit}, Currency: ${currency}`);

// Nested destructuring
const transaction = {
    amount: 5000,
    account: { id: 'ACC001', owner: 'Ravi' },
    meta: { timestamp: '2024-01-15' }
};
const { amount, account: { owner: txOwner }, meta: { timestamp } } = transaction;
console.log(`${txOwner} transacted ${amount} at ${timestamp}`);

// Array destructuring
const txHistory = [5000, -2000, 3000, -500];
const [first, second, ...rest] = txHistory;
console.log(`First: ${first}, Second: ${second}, Rest: ${rest}`);

// Destructured function params — this is how React components work
function printAccountSummary({ id, owner, balance, type = 'unknown' }) {
    console.log(`[${id}] ${owner} | ₹${balance} | ${type}`);
}
printAccountSummary(account);
printAccountSummary({ id: 'ACC002', owner: 'Priya', balance: 8000 });

// ── SECTION 3: Spread and immutability ────────────────────────────

console.log("\n=== Spread and Immutability ===");

const original = { id: 'ACC001', owner: 'Ravi', balance: 10000 };

// Immutable update — create new, leave original untouched
const afterDeposit = { ...original, balance: original.balance + 5000 };
console.log('Original:', original.balance);   // 10000 — untouched
console.log('Updated:', afterDeposit.balance); // 15000 — new object

// Merge with later keys winning
const defaults = { currency: 'INR', limit: 3, active: true };
const userOverrides = { limit: 5, type: 'premium' };
const finalConfig = { ...defaults, ...userOverrides };
console.log(finalConfig);
// limit is 5 — userOverrides wins over defaults

// Array spread — combining without mutation
const deposits = [1000, 2000, 3000];
const withdrawals = [500, 1500];
const allTxns = [...deposits, ...withdrawals];
console.log(allTxns);

// Immutable array update (add item)
const accounts = [
    { id: 'ACC001', balance: 10000 },
    { id: 'ACC002', balance: 5000 }
];
const withNew = [...accounts, { id: 'ACC003', balance: 8000 }];
console.log('Original length:', accounts.length);  // 2
console.log('New length:', withNew.length);         // 3

// ── SECTION 4: map, filter, reduce ────────────────────────────────

console.log("\n=== map / filter / reduce ===");

const bankAccounts = [
    { id: 'ACC001', owner: 'Ravi',   balance: 10000, type: 'savings'  },
    { id: 'ACC002', owner: 'Priya',  balance: 5000,  type: 'checking' },
    { id: 'ACC003', owner: 'Amit',   balance: 15000, type: 'savings'  },
    { id: 'ACC004', owner: 'Sneha',  balance: 3000,  type: 'checking' },
    { id: 'ACC005', owner: 'Vikram', balance: 20000, type: 'savings'  }
];

// map: transform every element
const labels = bankAccounts.map(a => `${a.owner}: ₹${a.balance}`);
console.log('Labels:', labels);

// map: apply 4% interest to savings, immutably
const withInterest = bankAccounts.map(a =>
    a.type === 'savings'
        ? { ...a, balance: Math.round(a.balance * 1.04) }
        : a
);
console.log('After interest (savings only):',
    withInterest.map(a => `${a.owner}:${a.balance}`));

// filter: keep matching elements
const savingsAccounts = bankAccounts.filter(a => a.type === 'savings');
console.log('Savings count:', savingsAccounts.length); // 3

const highValue = bankAccounts.filter(a => a.balance >= 10000);
console.log('High value accounts:', highValue.map(a => a.owner));

// filter: immutable delete
const withoutPriya = bankAccounts.filter(a => a.id !== 'ACC002');
console.log('After removing Priya:', withoutPriya.length); // 4

// reduce: fold to single value
const totalFunds = bankAccounts.reduce((sum, a) => sum + a.balance, 0);
console.log('Total funds:', totalFunds); // 53000

// reduce: group by type
const grouped = bankAccounts.reduce((groups, a) => {
    if (!groups[a.type]) groups[a.type] = [];
    groups[a.type].push(a.owner);
    return groups;
}, {});
console.log('Grouped:', grouped);

// THE CHAIN — compose all three
const totalHighValueSavings = bankAccounts
    .filter(a => a.type === 'savings')
    .filter(a => a.balance >= 10000)
    .map(a => a.balance)
    .reduce((sum, b) => sum + b, 0);
console.log('Total high-value savings:', totalHighValueSavings); // 45000