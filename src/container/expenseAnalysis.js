import React, { Component } from "react";
import TransactionWaterwave from "../component/transactionWaterwave";
import TransactionLineChart from "../component/transactionLineChart";
import TransactionSearch from '../component/transactionSearch';
import TransactionMaxMin from '../component/transactionMaxMin';
import { Card } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import storage from '../utils/Storage';
import config from '../config.js';
import moment from 'moment';

const dispoableIncome = 2000;
const titleColor = '#1890ff';

var tempWaterwaveData = {
  gender: 'Your Financial Health',
  path: 'M381.759 0h292l-.64 295.328-100.127-100.096-94.368 94.368C499.808 326.848 512 369.824 512 415.712c0 141.376-114.56 256-256 256-141.376 0-256-114.624-256-256s114.624-256 256-256c48.8 0 94.272 13.92 133.12 37.632l93.376-94.592L381.76 0zM128.032 415.744c0 70.688 57.312 128 128 128s128-57.312 128-128-57.312-128-128-128-128 57.312-128 128z',
  value: 100
}

class Title extends Component {
  render()  {
    const title = "Your Expense Analysis Report";

    return (<h1 style={{color: '#203954'}}>{title}</h1>);
  }
}

class WaterwaveTitle extends Component {
  render() {
    const title = "This is your overall financial well being";

    return (
      <div>
        <h2 style={{color: titleColor}}> {title} </h2>  
      </div>
    );
  }
}

class WaterwaveText extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: props.status
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      status: newProps.status
    });
  }

  render() {

    if(this.state.status === 'bad') {
      return (
        <div style={{fontSize: '16pt', textAlign: 'left', width: '50%', margin: '0 auto' }}>
          Looks like you need to improve your financial status <br/>
          <br/>
          The score is low is because you have spent too much money on this month than the average people.<br/>
          You can check back to your transaction statement and see if there are any transactions that you could have
          avoided. For example, do you really need a cup of coffee everyday? Do you really need to go to cinemas instead
          of renting a DVD and watch it at home with your friends?
          <br/><br/>
          <span style={{fontWeight:'bold'}}>Some tips for saving money:</span><br/>
          Build an emergency fund<br/>
          Establish your budget<br/>
          Start saving for your retirement as early as possible<br/>
          Take full advantage of employer matches to your retirement plan<br/>
          Make a savings plan<br/>
          Save your windfalls and tax refunds<br/>
        </div>
      );
    } else if(this.state.status === 'good') {
      
      return (
        <div>
          Congratulations! You have an excellent financial status! <br/><br/>
          If you want to have even better financial situation, then financial management skill is very important. <br/>
          Review your transaction statement regularly and identify those unnecessary transactions.<br/>
        </div>
      );
    }

    return (
      <div>
        
      </div>
    );
  }
}

class LineChartTitle extends Component {
  render() {
    const title = "This is your spending trend";

    return (
      <div>
        <h2 style={{color: titleColor}}> {title} </h2>  
      </div>
    );
  }
}

class ExpenseAnalysis extends Component {

  constructor(props) {
    super(props);
    this.state = {
      waterwaveData: [tempWaterwaveData],
      waterwaveColor: "green",
      status: 'good',
      lineChartData: [],
      maxTransaction: {},
      minTransaction: {},
      loading: true
    }

    this.onSearch = this.onSearch.bind(this);

    // by default we will search for this month
    this.onSearch(moment().format('YYYY-MM'));
    console.log(moment().format('YYYY-MM'));
  }

  onSearch(value) {

    this.setState({
      loading: true
    });

    this.forceUpdate();

    axios({
        method: 'post',
        url: config.base_url+'/api/v1/transaction/search',
        headers: {
            'Authorization': 'Bearer ' + storage.getAuthToken()
          },
        data: {
            "fragment": value,
            "withMeta": true,
            "order": "ASC"
        }
    }).then( (response) => {

      // generate data for waterwave
      var waterwaveValue = (1 - response.data.meta.totalAmount / dispoableIncome) * 100;
      var waterwaveColor = "green";
      var status = 'good';

      if(waterwaveValue < 30) {
        waterwaveValue = 30;
      }

      if(waterwaveValue < 50) {
        waterwaveColor = "red";
        status = 'bad';
      } else if (waterwaveValue <= 80) {
        waterwaveColor = "orange";
        status = 'good';
      } else {
        waterwaveColor = "green";
        status = 'good';
      }

      tempWaterwaveData.value = waterwaveValue;



      // generate data for line chart



      this.setState({
        waterwaveData: [tempWaterwaveData],
        waterwaveColor: waterwaveColor,
        minTransaction: response.data.meta.minExpense,
        maxTransaction: response.data.meta.maxExpense,
        status: status,
        loading: false
      })

      this.forceUpdate();

    });
  }

  render() {
    
    return (
      <div> 
        
        <Title />
        <TransactionSearch onSearch={this.onSearch}></TransactionSearch>
        <br/> <br/>

        <Card loading={this.state.loading}>
          <WaterwaveTitle></WaterwaveTitle>
          <TransactionWaterwave 
            waterwaveData={this.state.waterwaveData}
            waterwaveColor={this.state.waterwaveColor}
          > </TransactionWaterwave>
          <WaterwaveText status={this.state.status}> </WaterwaveText>
          <br/><br/><br/><br/><br/>

          <TransactionMaxMin 
            maxTransaction={this.state.maxTransaction}
            minTransaction={this.state.minTransaction}
          ></TransactionMaxMin>
          <br/><br/>

          <LineChartTitle></LineChartTitle>
          <TransactionLineChart lineChartData={this.state.lineChartData}></TransactionLineChart>
        </Card>
      </div>
    );
  }

}

export default ExpenseAnalysis;
