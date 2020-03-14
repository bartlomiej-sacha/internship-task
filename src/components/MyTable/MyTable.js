import React from "react";
import "./MyTable.css"
import ReactTable from "react-table-v6"
import 'react-table-v6/react-table.css'
import ReactLoading from 'react-loading';
import CustomTableLoader from './CustomTableLoader'



const Example = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={667} width={375} />
);

export class MyTable extends React.Component {

  constructor(props){
    super(props)
    this.state ={
        loading: true,
      companies: [],
      columns: [{
        Header: 'Id',
        accessor: 'id' // String-based value accessors!
      }, {
        Header: 'Name',
        accessor: 'name',
        
      }, {
        Header: 'City',
        accessor: 'city',
        
      }]
    }
    this.seedCompanies = this.seedCompanies.bind(this); 
  }



/*   componentDidMount() {
      let companies = [];
    fetch("https://recruitment.hal.skygate.io/companies")
      .then(res => res.json())
      .then(
        result => {
          result.forEach(fetchedCompany => {


                let company = {
                    id: fetchedCompany.id,
                    name: fetchedCompany.name,
                    city: fetchedCompany.city,
                    
                  };

              companies.push(company);
          },
         
        
        
      );

      this.setState({ companies: companies });
    this.setState({ loading: false})
    },error => {}) 
    console.log("gowno")



    
    
} */


componentDidMount() {
  

  
fetch("https://recruitment.hal.skygate.io/companies")
.then(response => response.json())
.then(result => {
    
    
    console.log("old", result);
    return result;
})
.then(async data => {
    await Promise.all(data.map((e, index, array) => {
        return fetch(`https://recruitment.hal.skygate.io/incomes/${e.id}`)
            .then(response => response.json())
            .then(data => {
                array[index] = {...e, ...data};
                console.log("update");
            })
    }));

    this.setState({ companies: data, loading: false });
    console.log("new", data)
});
  
  
}



/* componentDidMount() {
    let companies = [];
  fetch("https://recruitment.hal.skygate.io/companies")
    .then(res => res.json())
    .then(
      result => {
        result.forEach(fetchedCompany => {
          fetch(
            `https://recruitment.hal.skygate.io/incomes/${fetchedCompany.id}`
          )
            .then(res => res.json())
            .then(
              income => {
                let company = {
                  id: fetchedCompany.id,
                  name: fetchedCompany.name,
                  city: fetchedCompany.city
                };

                companies.push(company);
              },

              error => { console.log('cipa')}
            );
        });
        this.setState({ companies: companies });
        
      },
      error => {console.log('cipa')}); 
  console.log("gowno")
 
  
} */
      
  seedCompanies() {
    let companies = this.state.companies.map((val, index) => {
      return (
        <h1>
          {" "}
          Company id : {val.id} Company name : {val.name} City :{" "}
          {val.city}{" "}
        </h1>
      );
    });
    return companies;
  }

  render(){

    let table;
    const NullComponent = () => null;

    console.log(this.state.loading)

    if(this.state.loading === false) {
        
        
      
    } else {
        table = <h1>loading</h1>
    }


      return( <div id = 'table'>
      
<ReactTable  loading={this.state.loading}   LoadingComponent={CustomTableLoader}
         defaultSorted={[
            {
              id: "id",
              desc: true
            }
          ]}  


          NoDataComponent = {NullComponent}

          getTrProps={(state, rowInfo) => {
            if (rowInfo && rowInfo.row) {
              return {
                onClick: (e) => {
                  this.setState({
                    selected: rowInfo.index
                  })
                },
                style: {
                  background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                  color: rowInfo.index === this.state.selected ? 'white' : 'black'
                }
              }
            }else{
              return {}
            }
          }}

    data={this.state.companies}
    columns={this.state.columns}>
     </ReactTable>

     

      </div>)
  }
}

  export default MyTable;
  