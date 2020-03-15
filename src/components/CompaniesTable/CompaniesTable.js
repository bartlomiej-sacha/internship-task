import React from "react";
import "./CompaniesTable.css";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import ReactLoading from "react-loading";
import CustomTableLoader from "./CustomTableLoader";
import CompanyDetails from '../CompanyDetails/CompanyDetails'




export class CompaniesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      
      selectedCompany: null,
   
  }
    this.handleCompanyDetails = this.handleCompanyDetails.bind(this);
    this.handleChange = this.handleChange.bind(this);
}




  handleCompanyDetails(company){
    this.setState({ selectedCompany: company})
  }


    handleChange(rowInfo){
      console.log('elo')
      console.log(rowInfo)
      this.props.onClick(rowInfo);
    }

  

  render() {

    const NullComponent = () => null;


    

    return (
      <div id="table" >
       
        <ReactTable 
          loading={this.props.loading}
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

                  {this.handleChange(rowInfo.original)}
                  /* this.handleCompanyDetails(rowInfo.original);
                  {this.handleChange(rowInfo.original)} */
                  this.setState({
                    selected: rowInfo.index,
                    selectedCompany: rowInfo.original
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
          data={this.props.data}
          columns={this.props.columns}
        ></ReactTable>

       
      </div>
    );
  }
}

export default CompaniesTable;
