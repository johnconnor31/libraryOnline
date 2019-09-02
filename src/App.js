import React, { Component } from "react";
import Categories from './Categories';
import bookData from "./static/mockData";
import "./static/App.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: bookData
    };
  }
  
  deleteCategory = index => {
    const data = this.state.data;
    data.splice(index,1);
    this.setState({
      data
    });
  }
  submitCategoryData = (categoryFormData, categoryIndex) => {
    const data = this.state.data;
    categoryIndex === -1
        ? data.push(categoryFormData)
        : data.splice(categoryIndex, 1, categoryFormData);
      this.setState({
        data
      });
  }
  render() {
    const { data } = this.state;
    return (
      <div className="App">
        <h3> Welcome to the Inventory </h3>
        <Categories 
        data={data}
        deleteCategory={this.deleteCategory}
        submitCategoryData={this.submitCategoryData} />
      </div>
    );
  }
}
