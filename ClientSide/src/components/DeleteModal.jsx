import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function DeleteModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-danger w-100" onClick={handleShow}>
        <i className="fa-solid fa-trash"></i> Delete Product
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are about to delete this product permanently, are you sure?
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            <i className="fa-solid fa-xmark"></i> Close
          </button>
          <button
            className="btn btn-danger"
            onClick={() => props.handleDeleteProduct(props.product)}
          >
            <i className="fa-solid fa-trash-can"></i> Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
