import React, { Component } from 'react';
import Transaction from './transaction'
class Transactions extends Component {
    render() {
        const transactions = this.props.transactions
        return (
            <div className='transactions-container'>
                {transactions.map(t => {
                    return (
                        <Transaction
                            key={t._id}
                            deleteTransaction={this.props.deleteTransaction}
                            transaction={t}
                        />
                    )
                })}
            </div>
        )
    }
}
export default Transactions;