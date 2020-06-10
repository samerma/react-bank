import React, { Component } from 'react';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import '../App.css'

class Transaction extends Component {
    deleteTransaction = () => {
        const id = this.props.transaction._id
        this.props.deleteTransaction(id)
    }
    render() {
        const transaction = this.props.transaction
        return (
            <div className='transaction-container'>
                <span style={{ color: transaction.amount > 0 ? 'green' : 'red' }}>{transaction.amount}</span>
                <span>{transaction.vendor}</span>
                <span>{transaction.category}</span>
                <span className='pointer'><DeleteForeverOutlinedIcon onClick={this.deleteTransaction} style={{ color: 'red' }}>x</DeleteForeverOutlinedIcon></span>
            </div>
        )
    }
}

export default Transaction;