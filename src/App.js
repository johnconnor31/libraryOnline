import React from 'react';
import mockData from './mockData';
import logo from './logo.svg';
import './App.css';
import  BookRows  from './BookRows';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      data: mockData
    }
  }
  render(){
    const bookData = this.state.data;
    return (
      <div className="App">
        <h3> Welcome to the Inventory </h3>
        <h4> Please click on a category to checkout books </h4>
        <BookRows bookData = {bookData} />
      </div>
    );
  }
}

export default App;
