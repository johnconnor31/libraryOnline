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
import BackIcon from "@material-ui/icons/KeyboardBackspace";
import UpdateIcon from "@material-ui/icons/Done";
import PropTypes from "prop-types";

export default class BookRows extends Component {
  static propTypes = {
    data: PropTypes.object
  };
  render() {
    const {
      category,
      isBookForm,
      editBook,
      deleteBook,
      editingBookIndex,
      bookNameError,
      bookPriceError
    } = this.props;
    return (
      <div className="bookRows">
        {!isBookForm && <Button
              className="backArrow"
              style={{ float: "left" }}
              onClick={this.props.closeBooks}
            >
              <BackIcon />
        </Button>
        }
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell>Book Name</TableCell>
              <TableCell>Book Price</TableCell>
              {isBookForm && <TableCell />}
              {isBookForm && <TableCell />}
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
                            onChange={this.props.setNewBookField("newBookName")}
                            defaultValue={book.name}
                            error={bookNameError!==''}
                            helperText={bookNameError}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            margin="dense"
                            id="bookPrice"
                            label="Price"
                            onChange={this.props.setNewBookField("newBookPrice")}
                            defaultValue={book.price}
                            error={bookPriceError!==''}
                            helperText={bookPriceError}
                          />
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{book.name}</TableCell>
                        <TableCell>{'$'+book.price}</TableCell>
                      </>
                    )}
                    {isBookForm && (
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
                    {isBookForm && (
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
