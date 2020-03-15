import React from "react";
import "./CompaniesTable.css";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import ReactLoading from "react-loading";
import CustomTableLoader from "./CustomTableLoader";

const Example = ({ type, color }) => (
  <ReactLoading type={type} color={color} height={667} width={375} />
);

export class CompaniesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      companies: [],
      columns: [
        {
          Header: "Id",
          accessor: "id" // String-based value accessors!
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
   
  }



  sumIncomesForEachCompany(companies){

    companies.forEach((company) => {
      console.log('przerabiana company : '+company.name)
      company.totalIncome = company.incomes.reduce((total, income) => {
        console.log(income.value)
        return total + parseFloat(income.value) ;
      },0).toFixed(2)
      console.log(`company name: ${company.name} total income : ${company.totalIncome}`)
    })

    return companies;

  }




  componentDidMount() {
    fetch("https://recruitment.hal.skygate.io/companies")
      .then(response => response.json())
      .then(result => {
        console.log("old", result);
        return result;
      })
      .then(async data => {
        await Promise.all(
          data.map((e, index, array) => {
            return fetch(`https://recruitment.hal.skygate.io/incomes/${e.id}`)
              .then(response => response.json())
              .then(data => {
                array[index] = { ...e, ...data };
                console.log("update");
              });
          })
        );

        data = this.sumIncomesForEachCompany(data);
        this.setState({ companies: data, loading: false });
        
        console.log("new", data);
      });
  }

  render() {
    const NullComponent = () => null;

    return (
      <div id="table">
        <ReactTable
          loading={this.state.loading}
          LoadingComponent={CustomTableLoader}
          defaultSorted={[
            {
              id: "totalIncome",
              desc: true
            }
          ]}
          NoDataComponent={NullComponent}
          getTrProps={(state, rowInfo) => {
            if (rowInfo && rowInfo.row) {
              return {
                onClick: e => {

                  
                  this.setState({
                    selected: rowInfo.index
                  });
                },
                style: {
                  background:
                    rowInfo.index === this.state.selected ? "#00afec" : "white",
                  color:
                    rowInfo.index === this.state.selected ? "white" : "black"
                }
              };
            } else {
              return {};
            }
          }}
          data={this.state.companies}
          columns={this.state.columns}
        ></ReactTable>
      </div>
    );
  }
}

export default CompaniesTable;
