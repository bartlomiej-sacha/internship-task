import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomInput from "../CustomInput/CustomInput";
import Graph from "../Graph/Graph";
import "./CompanyDetails.css";

/** Component rendering selected company view and calculating required values storing them in state*/
export class CompanyDetails extends React.Component {
  
  
  constructor(props) {
    super(props);
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();

    this.state = {
      startDate: new Date(y, m -1, 1),
      endDate: new Date(y, m , 0, 23, 59, 59),
      dataHasChanged: false,
      lastMonthIncome: 0,
      averageIncome: 0,
      averageLabel: "Average total income : ",
      monthLabel: "Last month income : "
    };
    this.getRangeIncome = this.getRangeIncome.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.getIncomeForEachMonth = this.getIncomeForEachMonth.bind(this);
    this.filterIncomesByDate = this.filterIncomesByDate.bind(this);
  }

  /** helper function for rounding numbers to 2 decimal places*/
  roundToTwoDec(value) {
    return Math.round(value * 100) / 100;
  }


   /** sets dates from both DatePickers to store date range in state and then calls for updating company details in state */
  handleDateChange(dateProperty, date) {
    this.setState(
      {
        [dateProperty]: date
      },
      function() {
        this.setState({
          lastMonthIncome: this.getRangeIncome(this.props.company.incomes),
          averageIncome: this.getRangeAverageIncome(this.props.company.incomes),
          averageLabel: "Average income in date range  : ",
          monthLabel: "total income in date range : "
        });
      }
    );
  };

  /** returns calculated average of company incomes */
  getAverageTotalIncome(company) {
    if (company.incomes.length !== 0) {
      return this.roundToTwoDec(
        company.totalIncome / company.incomes.length + 1
      );
    } else return 0;
  }

  /** callback function for filtering incomes in date range */
  filterIncomesByDate(incomes) {
    var date = new Date(incomes.date);
    return date >= this.state.startDate && date <= this.state.endDate;
  }

  /**returns calculated average of company incomes in date range */
  getRangeAverageIncome(incomes) {
    let rangeAverageIncome = 0;
    let itemCount = 0;

    let totalRangeIncome = incomes
      .filter(this.filterIncomesByDate)
      .reduce((total, income) => {
        itemCount++;
        return total + parseFloat(income.value);
      }, 0);

    if (totalRangeIncome !== 0) {
      rangeAverageIncome = this.roundToTwoDec(totalRangeIncome / itemCount);
    } 
    return rangeAverageIncome;
  }

  /**returns returns the sum  of company incomes in date range */
  getRangeIncome(incomes) {
    var rangeIncomes = incomes.filter(this.filterIncomesByDate);
    let rangeTotalIncome = rangeIncomes
      .reduce((total, income) => {
        return total + parseFloat(income.value);
      }, 0)
      
    return this.roundToTwoDec(rangeTotalIncome);
  }

  /** Lifecycle method sets values of input fields in state after component mounted */
  componentDidMount() {
    let lastMonthIncome = this.getRangeIncome(this.props.company.incomes);
    let averageIncome = this.getAverageTotalIncome(this.props.company);
    this.setState({
      lastMonthIncome: lastMonthIncome,
      averageIncome: averageIncome
    });
  }

  /** changes labels of input fields after user changed date range*/
  handleLabelChange(e) {
    this.setState({
      averageLabel: "Average income in date range  : ",
      monthLabel: "total income in date range : "
    });
  }

 /** call parent function to switch view*/
  handleBackButton() {
    this.props.changeSelectedCompany(null);
  }



  /**  returns object which stores monthly incomes by filtering incomes by date and suming them using dynamic property keys of object*/
  getIncomeForEachMonth(incomes) {
    incomes.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
    });
    var incomesByMonth = {};

    incomes.filter(function(income){
      let date = new Date(income.date);
      let monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      let monthEnd = new Date(date.getFullYear(),date.getMonth() + 1,0,23,59,59);

      if (date >= monthStart && date <= monthEnd) {
        if (incomesByMonth[`${monthStart}`] === undefined) {
          incomesByMonth[`${monthStart}`] = parseFloat(income.value);
        } else {
          incomesByMonth[`${monthStart}`] += parseFloat(income.value);
        }
      }
      
    });

    return incomesByMonth;
  }

/**  renders company details view */
  render() {
    return (
      <div className="company-details">
        <ul className="header">
          <button onClick={this.handleBackButton}> {"< Powrót"} </button>
          <h1>
            Company Id: {this.props.company.id}, Name: {this.props.company.name}
            , City: {this.props.company.city}
          </h1>
        </ul>

        <div className="details-content">
          <div className="date-pickers">
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
                id="last-month-income"
                type="number"
                value={this.state.lastMonthIncome}
                placeholder="0,00"
                readOnly
              ></input>
            </div>
          </div>

          <Graph
            data={this.getIncomeForEachMonth(this.props.company.incomes)}
            company={this.props.company}
          />
        </div>
      </div>
    );
  }
}

export default CompanyDetails;
