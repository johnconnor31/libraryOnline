import React from "react";
import {
  Button,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import "./static/App.css";

export default function CategoryRows(props) {
  return (
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
        {props.data.length &&
          props.data.map((item, i) => {
            return (
              <TableRow key={i}>
                <TableCell>
                  <Button color="primary" onClick={props.categoryClick(i)}>
                    {item.category}
                  </Button>
                </TableCell>
                <TableCell>
                  {item.books ? (item.books.length ? item.books.length : 0) : 0}
                </TableCell>
                <TableCell onClick={() => {}}>
                  <Button onClick={props.editCategory(i)}>
                    <EditIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={props.confirmDeleteDialog(i)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}
