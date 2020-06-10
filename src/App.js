import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Transactions from './components/transactions'
import Balance from './components/balance';
import Operations from './components/operations';
import Breakdown from './components/breakdown';
import axios from 'axios'
import './index.css'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import PieChartOutlinedIcon from '@material-ui/icons/PieChartOutlined';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  async componentDidMount() {
    const transactions = await axios.get('http://localhost:3001/transactions')
    console.log(transactions.data);
    this.setState({ data: transactions.data })
  }
  addTransaction = async (transaction) => {
    const response = await axios.post('http://localhost:3001/transaction', transaction)
    this.setState({ data: response.data })
  }
  deleteTransaction = async (id) => {
    const response = await axios.delete(`http://localhost:3001/transaction/${id}`)
    this.setState({ data: response.data })
  }
  render() {
    return (
      <Router>
        <div className='app-container'>
          <Route exact path="/" render={() => {
            return (
              <div className='landing'>
                <Balance transactions={this.state.data} />
                <Button variant="contained" color="primary" href='/breakdown'>Breakdown  <PieChartOutlinedIcon /></Button>
                <Transactions transactions={this.state.data} deleteTransaction={this.deleteTransaction} />
                <Button variant="contained" color="primary" href="/operations">New transaction  <AddIcon style={{ color: 'white' }} /></Button>
              </div>
            )
          }} />
          <Route exact path="/breakdown" render={() => <Breakdown transactions={this.state.data} />} />
          <Route exact path="/operations" render={() => <Operations addTransaction={this.addTransaction} />} />
        </div>
      </Router>
    )
  }
}

export default App