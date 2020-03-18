import React from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import CustomTableLoader from "../CustomTableLoader/CustomTableLoader";


 /** Table component */
export class CompaniesTable extends React.Component {
  
  /** Sends clicked company row back to parent component by using function passed as props from parent*/
  handleClick(company) {
    this.props.onClick(company);
  }


  /** Renders ReactTable component with data and columns from parent component*/
  render() {
    const NullComponent = () => null;

    return (
      <div id="table">
        <ReactTable
          loading={this.props.loading}
          LoadingComponent={CustomTableLoader}
          pageSize={this.props.pageSize}
          showPageSizeOptions={false}
          defaultSorted={[
            {
              id: "totalIncome",
              desc: true
            }
          ]}
          getTrProps={() => {
            return {};
          }}
          NoDataComponent={NullComponent}
          getProps={(state, table) => {
            return { style: { height: "100vh" } };
          }}
          getTrProps={(state, rowInfo) => {
            if (rowInfo && rowInfo.row) {
              return {
                onClick: e => {

                  {
                    this.handleClick(rowInfo.original);
                  }

                 
                },
                style: {
                  cursor: "pointer"
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
