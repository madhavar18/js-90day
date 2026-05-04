import { useState, useEffect } from "react";
import './App.css';

// Simulated API - pretends to be a server call (500ms delay)
// on Day 17, this becomes a real fetch() to your Express backend
function fetchAccountsFromAPI() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'SAV001', owner: 'Ravi', balance: 10000, type: 'savings'},
        { id: 'CHK001', owner: 'Priya',  balance: 5000,  type: 'checking' },
        { id: 'SAV002', owner: 'Amit',   balance: 8000,  type: 'savings'  },
      ]);
    }, 800) // simulate network delay
  });
}

// WHY a seperate component:
// BankAccount is a resuable piece of UI with its own structure.
// If we need 10 accounts on screen, we render <BankAccount /> 10 times.
// This is the same reason I made BankAccount a class in java -
// encapsulation of data and behaviour that belongs together.

// -- BankAccount component ----
function BankAccount({ account, onDeposit, onWithdraw }) {
  // destructuring props - same pattern from day 7
  const { id, owner, balance, type } = account;

  // Local state - only this card needs to know about its input amount
  // WHY local: the deposit amout for this catd doesn't affect other cards
  const [inputAmount, setInputAmount] = useState('');
  const [error, setError] = useState('');

  function handleDeposit() {
    const amount = parseFloat(inputAmount);
    if(isNaN(amount) || amount <= 0) {
      setError('Enter a valid positive amout');
      return;
    }
    setError('');
    onDeposit(id, amount);
    setInputAmount('');
  }

  function handleWithdraw() {
    const amount = parseFloat(inputAmount);
    if(isNaN(amount) || amount <= 0) {
      setError('Enter a valid positive amout');
      return;
    }
    setError('');
    const success = onWithdraw(id, amount);
    if(success) setInputAmount('');
  }

  return (
    <div className="account-card">
      <div className="account-header">
        <span className="account-type">{type.toUpperCase()}</span>
        <span className="account-id">{id}</span>
      </div>
      <h2 className="owner-name">{owner}</h2>
      <p className="balance">Rs. {balance.toLocaleString('en-IN')}</p>
      <div className="input-row">
        <input
          type="numner"
          placeholder="Amount"
          value={inputAmount}
          onChange={e => {
            setInputAmount(e.target.value);
            setError('');
          }}
          min="0"
        />
      </div>
      {error && <p className="error">{error}</p>}
      <div className="action-row">
          <button onClick={handleDeposit}>Deposit</button>
          <button onClick={handleWithdraw}>Withdraw</button>
      </div>
    </div>
  );
}

// -- Loading Spinner component ----
function LoadingSpinner() {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading Accounts...</p>
    </div>
  );
}

// -- TranstionLog component ----
function TransactionLog({ transactions }) {
  if(transactions.length === 0) return null;
    return (
      <div className="transaction-log">
        <h3>Transaction Log</h3>
        <ul>
          {transactions.map((tx, index) => (
            <li key={index} className={tx.type}>
              [{tx.accountId}] {tx.type}: Rs.{tx.amount.toLocaleString('en-IN')}
              <span className="tx-balance"> -&gt; Rs.{tx.newBalance.toLocaleString('en-IN')}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }


// WHY the accounts live in App and not in BankAccount: 
// Multiple BankAccount components need to be listed together.
// The total balance needs all accounts' data simultaneoulsy
// Data that is shared or needs to be seen by multiple components
// lives in the closes common ancestor - App in this case.
// This is "lifting state up" - A day 24 concept.

// -- App (root component) ----
function App() {
  const MIN_BAL = 500; // mirrors your java constant

  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [transactions, setTransactions] = useState([]);

  // useEffect: fetch accounts once on mount
  // WHY empty deps []: we only want this to run once when the
  // component first appears — not on every re-render.
  // This is the equivalent of componentDidMount in class components.

  useEffect(() => {
    setLoading(true);
    setError('');


    fetchAccountsFromAPI()
      .then(data => {
        setAccounts(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load accounts. Please try again.');
        setLoading(false);
      });
  }, []);

  // useEffect: update document title whenever total changes
  // WHY: demonstrates a non-API side effect — reaching outside React
  // to modify something in the real DOM (the browser tab title)
  useEffect(() => {
    const total = accounts.reduce((sum, a) => sum + a.balance, 0);
    document.title = `Bank - Rs. ${total.toLocaleString('en-In')} total`;

    // Cleanup: reset title when component unmounts
    return () => { document.title = 'ABC Bank'; }
  }, [accounts]); // re-run whenever accounts changes

  function handleDeposit(accountId, amount) {
    // WHY map instead of mutation:
    // NEVER do: accounts.find(a => a.id === accountId).balance += amount
    // That mutates the existing object - React won't detect the change
    // because the object reference is the same. No re-render.
    // Instead: create a NEW array with a NEW account object.
    // same immuability principle from Day 7's spread operator.
    setAccounts(prev => prev.map(account => {
      if(account.id !== accountId) return account; // unchanged
      const newBalance = account.balance + amount;
      // Log the tranasaction 
      setTransactions(txns => [{
        accountId,
        type: 'deposit',
        amount,
        newBalance
      }, ...txns]); // prepend - newest first
      return {...account, balance: newBalance};
    }));
  }

  function handleWithdraw(accountId, amount) {
    let success = false;
    setAccounts(prev => prev.map(account => {
      if(account.id !== accountId) return account;
      if(account.balance - amount < MIN_BAL) {
        setError(`Cannot withdraw Rs.${amount} - would fall below minimum Rs.${MIN_BAL}`);
        return account;
      }
      const newBalance = account.balance - amount;
      setTransactions(txns => [{
        accountId, 
        type: 'withdraw',
        amount,
        newBalance
      }, ...txns]);
      success = true;
      return {...account, balance: newBalance};
    }));
    return success;
  }

  // Total balance - derived from state, not stored seperately
  // WHY: if total were stored as a seperate state, it could go out of sync
  // with accounts. Derive it fresh every render - alsways correct.
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  // Conditional rendereing based on state
  if (loading) return <LoadingSpinner />;

  return(
    <div className="app">
      <header className="app-header">
        <h1>ABC Bank</h1>
        <p className="total">
          Total Funds: Rs. {totalBalance.toLocaleString('en-IN')}
        </p>
        <p className="account-count">{accounts.length} accounts</p>
      </header>

      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

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

      <TransactionLog transactions={transactions} />
    </div>
  );
}

export default App;