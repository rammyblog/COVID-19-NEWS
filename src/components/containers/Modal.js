import React from 'react'
import {Button, Modal} from "react-bootstrap";
import Spinner from "./Spinner";

export default function ModalBox(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        {
          props.maskimage ? <img src= {props.maskimage} alt='Mask Instructions' className='img-fluid'/>: <Spinner/>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}