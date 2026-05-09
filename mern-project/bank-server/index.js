const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// In-memory bank — same structure as BankRepository in Java
let accounts = [
    { id: 'SAV001', owner: 'Ravi',  balance: 10000, type: 'savings'  },
    { id: 'CHK001', owner: 'Priya', balance: 5000,  type: 'checking' },
    { id: 'SAV002', owner: 'Amit',  balance: 8000,  type: 'savings'  }
];

const MIN_BALANCE = 500;

app.get('/api/accounts', (req, res) => {
    res.json({ success: true, data: accounts });
});

app.post('/api/accounts/:id/deposit', (req, res) => {
    const { amount } = req.body;
    const account = accounts.find(a => a.id === req.params.id);
    if (!account) return res.status(404).json({ error: 'Account not found' });
    if (!amount || amount <= 0) return res.status(400).json({ error: 'Invalid amount' });
    account.balance += amount;
    res.json({ success: true, data: account });
});

app.post('/api/accounts/:id/withdraw', (req, res) => {
    const { amount } = req.body;
    const account = accounts.find(a => a.id === req.params.id);
    if (!account) return res.status(404).json({ error: 'Account not found' });
    if (!amount || amount <= 0) return res.status(400).json({ error: 'Invalid amount' });
    if (account.balance - amount < MIN_BALANCE) {
        return res.status(400).json({
            error: `Cannot withdraw: balance would fall below minimum ₹${MIN_BALANCE}`
        });
    }
    account.balance -= amount;
    res.json({ success: true, data: account });
});

app.listen(5001, () => console.log('Bank server running on http://localhost:5001'));