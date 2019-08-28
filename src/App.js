import React, { Component } from "react";
import BookRows from "./BookRows";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle} from "@material-ui/core";
import CategoryForm from "./CategoryForm";
import BackIcon from "@material-ui/icons/KeyboardBackspace";
import bookData from "./static/mockData";
import "./static/App.css";
import CategoryRows from "./CategoryRows";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: bookData,
      ...this.resetFormFields()
    };
  }

  categoryClick = categoryIndex => () => {
    console.log("clicked cateogry", categoryIndex);
    this.setState({
      isCategoryOpen: true,
      categoryIndex
    });
  };
  addCategory = () => {
    this.setState({
      isCategoryFormOpen: true
    });
  };
  closeCategory = () => {
    this.setState({
      isCategoryOpen: false,
      ...this.resetFormFields()
    });
  };
  handleFormClose = () => {
    this.setState({
      isCategoryFormOpen: false
    });
  };
  resetFormFields = () => {
    return {
      isCategoryFormOpen: false,
      categoryFormData: {
        category: "",
        books: []
      },
      categoryIndex: -1,
      newBookName: "",
      newBookPrice: "",
      bookNameError: "",
      bookPriceError: "",
      categoryNameError: "",
      confirmDelete: -1
    };
  };
  handleSubmit = () => {
    if (this.state.categoryFormData.category) {
      const { data, categoryIndex, categoryFormData } = this.state;
      categoryIndex === -1
        ? data.push(categoryFormData)
        : data.splice(categoryIndex, 1, categoryFormData);
      this.setState({
        data,
        ...this.resetFormFields()
      });
    } else {
      this.setState({
        categoryNameError: "Please enter a category name"
      });
    }
  };
  deleteBook = rowIndex => () => {
    const categoryFormData = this.state.categoryFormData;
    categoryFormData.books.splice(rowIndex, 1);
    this.setState({
      categoryFormData
    });
  };
  editBook = i => () => {
    const categoryFormData = this.state.categoryFormData;
    const { name, price } = categoryFormData.books[i];
    this.setState({
      editingBookIndex: i,
      newBookName: name,
      newBookPrice: price
    });
  };
  updateBook = i => () => {
    const { newBookName, newBookPrice, categoryFormData } = this.state;
    const { bookNameError, bookPriceError } = this.validateBookFields();
    console.log("updating book", bookNameError, bookPriceError);
    if (!bookNameError && !bookPriceError) {
      categoryFormData.books.splice(i, 1, {
        name: newBookName,
        price: newBookPrice
      });
      this.setState({
        categoryFormData,
        newBookName: "",
        newBookPrice: "",
        bookNameError: "",
        bookPriceError: "",
        editingBookIndex: -1
      });
    } else {
      this.setState({
        bookNameError,
        bookPriceError
      });
    }
  };
  newBook = () => {
    this.setState({
      addingBook: true
    });
  };
  setNewBook = field => event => {
    this.setState({
      [field]: event.target.value
    });
  };
  setCategoryName = event => {
    const categoryFormData = this.state.categoryFormData;
    categoryFormData.category = event.target.value;
    this.setState({
      categoryFormData
    });
  };
  editCategory = index => () => {
    const data = this.state.data;
    this.setState({
      isCategoryFormOpen: true,
      categoryIndex: index,
      categoryFormData: { ...data[index] }
    });
  };
  confirmDeleteDialog = i => () => {
    this.setState({
      confirmDelete: i
    });
  };
  closeDeleteDialog = () => {
    this.setState({
      confirmDelete: -1
    });
  };
  deleteCategory = index => () => {
    const data = this.state.data;
    data.splice(index, 1);
    this.setState({
      data,
      confirmDelete: -1
    });
  };
  addBook = () => {
    const { newBookName, newBookPrice, categoryFormData } = this.state;
    console.log("newbook", newBookName, newBookPrice, categoryFormData);
    const { bookNameError, bookPriceError } = this.validateBookFields();
    if (!bookNameError && !bookPriceError) {
      categoryFormData.books.push({
        name: newBookName,
        price: newBookPrice
      });
      this.setState({
        categoryFormData,
        newBookName: "",
        newBookPrice: "",
        bookNameError: "",
        bookPriceError: "",
        addingBook: false
      });
    } else {
      this.setState({
        bookNameError,
        bookPriceError
      });
    }
  };
  validateBookFields = () => {
    const { newBookName, newBookPrice } = this.state;
    let bookNameError, bookPriceError;
    if (!newBookName) {
      bookNameError = "Please enter a book name";
    } else if (!newBookPrice) {
      bookPriceError = "Please enter a book price";
    } else if (newBookPrice && isNaN(newBookPrice)) {
      bookPriceError = "Book price should be a number";
    } else {
    }
    return { bookNameError, bookPriceError };
  };
  render() {
    const {
      isCategoryOpen,
      data,
      confirmDelete
    } = this.state;
    return (
      <div className="App">
        <h3> Welcome to the Inventory </h3>
        {!isCategoryOpen && (
          <>
            <CategoryRows
              data={data}
              categoryClick={this.categoryClick}
              editCategory={this.editCategory}
              confirmDeleteDialog={this.confirmDeleteDialog}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.addCategory}
              style={{ float: "left" }}
            >
              Create a New Category
            </Button>
          </>
        )}
        {isCategoryOpen && (
          <>
            <Button
              className="backArrow"
              style={{ float: "left" }}
              onClick={this.closeCategory}
            >
              <BackIcon />
            </Button>
            <BookRows
              data={this.state.data}
              categoryIndex={this.state.categoryIndex}
            />
          </>
        )}
        <CategoryForm
          {...this.state}
          newBook={this.newBook}
          setNewBook={this.setNewBook}
          addBook={this.addBook}
          editBook={this.editBook}
          updateBook={this.updateBook}
          deleteBook={this.deleteBook}
          handleFormClose={this.handleFormClose}
          handleSubmit={this.handleSubmit}
          setCategoryName={this.setCategoryName}
        />

        {
          <Dialog
            open={confirmDelete !== -1}
            onClose={this.closeDeleteDialog}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              Are you sure you want to delete ?
            </DialogTitle>
            <DialogActions>
              <Button onClick={this.closeDeleteDialog} color="primary">
                Cancel
              </Button>
              <Button
                onClick={this.deleteCategory(confirmDelete)}
                color="primary"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        }
      </div>
    );
  }
}
