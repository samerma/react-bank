const express = require('express')
const router = express.Router()
const Transaction = require('../models/transaction.js')

router.get('/transactions', function (req, res) {
    Transaction.find({}, function (error, transactions) {
        res.send(transactions)
    })
})

router.post('/transaction', function (req, res) {
    const transaction = new Transaction({
        amount: req.body.amount,
        vendor: req.body.vendor,
        category: req.body.category
    })
    transaction.save(function (error, t) {
        Transaction.find({}, function (error, transactions) {
            res.send(transactions)
        })
    })
})

router.delete('/transaction/:id', function (req, res) {
    const id = req.params.id
    Transaction.findById({ _id: id }, function (error, transaction) {
        transaction.remove(function () {
            Transaction.find({}, function (error, transactions) {
                res.send(transactions)
            })
        })
    })
})
module.exports = router