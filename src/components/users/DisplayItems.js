import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function DisplayItems(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
       <Button variant="primary" onClick={handleShow}>
        {props.value._id}
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Details of Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            contact - {props.value.contact}<br/>
            Address - {props.value.deliveryAddress}
        </Modal.Body>
        <Modal.Body>
            {props.value.orderItems.map((orderItem) => {
            return (
                <>
                <p>Item - {orderItem.name}</p>
                </>
            )
        })}</Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
  )
}

