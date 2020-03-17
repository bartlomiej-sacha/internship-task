import React from 'react';
import CompaniesTable from '../CompaniesTable/CompaniesTable'
import './App.css';
import CompanyDetails from '../CompanyDetails/CompanyDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'


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
          accessor: "id", // String-based value accessors!
         
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
      this.printCompanyIncomes = this.printCompanyIncomes.bind(this);
      this.changeSelectedCompany = this.changeSelectedCompany.bind(this);
   
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

        


        
       /*  console.log("new", data); */
      });
  }



  sumIncomesForEachCompany(companies){

    companies.forEach((company) => {
     /*  console.log('przerabiana company : '+company.name) */
      company.totalIncome = company.incomes.reduce((total, income) => {
        /* console.log(income.value) */
        return total + parseFloat(income.value) ;
      },0).toFixed(2)

      
      
      company.incomes.forEach((income) => {

        income.date = new Date(income.date);
        /* console.log( income.date); */

      }) 


      /* console.log(`company name: ${company.name} total income : ${company.totalIncome}`) */
    })





    return companies;

  }



  


  printCompanyIncomes(id) {


    console.log(`Date : ${this.state.companies[1].city} `);
    
  }


  changeSelectedCompany(company) {
    console.log(company)
    
    
    this.setState({ selectedCompany: company })
    
}

  
  render(){
    let details = null;

    if(this.state.selectedCompany !== null) {
        details = <CompanyDetails  changeSelectedCompany = {this.changeSelectedCompany}   company = {this.state.selectedCompany } />  
    } else {
      details = null;
    }
  
  return (

           
    
    <div className="App">
       
       {this.state.selectedCompany ? details : <CompaniesTable  pageSize={10} onClick = {this.changeSelectedCompany}   data = {this.state.companies} columns = {this.state.columns} loading = {this.state.loading}/>}
       
       
    </div>
    );
  }
}

export default App;
