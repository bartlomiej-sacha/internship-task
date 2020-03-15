import React from 'react';

import './CompanyDetails.css';



export class CompanyDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     
    };
      
   
  }




  changeTableData() {

  }

 



  componentDidMount() {
   
  }



  getAverageIncomes(company){



     return (company.totalIncome / company.incomes.length).toFixed(2);


  }


  


  
  render(){

  
  return (

    
    <div className="company-details">
        
        <h1> srednia zarobkow firmy : {this.getAverageIncomes(this.props.company)} </h1>
     
    </div>
    );
  }
}

export default CompanyDetails;
