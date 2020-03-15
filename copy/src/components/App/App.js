import React from 'react';
import CompaniesTable from '../CompaniesTable/CompaniesTable'
import './App.css';

export class App extends React.Component {
  
  render(){
  return (
    <div className="App">
       <CompaniesTable />
    </div>
    );
  }
}

export default App;
