import React from "react";
import CategoryRows from "./CategoryRows";
import BookRows from "./BookRows";
import CategoryForm from './CategoryForm';

export default class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      isCategoryFormOpen: false,
      viewBooks: false,
      booksCatIndex: -1
    };
  }
  openBooks = booksCatIndex => () => {
    this.setState({
      viewBooks: true,
      booksCatIndex
    });
  };
  closeBooks = () => {
    this.setState({
      viewBooks: false
    });
  };
  resetFields = () => {
    return {
      isCategoryFormOpen: false,
      booksCatIndex: -1
    };
  };
  addNewCategory = () => {
    this.setState({
      isCategoryFormOpen: true,
      booksCatIndex: -1
    });
  };
  editCategory = index => () => {
    this.setState({
      isCategoryFormOpen: true,
      booksCatIndex: index
    });
  };
  handleCategoryFormClose = () => {
    this.setState({
      ...this.resetFields()
    });
  };
  render() {
    const { viewBooks } = this.state;
    const { data } = this.props;
    return (
      <>
        {!viewBooks ? (
          <CategoryRows
            data={data}
            openBooks={this.openBooks}
            addNewCategory={this.addNewCategory}
            editCategory={this.editCategory}
            deleteCategory={this.props.deleteCategory}
          />
        ) : (
          <BookRows
            category={this.props.data[this.state.booksCatIndex]}
            closeBooks={this.closeBooks}
          />
        )}
        <CategoryForm
          data = {this.props.data}
          categoryIndex={this.state.booksCatIndex}
          isCategoryFormOpen={this.state.isCategoryFormOpen}
          handleFormClose={this.handleCategoryFormClose}
          submitCategoryData={this.props.submitCategoryData}
        />
      </>
    );
  }
}
