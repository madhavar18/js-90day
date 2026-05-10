// routes/accountRoutes.js
// Maps URLs to controller functions.
// No logic here. If a route needs to change what it does,
// change the controller. If a URL needs to change,
// change this file. Different reasons to change = different files.

const express = require('express');
const router = express.Router();
const controller = require('../controllers/accountController');

router.get('/',              controller.getAllAccounts);
router.get('/summary',       controller.getSummary);
router.get('/:id',           controller.getAccountById);
router.post('/:id/deposit',  controller.deposit);
router.post('/:id/withdraw', controller.withdraw);

module.exports = router;