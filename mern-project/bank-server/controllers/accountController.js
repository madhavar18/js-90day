// controllers/accountController.js
 // Handles request/response cycle for account operations
 // Calls accountStore for data. Never touches accounts array directly

 const store = require('../data/accountStore');

 exports.getAllAccounts = (req, res) => {
    try {
        const accounts = store.getAll();
        const totalFunds = store.getTotalFunds();

        res.json({
            success: true,
            count: accounts.length,
            totalFunds,
            currency: store.CURRENCY,
            data: accounts
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
 };

 exports.getAccountById = (req, res) => {
    const account = store.findById(req.params.id);
    
    if(!account) {
        return res.status(404).json({
            success: false,
            error: `Account '${req.params.id}' not found`
        });
    }

    res.json({ success: true, data: account });
 };

 exports.deposit = (req, res) => {
    const { amount } = req.body;

    // validate input - never trust client data
    if(amount === undefined || amount === null) {
        return res.status(400).json({ success: false, error: 'Amount is required' });
    }
    if(typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ success: false, error: 'Amount must be a positive number' });
    }

    const result = store.deposit(req.params.id, amount);

    if(!result) {
        return res.status(404).json({
            success: false,
            error: `Account '${req.params.id}' not found`
        });
    }

    res.json({ success: true, data: result });
 };

 exports.withdraw = (req, res) => {
    const { amount } = req.body;
    // validate input - never trust client data
    if(amount === undefined || amount === null) {
        return res.status(400).json({ success: false, error: 'Amount is required' });
    }
    if(typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ success: false, error: 'Amount must be a positive number' });
    }
    
    const result = store.withdraw(req.params.id, amount);

    if(!result) {
        return res.status(404).json({
            success: false,
            error: `Account '${req.params.id}' not found`
        });
    }

    // Store returned an error object - business rule violation
    if(result.error) {
        return res.status(400).json({ success: false, error: result.message });
    }

    res.json({ success: true, data: result });
};

exports.getSummary = (req, res) => {
    const accounts = store.getAll();
    const totalFunds = store.getTotalFunds();

    const summary = {
        totalAccounts: accounts.length,
        totalFunds,
        currency: store.CURRENCY,
        minimumBalance: store.MIN_BALANCE,
        byType: accounts.reduce((acc, a) => {
            acc[a.type] = (acc[a.type] || 0) + 1;
            return acc;
        }, {})
    };

    res.json({ success: true, data: summary });
};