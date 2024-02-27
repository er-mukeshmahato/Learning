import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

export function Home() {
  return (
    <>
    <div className='container'>
      <div style={{display:"grid",justifyContent:"center",width:"100%"}}>
      <h2> Add a note</h2>
     <Form style={{width:"500px"}} >
      <Form.Group className="mb-3" >
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Title" style={{ width: '70%' }} />
       
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Description" style={{ width: '70%' }} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Tag</Form.Label>
        <Form.Control type="text" placeholder="Enter Tag" style={{ width: '70%' }} />
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
      </div>
   
    </div>
    <div className='container'>
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
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
      </Table>
    </div>
    
    </>
  )
}

export default Home
