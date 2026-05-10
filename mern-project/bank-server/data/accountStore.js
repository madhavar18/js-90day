// data/accountStore.js
// The single source of truth for account data.
// Day 18: replace this entire file with MongoDB/Mongoose calls.
// Nothing outside this file changes when that happens.

const { get } = require("../routes/accountRoutes");

const MIN_BALANCE = 500;
const CURRENCY = 'INR';

let accounts = [
    { id: 'SAV001', owner: 'Ravi',  balance: 10000, type: 'savings'  },
    { id: 'CHK001', owner: 'Priya', balance: 5000,  type: 'checking' },
    { id: 'SAV002', owner: 'Amit',  balance: 8000,  type: 'savings'  }
];

function getAll() {
    return [...accounts]; // return a copy - external code can't mutate the array
}

function findById(id) {
    return accounts.find(a => a.id === id) || null;
}

function deposit(id, amount) {
    const account = accounts.find(a => a.id === id);
    if(!account) return null;
    account.balance += amount;
    return {...account}; // return a copy of the updated account 
}

function withdraw(id, amount) {
    const account = accounts.find(a => a.id === id);
    if(!account) return null;
    if(account.balance - amount < MIN_BALANCE) {
        // Return an error object - controller decides how to respond
        return {
            error: true,
            message: `Cannot withdraw: balance would fall below minimum Rs.${MIN_BALANCE} ${currency}`
        };
    }
    account.balance -= amount;
    return {...account};
}

function getTotalFunds() {
    return accounts.reduce((sum, a) => sum + a.balance, 0);
}

module.exports = { getAll, findById, deposit, withdraw, getTotalFunds, MIN_BALANCE, CURRENCY};