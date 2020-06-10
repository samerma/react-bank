import React, { Component } from 'react';
import '../App.css'

class Balance extends Component {
    render() {
        const amounts = this.props.transactions.map(t => t.amount)
        const balance = amounts.length ? amounts.reduce((a, b) => a + b) : 0
        return (
            <div className='balance-container'>
                <p>Balance: <span style={{ color: balance > 500 ? 'green' : 'red' }}>${balance}</span></p>
            </div>
        )
    }
}

export default Balance;