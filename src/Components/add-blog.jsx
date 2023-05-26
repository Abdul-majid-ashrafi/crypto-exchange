import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

function AddBlog({ addBlog }) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(title.length < 10) {
      showErrorMessageAlert('Title should be atleast 10 characters.');
      return;
    }
    if(details.length < 10) {
      showErrorMessageAlert('Detail should be atleast 50 characters.');
      return;
    }
    addBlog({ title, description: details });
    handleClear();
    showSuccessAlert(true);
  };

  const showSuccessAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const showErrorMessageAlert = (message) => {
    setShowErrorAlert(message);
    setTimeout(() => {
      setShowErrorAlert('');
    }, 3000);
  };

  const handleClear = (e) => {
    setTitle("");
    setDetails("");
  };

  return (
    <div className="container row">
      <div className="col-6 mx-auto">
        <h3>Create Blog</h3>
        {showAlert && (
          <Alert
            variant="success"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            Blog added successfully!
          </Alert>
        )}
        {showErrorAlert && (
          <Alert
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {showErrorAlert}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="details" className="mt-4">
            <Form.Label>Details</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter blog details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" className="mt-2">
            Submit
          </Button>
          <Button
            variant="outline-danger"
            className="mt-2"
            onClick={handleClear}
            style={{ marginLeft: "10px" }}
          >
            Clear
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddBlog;
