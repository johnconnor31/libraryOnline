import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@material-ui/core";
import BookRows from "./BookRows";

export default class CategoryForm extends React.Component {
  constructor() {
    super();
    this.state = {
      ...this.resetFormFields(),
      categoryIndex: -1
    };
  }
  static getDerivedStateFromProps(props, prevState) {
    if (props.categoryIndex !== prevState.categoryIndex) {
      const categoryFormData =
        props.categoryIndex === -1
          ? { category: "", books: [] }
          : props.data[props.categoryIndex];
      return {
        categoryFormData,
        categoryIndex: props.categoryIndex
      };
    }
  }
  resetFormFields = () => {
    return {
      categoryFormData: {
        category: "",
        books: []
      },
      newBookName: "",
      newBookPrice: "",
      bookNameError: "",
      bookPriceError: "",
      categoryNameError: "",
      addingBook: false
    };
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
  setNewBookField = field => event => {
    this.setState({
      [field]: event.target.value
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
  setCategoryName = event => {
    const categoryFormData = this.state.categoryFormData;
    categoryFormData.category = event.target.value;
    this.setState({
      categoryFormData
    });
  };
  handleSubmit = () => {
    const { categoryFormData } = this.state;
    const categoryNameError = this.validateCategory(categoryFormData.category);
    if (!categoryNameError) {
      const { categoryIndex } = this.props;
      this.props.submitCategoryData(categoryFormData, categoryIndex);
      this.setState({
        ...this.resetFormFields()
      });
      this.props.handleFormClose();
    } else {
      this.setState({
        categoryNameError
      });
    }
  };
  validateCategory(categoryName) {
    if (categoryName && this.state.categoryIndex===-1 ) {
      const data = this.props.data;
      const categoryIndex = data.findIndex(
        item => item.category === categoryName
      );
      if (categoryIndex === -1) return "Category name already exists";
      else return "";
    } else if ( !categoryName ){
      return "Please enter a category name";
    } else {
      return '';
    }
  }
  handleFormClose = () => {
    this.setState({
      ...this.resetFormFields()
    });
    this.props.handleFormClose();
  }
  render() {
    return (
      <Dialog
        open={this.props.isCategoryFormOpen}
        onClose={this.props.handleFormClose}
        fullWidth
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="categoryName"
            label="Category name"
            defaultValue={this.state.categoryFormData.category}
            fullWidth
            onChange={this.setCategoryName}
            error={this.state.categoryNameError}
            helperText={this.state.categoryNameError}
          />
          {this.state.categoryFormData.books.length !== 0 ? (
            <BookRows
              category={this.state.categoryFormData}
              editBook={this.editBook}
              editingBookIndex={this.state.editingBookIndex}
              updateBook={this.updateBook}
              deleteBook={this.deleteBook}
              setNewBookField={this.setNewBookField}
              bookNameError={this.state.bookNameError}
              bookPriceError={this.state.bookPriceError}
              isBookForm
            />
          ) : (
            ""
          )}
          {this.state.addingBook ? (
            <div>
              <TextField
                autoFocus
                margin="dense"
                id="bookName"
                label="Book Name"
                onChange={this.setNewBookField("newBookName")}
                error={this.state.bookNameError}
                helperText={this.state.bookNameError}
              />
              <TextField
                margin="dense"
                id="bookPrice"
                label="Price"
                onChange={this.setNewBookField("newBookPrice")}
                error={this.state.bookPriceError}
                helperText={this.state.bookPriceError}
              />
              <Button
                variant="outlined"
                onClick={this.addBook}
                style={{ top: "20px" }}
              >
                Add
              </Button>
            </div>
          ) : (
            <Button variant="contained" onClick={this.newBook}>
              Add book
            </Button>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleFormClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            {this.props.categoryIndex === -1
              ? "Submit Category"
              : "Update Category"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
