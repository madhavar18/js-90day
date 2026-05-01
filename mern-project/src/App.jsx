import { useState } from "react";
import './App.css';

// WHY a seperate component:
// BankAccount is a resuable piece of UI with its own structure.
// If we need 10 accounts on screen, we render <BankAccount /> 10 times.
// This is the same reason I made BankAccount a class in java -
// encapsulation of data and behaviour that belongs together.
function BankAccount({ account, onDeposit, onWithdraw }) {
  // destructuring props - same patter from day 7
  const { id, owner, balance, type } = account;

  return (
    <div className="account-card">
      <div className="account-header">
        <span className="account-type">{type.toUpperCase()}</span>
        <span className="account-id">{id}</span>
      </div>
      <h2 className="owner-name">{owner}</h2>
      <p className="balance">Rs. {balance.toLocaleString('en-IN')}</p>
      <div className="action-row">
        <button onClick={() => onDeposit(id, 1000)}>
          + Deposit Rs. 1000
        </button>
        <button 
          onClick={() => onWithdraw(id, 1000)} 
          disabled={balance < 1500} // Can't go below MIN_BAL logic
        >
          - Withdraw Rs. 1000
        </button>
      </div>
    </div>
  );
}

// WHY the accounts live in App and not in BankAccount: 
// Multiple BankAccount components need to be listed together.
// The total balance needs all accounts' data simultaneoulsy
// Data that is shared or needs to be seen by multiple components
// lives in the closes common ancestor - App in this case.
// This is "lifting state up" - A day 24 concept.
function App() {
  const MIN_BAL = 500; // mirrors your java constant

  const [accounts, setAccounts] = useState([
    { id: 'SAV001', owner: 'Ravi', balance: 10000, type: 'savings' },
    { id: 'CHK001', owner: 'Priya', balance: 5000, type: 'checking' },
    { id: 'SAV002', owner: 'Amit', balance: 8000, type: 'savings' }
  ]);

  // WHY useState:
  // `accounts` is the state - the source of truth for the UI.
  // `setAccounts` is the only way to change it.
  // When setAccounts is called, React re-runs this component function,
  // creates a new Virtual DOM, diffs it aganist the old one,
  // and updates ONLY the parts of the real DOM that changed.
  // You never touch the DOM. React handles it.

  function handleDeposit(accountId, amount) {
    // WHY map instead of mutation:
    // NEVER do: accounts.find(a => a.id === accountId).balance += amount
    // That mutates the existing object - React won't detect the change
    // because the object reference is the same. No re-render.
    // Instead: create a NEW array with a NEW account object.
    // same immuability principle from Day 7's spread operator.
    setAccounts(accounts.map(account => 
      account.id === accountId
        ? {...account, balance: account.balance + amount} // new object with updated balance
        : account // same object for unchanged accounts

    ));
  }

  function handleWithdraw(accountId, amount) {
    setAccounts(accounts.map(account => {
      if(account.id !== accountId) return account;
      if(account.balance - amount < MIN_BAL) {
        alert(`cannot Withdraw: balance would fall below Rs. ${MIN_BAL}`);
        return account; // return unchanged
      }
      return {...account, balance: account.balance - amount}; 
    }));
  }

  // Total balance - derived from state, not stored seperately
  // WHY: if total were stored as a seperate state, it could go out of sync
  // with accounts. Derive it fresh every render - alsways correct.
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  return(
    <div className="app">
      <header className="app-header">
        <h1>ABC Bank</h1>
        <p className="total">
          Total Funds: Rs. {totalBalance.toLocaleString('en-IN')}
        </p>
      </header>

      <div className="accounts-grid">
        {accounts.map(account => (
          // WHY key prop: 
          // when React diffs a list, it needs to identify which item 
          // is which. without key, it compares by position - 
          // if you add an item at the top, Reach thinks EVERY ITEM changed.
          // with key = {account.id}, React tracks item by identity.
          // Key must be stable and unique. Never use Array index as key 
          // if the lsit can reordered or filtered.
          <BankAccount
            key = {account.id}
            account = {account}
            onDeposit = {handleDeposit}
            onWithdraw={handleWithdraw}
          />
        ))}
      </div>
    </div>
  );
}

export default App;