import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AddNote = () => {
  const [note, setnote] = useState({ title: "", description: "", tag: "" });

  const handleonchange = (event) => {
    setnote({ ...note, [event.target.value]: event.target.value });
  };
  return (
    <>
      <div className="container">
        <div
          style={{ display: "grid", justifyContent: "center", width: "100%" }}
        >
          <h2> Add a note</h2>
          <Form style={{ width: "500px" }}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                id="title"
                onChange={handleonchange}
                placeholder="Enter Title"
                style={{ width: "70%" }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                id="description"
                onChange={handleonchange}
                placeholder="Description"
                style={{ width: "70%" }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tag</Form.Label>
              <Form.Control
                type="text"
                name="tag"
                id="tag"
                onChange={handleonchange}
                placeholder="Enter Tag"
                style={{ width: "70%" }}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddNote;
