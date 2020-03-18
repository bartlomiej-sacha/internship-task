import React from "react";
import CompaniesTable from "../CompaniesTable/CompaniesTable";
import "./App.css";
import CompanyDetails from "../CompanyDetails/CompanyDetails";
import "bootstrap/dist/css/bootstrap.min.css";


  /** Main component which  stores fetched data and variables to handle view switching logic */
export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCompany: null,
      loading: true,
      companies: [],
      columns: [
        {
          Header: "Id",
          accessor: "id"
        },
        {
          Header: "Name",
          filterable: true,
          accessor: "name"
        },
        {
          Header: "City",
          accessor: "city"
        },
        {
          Header: "Total income",
          accessor: "totalIncome"
        }
      ]
    };
    
    this.changeSelectedCompany = this.changeSelectedCompany.bind(this);
  }


/** Lifecycle method resposible for fetching data and storing them in component state, uses fetched companies ids to fetch their incomes data*/
  componentDidMount() {
    fetch("https://recruitment.hal.skygate.io/companies")
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .then(async data => {
        await Promise.all(
          data.map((e, index, array) => {
            return fetch(`https://recruitment.hal.skygate.io/incomes/${e.id}`)
              .then(response => response.json())
              .then(data => {
                array[index] = { ...e, ...data };
              });
          })
        );

        data = this.sumIncomesForEachCompany(data);
        this.setState({ companies: data, loading: false });
      });
  }


  /** assign property totalIncome for each company by reducing their incomes*/
  sumIncomesForEachCompany(companies) {
    companies.forEach(company => {
      company.totalIncome = company.incomes
        .reduce((total, income) => {
          return total + parseFloat(income.value);
        }, 0)
        .toFixed(2);

      company.incomes.forEach(income => {
        income.date = new Date(income.date);
      });
    });
    return companies;
  }

  
/** function for communication with child component, stores selected company in state*/
  changeSelectedCompany(company) {
    this.setState({ selectedCompany: company });
  }


  /** by using ternary operator renders table with companies or selected company view */
  render() {
    let details = null;
    if (this.state.selectedCompany !== null) {
      details = (
        <CompanyDetails
          changeSelectedCompany={this.changeSelectedCompany}
          company={this.state.selectedCompany}
        />
      );
    } else {
      details = null;
    }

    return (
      <div className="App">
        {this.state.selectedCompany ? details : 
        (
          <CompaniesTable
            pageSize={10}
            onClick={this.changeSelectedCompany}
            data={this.state.companies}
            columns={this.state.columns}
            loading={this.state.loading}
          />
        )}
      </div>
    );
  }
}

export default App;
