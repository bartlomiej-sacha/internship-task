import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import CustomInput from "./CustomInput";

import "./CompanyDetails.css";

export class CompanyDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: null,
      endDate: null,
      dataHasChanged: false,
      lastMonthIncome: 0,
      averageLabel: "Average total income : ",
      monthLabel: "Last month income : "
    };
    this.getRangeIncome = this.getRangeIncome.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  handleDateChange = (dateProperty, date) => {
    console.log(dateProperty);

    this.setState(
      {
        [dateProperty]: date
      },
      function() {
        this.setState({
          lastMonthIncome: this.getRangeIncome(
            this.props.company,
            this.state.startDate,
            this.state.endDate
          ),
          averageIncome: this.getRangeAverageIncome(
            this.props.company,
            this.state.startDate,
            this.state.endDate
          ),
          averageLabel: "Average income in date range  : ",
          monthLabel: "total income in date range : "
        });
      }
    );
  };

  getAverageTotalIncome(company) {
    return (company.totalIncome / company.incomes.length).toFixed(2);
  }

  getRangeAverageIncome(company, firstDay, lastDay) {
    var resultProductData = company.incomes.filter(function(product) {
      var date = new Date(product.date);

      return date >= firstDay && date <= lastDay;
    });

    let totalLastMonthIncome = resultProductData
      .reduce((total, income) => {
        return total + parseFloat(income.value);
      }, 0)
      

    if (totalLastMonthIncome != 0) {
      totalLastMonthIncome = totalLastMonthIncome / resultProductData.length;
    }

    console.log("average " + totalLastMonthIncome.toFixed(2));
    return totalLastMonthIncome.toFixed(2);
  }

  getRangeIncome(company, firstDay, lastDay) {
    console.log(company);
    console.log("licze pomiedzy " + firstDay + " a " + lastDay);
    var resultProductData = company.incomes.filter(function(product) {
      var date = new Date(product.date);

      return date >= firstDay && date <= lastDay;
    });

    let totalLastMonthIncome = resultProductData
      .reduce((total, income) => {
        return total + parseFloat(income.value);
      }, 0)
      .toFixed(2);

    console.log("income " + totalLastMonthIncome);
    return totalLastMonthIncome;
  }

  componentDidMount() {
    var date = new Date(),
      y = date.getFullYear() - 1,
      m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0, 23, 59, 59);

    let lastMonthIncome = this.getRangeIncome(
      this.props.company,
      firstDay,
      lastDay
    );
    let averageIncome = this.getAverageTotalIncome(this.props.company);

    this.setState(state => {
      state.startDate = firstDay;
      state.endDate = lastDay;
      state.lastMonthIncome = lastMonthIncome;
      state.averageIncome = averageIncome;

      return state;
    });
  }

  handleLabelChange(e) {
    this.setState({
      averageLabel: "Average income in date range  : ",
      monthLabel: "total income in date range : "
    });
  }

  handleBackButton() {
    this.props.changeSelectedCompany(null);
  }

  render() {
    return (
      <div className="company-details">
        <header id="nav" className="nav">
          <nav>
            <ul className="menu" id="menu">
              <button onClick={this.handleBackButton}> {"< Powrót"} </button>
              <h1>
                Company Id: {this.props.company.id}, Name:{" "}
                {this.props.company.name}, City: {this.props.company.city}
              </h1>
            </ul>
          </nav>
        </header>


        <div className = "details-content">

        <div className = "date-pickers">

        <label> Income from </label>
        
            <div className="wrapper">
            <DatePicker
              selected={this.state.startDate ? this.state.startDate : null}
              onChange={value => {
                if (value < this.state.endDate) {
                  this.handleDateChange("startDate", value);
                } else {
                  alert(
                    `Please chose earlier date than : ${this.state.endDate
                      .toString()
                      .slice(3, 15)}`
                  );
                }
              }}
              customInput={<CustomInput />}
              
            />
         </div>

          <label> to </label>
        
          <div className="wrapper">
            <DatePicker
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
              customInput={<CustomInput />}
            />
          </div>

        </div>


        <div className="company-incomes">
          <div className="wrapper">
            <label> {this.state.averageLabel} </label>

            <input
              onInput={this.handleLabelChange}
              id="average-total-income"
              type="number"
              value={this.state.averageIncome}
              placeholder="0,00"
              readOnly
            ></input>
          </div>

          <div className="wrapper">
            <label>{this.state.monthLabel} </label>

            <input
              onInput={this.handleLabelChange}
              id="last-month-income"
              type="number"
              value={this.state.lastMonthIncome}
              placeholder="0,00"
              readOnly
            ></input>
          </div>
        </div>





        </div>



          

        
      </div>
    );
  }
}

export default CompanyDetails;
