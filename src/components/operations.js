import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import '../App.css'

class Operations extends Component {
    constructor() {
        super();
        this.state = {
            amount: '',
            vendor: '',
            category: ''
        }
    }
    update = (event) => {
        this.setState({
            [event.target.name]: event.target.name === 'amount' ? +event.target.value : event.target.value
        })
    }
    addDepositTransaction = () => {
        this.props.addTransaction(this.state)
    }
    addWithdrawTransaction = () => {
        const t = { ...this.state }
        t.amount *= -1
        this.props.addTransaction(t)
    }
    render() {
        return (
            <div className='operations-container'>
                <h1 style={{ color: 'dimgray' }}>Add New Transaction</h1>
                <br></br>
                <input type='text' name='amount' placeholder='amount' value={this.state.amount} onChange={this.update} />
                <input type='text' name='vendor' placeholder='vendor' value={this.state.vendor} onChange={this.update} />
                <input type='text' name='category' placeholder='category' value={this.state.category} onChange={this.update} />
                <br></br>
                <span>
                    <Button onClick={this.addDepositTransaction} variant="contained" color="primary" href='/'>Deposit</Button>
                    <Button onClick={this.addWithdrawTransaction} variant="contained" color="secondary" href='/'>Withdraw</Button>
                </span>

            </div>
        )
    }
}

export default Operations;