import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
  } from "@material-ui/core";
import BookRows from './BookRows';

export default function CategoryForm(props){
return (
    <Dialog
            open={props.isCategoryFormOpen}
            onClose={props.handleFormClose}
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
                defaultValue={props.categoryFormData.category}
                fullWidth
                onChange={props.setCategoryName}
                error={props.categoryNameError}
                helperText={props.categoryNameError}
              />
              {props.categoryFormData.books.length !== 0 ? (
                <BookRows
                  data={[props.categoryFormData]}
                  categoryIndex="0"
                  editBook={props.editBook}
                  editingBookIndex={props.editingBookIndex}
                  updateBook={props.updateBook}
                  deleteBook={props.deleteBook}
                  setNewBook={props.setNewBook}
                  bookNameError={props.bookNameError}
                  bookPriceError={props.bookPriceError}
                  isNewForm
                />
              ) : (
                ""
              )}
              {props.addingBook ? (
                <div>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="bookName"
                    label="Book Name"
                    onChange={props.setNewBook("newBookName")}
                    error={props.bookNameError}
                    helperText={props.bookNameError}
                  />
                  <TextField
                    margin="dense"
                    id="bookPrice"
                    label="Price"
                    onChange={props.setNewBook("newBookPrice")}
                    error={props.bookPriceError}
                    helperText={props.bookPriceError}
                  />
                  <Button
                    variant="outlined"
                    onClick={props.addBook}
                    style={{ top: "20px" }}
                  >
                    Add
                  </Button>
                </div>
              ) : (
                <Button variant="contained" onClick={props.newBook}>
                  Add book
                </Button>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={props.handleFormClose} color="primary">
                Cancel
              </Button>
              <Button onClick={props.handleSubmit} color="primary">
                {props.categoryIndex === -1 ? "Submit Category" : "Update Category"}
              </Button>
            </DialogActions>
          </Dialog>);
}