import React, { Component } from "react";
const axios = require('axios');

class Title extends Component {
  render()  {
    const title = "Expense Management";

    return (<h1>{title}</h1>);
  }
}

class Statement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      token: false,
      showForm: false,
      transactionAmount: '',
      transactionDescription: '',
      transactionTimestamp: '',
      error: ''
    }
    this.addNewTransaction = this.addNewTransaction.bind(this);
    this.showForm = this.showForm.bind(this);
    this.handleTransactionAmount = this.handleTransactionAmount.bind(this);
    this.handleTransactionDescription = this.handleTransactionDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showForm() {
    this.setState( (state) => ({
      showForm: !state.showForm
    }));
  }

  handleTransactionAmount(event) {
    this.setState({
      transactionAmount: event.target.value
    });
  }

  handleTransactionDescription(event) {
    this.setState({
      transactionDescription: event.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    
    /**
     * Validate user input
     */
    if(isNaN(this.state.transactionAmount)) {

      this.setState({
        error: 'Amount must be numbers'
      });
      this.forceUpdate();
      return;

    } else if (this.state.transactionAmount === '' || this.state.transactionDescription === '') {

      this.setState({
        error: 'All fileds are required'
      });
      this.forceUpdate();
      return;

    } else {

      this.setState({
        error: ''
      });
      this.forceUpdate();
      
    }

    /**
     * AJAX call to create a new transaction
     */
    axios({

      method: 'post',
      url: 'http://localhost:8000/api/v1/transaction',
      data: {
        amount: parseFloat(this.state.transactionAmount),
        description: this.state.transactionDescription
      },
      headers: {
        'Authorization': 'Bearer ' + this.state.token
      }

    })
      .then( (response) => {

        this.setState( prevState => ({
          transactions: [...prevState.transactions, response.data.data]
        }));

          this.forceUpdate();

      });
  }

  addNewTransaction(amount, description) {

    console.log(amount);
  }

  /**
   * AJAX Axio
   */
  componentDidMount() {
    //const token = this.state.token;

    // Login AJAX request
    axios({
      method: 'post',
      url: 'http://localhost:8000/api/v1/auth/login',
      data: {
        email: 'test@email.com',
        password: 'defaultpass'
      }
    })
      .then( (response) => {
        this.setState({
          token: response.data.token
        });
        console.log(response.data.token);

        // after login, get transactions from server
        axios({
          method: 'get',
          url: 'http://localhost:8000/api/v1/transaction',
          headers: {
            'Authorization': 'Bearer ' + response.data.token
          }
        })
        .then( (response) => {
          console.log(response);
          this.setState({
            transactions: response.data.data
          })
        })
        .catch( (error) => {
          console.log(error);
        });
      })
      .catch( (error) => {
          console.log(error);
      })
  }

  render() {
    /**
     * Styles
     */
    const thStyle = {
      fontSize: "20pt",
      color: "green"
    }

    const tableStyle = {
      borderCollapse: "collapse" ,
      width: "100%",
      padding: "10pt",
    }

    /**
     * Data
     */
    const heads = ["Transaction Date", "Amount", "Description"];
    const thead = heads.map((head, index) => (<th style={thStyle} key={"th."+index}> {head} </th>));
    console.log(this.state.transactions);
    const transactionItem = this.state.transactions.map((t, index) => (
    <tr key={"transaction."+index}><td>{t.timestamp}</td><td>{t.amount}</td><td>{t.description}</td></tr>
    ));

    /**
     * Table
     */
    const content = (
      <div>
      <div>
      <input type="button" value="Add New Transaction" onClick={this.showForm}/> <br/>
      <form style={{display: this.state.showForm ? 'inline-block' : 'none'}} onSubmit={this.handleSubmit}>
        <span> Transaction Amount </span><input type="text" onChange={this.handleTransactionAmount}/><br/>
        <span> Transaction Description </span><input type="text" onChange={this.handleTransactionDescription}/><br/>
        <input type="submit"/><br/>
        <div id="error" style={{color: 'red'}}> {this.state.error} </div>
      </form>
      </div>

      <table style={tableStyle}>

        <thead><tr>{thead}</tr></thead>
        <tbody>
          {transactionItem}
        </tbody>

      </table>
      </div>
    );

    return content;
  }
}


class Expense extends Component {

  render() {
    
    return (
      <div> 
        <div> <Title /> </div>
        <div> <Statement /> </div>
      </div>
    );
  }

}

export default Expense;
