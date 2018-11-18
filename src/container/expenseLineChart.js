import React, { Component } from "react";
import TransactionLineChart from "../component/transactionLineChart";

class Title extends Component {
  render()  {
    const title = "Expense Line Chart";

    return (<h1 style={{color: '#203954'}}>{title}</h1>);
  }
}

class Expense extends Component {

  render() {
    
    return (
      <div> 
        <div> <Title /> </div>
        <TransactionLineChart> </TransactionLineChart>
      </div>
    );
  }

}

export default Expense;
