import React, { Component } from "react";
import {
  Button,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TextField
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Done";
import PropTypes from "prop-types";

export default class BookRows extends Component {
  static propTypes = {
    data: PropTypes.object,
    categoryIndex: PropTypes.number
  };
  render() {
    const {
      data,
      categoryIndex,
      isNewForm,
      editBook,
      deleteBook,
      editingBookIndex
    } = this.props;
    const category = data[categoryIndex];
    return (
      <div className="bookRows">
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell>Book Name</TableCell>
              <TableCell>Book Price</TableCell>
              {isNewForm && <TableCell />}
              {isNewForm && <TableCell />}
            </TableRow>
          </TableHead>
          <TableBody>
            {category.books &&
              category.books.length !== 0 &&
              category.books.map((book, i) => {
                return (
                  <TableRow key={i}>
                    {editingBookIndex === i ? (
                      <>
                        <TableCell>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="bookName"
                            label="Book Name"
                            onChange={this.props.setNewBook("newBookName")}
                            defaultValue={book.name}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            margin="dense"
                            id="bookPrice"
                            label="Price"
                            onChange={this.props.setNewBook("newBookPrice")}
                            defaultValue={book.price}
                          />
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{book.name}</TableCell>
                        <TableCell>{book.price}</TableCell>
                      </>
                    )}
                    {isNewForm && (
                      <TableCell>
                        {editingBookIndex === i ? (
                          <Button onClick={this.props.updateBook(i)}>
                        <UpdateIcon /></Button>
                        ) : (
                          <Button onClick={editBook(i)}>
                            <EditIcon />
                          </Button>
                        )}
                      </TableCell>
                    )}
                    {isNewForm && (
                      <TableCell>
                        <Button onClick={deleteBook(i)}>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    );
  }
}
