import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import Button from 'react-bootstrap/Button'

import './CompanyDetails.css';



export class CompanyDetails extends React.Component {

  constructor(props) {
    super(props);

    
    this.state = {
      startDate: null,
      endDate: null,
      lastMonthIncome: 0,
      averageLabel: 'Average total income : ',
      monthLabel: 'Last month income : '
    };
      this.getLastMonthIncome = this.getLastMonthIncome.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
      this.handleLabelChange = this.handleLabelChange.bind(this);
  }


  
  handleDateChange = (dateProperty, date) => {
    console.log(dateProperty)
    

    this.setState({
      [dateProperty]: date
    }, function (){
      this.setState({
        lastMonthIncome: this.getLastMonthIncome(this.props.company, this.state.startDate, this.state.endDate),
        averageLabel: 'Average income in date range  : ',
        monthLabel: 'total income in date range : '
      })
      
    }
    )

  };


  changeTableData() {

  }

 

  getLastMonthIncome(company, firstDay, lastDay){

    console.log(company);
    console.log('licze pomiedzy ' + firstDay + ' a ' + lastDay)
    var resultProductData = company.incomes.filter(function(product) {
      var date = new Date(product.date);
     
      return date >=  firstDay && date <= lastDay
    });

    let totalLastMonthIncome = resultProductData
      .reduce((total, income) => {
        return total + parseFloat(income.value);
      }, 0)
      .toFixed(2);

      

      return totalLastMonthIncome;
      

  }


  componentDidMount() {
    var date = new Date(), y = date.getFullYear() -1, m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0, 23,59,59);
    
    let  lastMonthIncome = this.getLastMonthIncome(this.props.company, firstDay, lastDay)

    this.setState(state => {
      state.startDate = firstDay;
      state.endDate = lastDay;
      state.lastMonthIncome = lastMonthIncome;

      
      return state;
    });

   

  }


  

  getAverageTotalIncome(company){



     return (company.totalIncome / company.incomes.length).toFixed(2);


  }



  handleLabelChange(e){
    this.setState({
      averageLabel: 'Average income in date range  : ',
      monthLabel: 'total income in date range : '
    })
  }


  
  render(){
   
    
    const ExampleCustomInput = ({ value, onClick }) => (
<Button onClick = {onClick} variant="primary" size="lg">
        {value}
      </Button>
    );
    


  return (
    <div className="company-details">
      <div className="date-pickers">
        <div className="date-picker">
          <DatePicker
            selected={this.state.startDate ? this.state.startDate : null}
            onChange={value => {
              this.handleDateChange("startDate", value);
            }}
            customInput={<ExampleCustomInput />}
            style={{ margin: `20px 20px 20px 20px` }}
          />
        </div>

        <div className="date-picker">
          <DatePicker
            className="date-picker"
            selected={this.state.endDate ? this.state.endDate : null}
            onChange={value => {
              if (value > this.state.startDate) {
                this.handleDateChange("endDate", value);
              } else {
                alert(
                  `Please chose later date than : ${this.state.startDate
                    .toString()
                    .slice(3, 15)}`
                );
              }
            }}
            customInput={<ExampleCustomInput />}
          />
        </div>
      </div>

      
      <div className="company-incomes">
        <label>
          {this.state.averageLabel}
          <input
            onInput={this.handleLabelChange}
            id="average-total-income"
            type="number"
            value={this.getAverageTotalIncome(this.props.company)}
            placeholder="0,00"
            readOnly
          ></input>
        </label>

        <label>
          {this.state.monthLabel}
          <input
            onInput={this.handleLabelChange}
            id="last-month-income"
            type="number"
            value={this.state.lastMonthIncome}
            placeholder="0,00"
            readOnly
          ></input>
        </label>
      </div>
    </div>
  );
  }
}





export default CompanyDetails;
