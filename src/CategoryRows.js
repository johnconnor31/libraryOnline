import React, { Component } from "react";
import BookRows from "./BookRows";
import PropTypes from "prop-types";
import {
  Button,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import bookData from "./static/mockData";
import "./static/App.css";

export default class CategoryRows extends Component {
  constructor() {
    super();
    this.state = {
      data: bookData,
      isCategoryOpen: false,
      isCategoryFormOpen: false,
      addingBook: false,
      editingBookIndex: -1,
      categoryFormData: {
        category: "",
        books: []
      },
      newBookName: "",
      newBookPrice: ""
    };
  }

  categoryClick = categoryIndex => event => {
    console.log("clicked cateogry", categoryIndex);
    this.setState({
      isCategoryOpen: true,
      categoryIndex
    });
  };
  deleteBook = rowIndex => e => {
      const categoryFormData = this.state.categoryFormData;
      categoryFormData.books.splice(rowIndex,1);
      this.setState({
        categoryFormData
      });
  };
  editBook = i => event => {
    const categoryFormData = this.state.categoryFormData;
    const {name, price} = categoryFormData.books[i];
    this.setState({
      editingBookIndex:i,
      newBookName: name,
      newBookPrice: price
    });
  };
  updateBook = i => event => {
    const {newBookName, newBookPrice, categoryFormData} = this.state;
    if (newBookName && newBookPrice) {
      console.log('updating book', i);
      categoryFormData.books.splice(i,1,{
        name: newBookName,
        price: newBookPrice
      });
      this.setState({
        categoryFormData,
        newBookName: "",
        newBookPrice: "",
        editingBookIndex: -1
      });
  }
  };
  addCategory = event => {
    this.setState({
      isCategoryFormOpen: true
    });
  };
  handleFormClose = () => {
    this.setState({
      isCategoryFormOpen: false
    });
  };
  handleSubmit = event => {
    if(this.state.categoryFormData.category){
      const data = this.state.data;
      data.push(this.state.categoryFormData);
      this.setState({
        data,
        isCategoryFormOpen: false
      });
    }
  };
  newBook = event => {
    this.setState({
      addingBook: true
    });
  };
  setNewBook = field => event => {
    this.setState({
      [field]: event.target.value
    });
  };
  setCategory= event => {
    const categoryFormData = this.state.categoryFormData;
    categoryFormData.category = event.target.value;
    this.setState({
      categoryFormData
    });
  }
  editCategory = index => event => {
    const data = this.state.data;
    this.setState({
      isCategoryFormOpen: true,
      categoryFormData: data[index]
    });
  }
  deleteCategory = index => event => {
    const data = this.state.data;
    data.splice(index,1);
    this.setState({data});
  }
  addBook = () => {
    const { newBookName, newBookPrice, categoryFormData } = this.state;
    console.log("newbook", newBookName, newBookPrice, categoryFormData);
    if (newBookName && newBookPrice) {
      categoryFormData.books.push({
        name: newBookName,
        price: newBookPrice
      });
      this.setState({
        categoryFormData,
        newBookName: "",
        newBookPrice: "",
        addingBook: false
      });
    }
  };
  render() {
    const {
      isCategoryOpen,
      isCategoryFormOpen,
      data,
      addingBook,
      categoryFormData,
      editingBookIndex
    } = this.state;
    return (
      <div className="App">
        <h3> Welcome to the Inventory </h3>
        {!isCategoryOpen && (
          <>
            <Table className="table">
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>No. of books</TableCell>
                  <TableCell />
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length &&
                  data.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell>
                          <Button
                            color="primary"
                            onClick={this.categoryClick(i)}
                          >
                            {item.category}
                          </Button>
                        </TableCell>
                        <TableCell>
                          {item.books
                            ? item.books.length
                              ? item.books.length
                              : 0
                            : 0}
                        </TableCell>
                        <TableCell onClick={() => {}}>
                          <Button onClick={this.editCategory(i)}>
                            <EditIcon />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button onClick={this.deleteCategory(i)}>
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
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
          <BookRows
            data={this.state.data}
            categoryIndex={this.state.categoryIndex}
          />
        )}
        {
          <Dialog
            open={isCategoryFormOpen}
            onClose={this.handleFormClose}
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
                fullWidth
                onChange={this.setCategory}
              />
              {categoryFormData.books.length !== 0 ? (
                <BookRows
                  data={[categoryFormData]}
                  categoryIndex="0"
                  editBook={this.editBook}
                  deleteBook={this.deleteBook}
                  editingBookIndex={editingBookIndex}
                  updateBook={this.updateBook}
                  setNewBook = {this.setNewBook}
                  isNewForm
                />
              ) : (
                ""
              )}
              {addingBook ? (
                <div>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="bookName"
                    label="Book Name"
                    onChange={this.setNewBook("newBookName")}
                  />
                  <TextField
                    margin="dense"
                    id="bookPrice"
                    label="Price"
                    onChange={this.setNewBook("newBookPrice")}
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
                Submit Category
              </Button>
            </DialogActions>
          </Dialog>
        }
      </div>
    );
  }
}
