import React, { Component } from "react";
const axios = require('axios');

class Title extends Component {
  render()  {
    const title = "Expense Management";

    return (<h1>{title}</h1>);
  }
}

// class AddTransaction extends Component {

//   constructor(props) {
//     super(props);
//     this.showForm = this.showForm.bind(this);
//     this.handleTransactionAmount = this.handleTransactionAmount.bind(this);
//     this.handleTransactionDescription = this.handleTransactionDescription.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.state = {
//       showForm: false,
//       transactionAmount: '',
//       transactionDescription: ''
//     };
//   }

  // showForm() {
  //   this.setState( (state) => ({
  //     showForm: !state.showForm
  //   }));
  // }

  // handleTransactionAmount(event) {
  //   this.setState({
  //     transactionAmount: event.target.value
  //   });
  // }

  // handleTransactionDescription(event) {
  //   this.setState({
  //     transactionDescription: event.target.value
  //   });
  // }

  // handleSubmit(e) {
  //   e.preventDefault();
    
  //   this.props.callBackFromParent(this.state.transactionAmount, this.state.transactionDescription);

    /**
     * AJAX call to create new transaction
     */
  //   axios({
  //     method: 'post',
  //     url: 'http://localhost:8000/api/v1/transaction',
  //     data: {
  //       amount: this.state.transactionAmount,
  //       description: this.state.transactionDescription
  //     },
  //     headers: {}
  //   })
  //   .then( (response) => {
  //       Statement.addNewTransaction(response);
  //   });
//    }

//   render() {
//     return (
//       <div>
//         <input type="button" value="Add New Transaction" onClick={this.showForm}/> <br/>
//         <form style={{display: this.state.showForm ? 'inline-block' : 'none'}} onSubmit={this.handleSubmit}>
//           <span> Transaction Amount </span><input type="text" onChange={this.handleTransactionAmount}/><br/>
//           <span> Transaction Description </span><input type="text" onChange={this.handleTransactionDescription}/><br/>
//           <input type="submit"/><br/>
//         </form>
//       </div>
//     );
//   }
// }

class Statement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      transactionItem: <tr><td></td><td></td><td></td></tr>,
      token: false,
      showForm: false,
      transactionAmount: '',
      transactionDescription: '',
      transactionTimestamp: ''
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
     * AJAX call to create a new transaction
     */
    axios({
      method: 'post',
      url: 'http://localhost:8000/api/v1/transaction',
      data: {
        amount: this.state.transactionAmount,
        description: this.state.transactionDescription
      },
      headers: {
        'Authorization': 'Bearer ' + this.state.token
      }
    })
      .then( (response) => {
        // this.setState({
        //   transactionAmount: response.data.amount,
        //   transactionDescription: response.data.description,
        //   transactionTimestamp: response.data.timestamp
        // });
        const tmp = (
          <tr key={"transactionNew"}><td>{response.data.data.timestamp}</td><td>{response.data.data.amount}</td><td>{response.data.data.description}</td></tr>
        )
        this.setState( (state, props) => ({
          transactionItem: state.transactionItem 
          //transactions: state.transactions.push(response.data);
          // transactionItem: state.transactions.map((t, index) => (
          //   <tr key={"transaction."+index}><td>{t.timestamp}</td><td>{t.amount}</td><td>{t.description}</td></tr>
          //   ));
        }));
          // .then( () => {
          //   this.setState( (state, props) => {
          //     transactionItem: state.transactions.map((t, index) => (
          //        <tr key={"transaction."+index}><td>{t.timestamp}</td><td>{t.amount}</td><td>{t.description}</td></tr>
          //        ));
          //   });
          // });
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
      })
      .catch( (error) => {
          console.log(error);
      })
      .then( () => {
        // Get all transactions AJAX request
        axios({
          method: 'get',
          url: 'http://localhost:8000/api/v1/transaction',
          headers: {
            'Authorization': 'Bearer ' + this.state.token
          }
        })
        .then( (response) => {
          console.log(response);
          this.setState({
            // transactions: response.data.data,
            transactionItem: response.data.data.map((t, index) => (
              <tr key={"transaction."+index}><td>{t.timestamp}</td><td>{t.amount}</td><td>{t.description}</td></tr>
              ))
          })
          // .then( () => {
          //   this.setState( (state, props) => {
          //     transactionItem: state.transactions.map((t, index) => (
          //        <tr key={"transaction."+index}><td>{t.timestamp}</td><td>{t.amount}</td><td>{t.description}</td></tr>
          //        ));
          //   });
          // });
        })
        .catch( (error) => {
          console.log(error);
        });
      });
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
    //const transactions = []; // I think we need to use state
    const transactionItem = this.state.transactions.map((t, index) => (
    <tr key={"transaction."+index}><td>{t.timestamp}</td><td>{t.amount}</td><td>{t.description}</td></tr>
    ));
    // this.setState( (state, props) => {
    //   transactionItem: state.transactions.map((t, index) => (
    //      <tr key={"transaction."+index}><td>{t.timestamp}</td><td>{t.amount}</td><td>{t.description}</td></tr>
    //      ));
    // });

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
      </form>
      </div>

      <table style={tableStyle}>

        <thead><tr>{thead}</tr></thead>
        <tbody>
          {this.state.transactionItem}
        </tbody>

      </table>
      </div>
    );

    return content;
  }
}


class Expense extends Component {

  // constructor() {
  //   this.state = {
  //     amount: '',
  //     description: ''
  //   }

  //   this.addNewTransaction = this.addNewTransaction.bind(this);
  // }

  // addNewTransaction(newAmount, newTransaction) {
  //   this.setState({
  //     amount: newAmount,
  //     description: newTransaction
  //   });
  // }

  render() {
    // return (
    //   <div>
    //     <div> <Title /> </div>
    //     <div> <AddTransaction callBackFromParent={this.addNewTransaction}/> </div>
    //     <div> <Statement newAmount={this.state.amount} newDescription={this.state.description}/> </div>
    //   </div>
    // );
    
    return (
      <div> 
        <div> <Title /> </div>
        <div> <Statement /> </div>
      </div>
    );
  }
}

export default Expense;
