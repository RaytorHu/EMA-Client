import React, { Component } from "react";

class Title extends Component {
  render()  {
    const title = "Expense Management";

    return (<h1>{title}</h1>);
  }
}

class AddTransaction extends Component {

  constructor(props) {
    super(props);
    this.showForm = this.showForm.bind(this);
    this.state = {
      showForm: false
    };

  }

  showForm() {
    this.setState( (state) => ({
      showForm: !state.showForm
    }));
  }

  render() {
    return (
      <div>
        <input type="button" value="Add New Transaction" onClick={this.showForm}/> <br/>
        <form style={{display: this.state.showForm ? 'inline-block' : 'none'}}>
          <span> Transaction Amount </span><input type="text"/><br/>
          <span> Transaction Description </span><input type="text"/><br/>
          <input type="submit"/><br/>
        </form>
      </div>
    );
  }
}

class Statement extends Component {

  constructor(props) {
    super(props);
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
    const transactions = [];


    /**
     * Table
     */
    const content = (
      <table style={tableStyle}>

        <thead><tr>{thead}</tr></thead>
        <tbody></tbody>

      </table>
    );

    return content;
  }
}

class Expense extends Component {
  render() {
    return (
      <div>
        <div> <Title /> </div>
        <div> <AddTransaction/> </div>
        <div> <Statement /> </div>
      </div>
    );
  }
}

export default Expense;
