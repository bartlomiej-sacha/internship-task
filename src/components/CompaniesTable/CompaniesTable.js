import React from "react";
import "./CompaniesTable.css";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import ReactLoading from "react-loading";
import CustomTableLoader from "./CustomTableLoader";
import CompanyDetails from '../CompanyDetails/CompanyDetails'
import { yellow } from "@material-ui/core/colors";





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
          pageSize = { this.props.pageSize}
          showPageSizeOptions = {false}
          defaultSorted={[
            {
              id: "totalIncome",
              desc: true
            }
          ]}
          getTrProps = {() => { return {}}}
          
          NoDataComponent={NullComponent}
         
          getProps={(state, table) => {
             return { style: { height: '100vh'}}
           }}




          getTrProps={(state, rowInfo) => {
            if (rowInfo && rowInfo.row) {
              return {
                
                onClick: e => {
                  console.log(rowInfo.row)
                  {this.handleChange(rowInfo.original)}
                 

                  this.setState({
                    selected: rowInfo.index,
                    selectedCompany: rowInfo.original
                  });
                }, style: {
                  cursor: 'pointer',
                 
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
