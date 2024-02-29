import React from "react";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';



const NoteItem = () => {
  return (
    <>
      <div className="container">
        <h2>Your Notes</h2>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>
              <FontAwesomeIcon icon={faEdit} />
              <FontAwesomeIcon icon={faTrash} />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default NoteItem;
