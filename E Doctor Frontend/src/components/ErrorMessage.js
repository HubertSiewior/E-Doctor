import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {showErrorPopup} from "../redux/actions";
import {Container} from "react-bootstrap";

export const ErrorMessage = () => {
    const dispatch = useDispatch();
    const error_message = useSelector(state => state.error_message);

    const handleClose = () => dispatch(showErrorPopup(null));
    const color="#ff0000";
    return (
        <Container variant="danger">
            <Modal show={error_message != null} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <style> {`body { background-color: ${color};}`} </style>
                <Modal.Body>{error_message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}