import React from "react";
import {
  Button,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Dialog,
  DialogActions,
  DialogTitle
} from "@material-ui/core";

import "./static/App.css";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import "./static/App.css";

export default class CategoryRows extends React.Component {
  constructor() {
    super();
    this.state = {
      deleteIndex: -1
    }
  }
  confirmDeleteDialog = index => () => {
    this.setState({
      deleteIndex: index
    })
  }
  deleteCategory = index => () => {
    this.confirmDeleteDialog(-1)();
    this.props.deleteCategory(index);
  }
  render() {
    const {data, openBooks, editCategory, addNewCategory} = this.props; 
    return (
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
            {data.length ?
              data.map((item, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>
                      <Button color="primary" onClick={openBooks(i)}>
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
                      <Button onClick={editCategory(i)}>
                        <EditIcon />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={this.confirmDeleteDialog(i)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }): ''}
          </TableBody>
        </Table>
        <Button
          variant="contained"
          color="primary"
          onClick={addNewCategory}
          style={{ float: "left" }}
        >
          Create a New Category
        </Button>
        {
          <Dialog
            open={this.state.deleteIndex !== -1}
            onClose={this.confirmDeleteDialog(-1)}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              Are you sure you want to delete ?
            </DialogTitle>
            <DialogActions>
              <Button onClick={this.confirmDeleteDialog(-1)} color="primary">
                Cancel
              </Button>
              <Button
                onClick={this.deleteCategory(this.state.deleteIndex)}
                color="primary"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        }
      </>
    );
  }
}
