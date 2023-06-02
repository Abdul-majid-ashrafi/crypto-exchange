import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { ErrorAlert, SuccessAlert } from '../UI/Assest';
import { useSelector, useDispatch } from 'react-redux';
import { coinTransferred } from "../../redux/actions/crypto";


function CryptoExchangeComponent() {
    const data = useSelector((state) => state.crypto);

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        if (data.users.length > 0) {
            setUsers(data.users);
        }
    }, []);

    const dispatch = useDispatch();

    return (
        <div className="form">
            <h1>Crypto Coin</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Coin</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, idx) => {
                        return <tr key={idx}>
                            <td>{user.username}</td>
                            <td>
                                {user.description}
                            </td>
                            <td>
                                {user.coin}
                            </td>
                            <td>
                                {/* <div style={{ display: 'flex', justifyContent: 'space-evenly' }} onClick={() => {
                                    user.coin = user.coin - 2;
                                    dispatch(coinTransferred(user));
                                }}>
                                    click me
                                </div> */}
                                <div style={{ display: 'flex', justifyContent: 'space-evenly' }} onClick={() => setSelectedUser(user)}>
                                    <CryptoExchangeTransfer users={users} selectedUser={selectedUser} />
                                </div>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </div>
    );
}



function CryptoExchangeTransfer({ selectedUser }) {
    const [openModal, setOpenModal] = useState(false);
    const [transferAddress, setTransferAddress] = useState("");
    const [transferChain, setTransferChain] = useState("");
    const dispatch = useDispatch();

    const handleClose = () => setOpenModal(false);
    const handleShow = () => setOpenModal(true);
    const [alertType, setAlertType] = useState({ isSuccess: false, isFailed: false, message: null });

    const transferCoin = (e) => {
        try {
            e.preventDefault();
            let user = localStorage.getItem("loggedInUser");
            if (!user) {
                // redirect to homepage
                window.location.href = "/";
            }
            if (selectedUser.coin < 2) {
                setAlertType({ isSuccess: false, message: "Coin is not enough", isFailed: true });
                setTimeout(() => {
                    setAlertType({ isSuccess: false, message: null, isFailed: false });
                    handleClose();
                }, 1000);
                return;
            }
            selectedUser.coin = selectedUser.coin - 2;
            dispatch(coinTransferred(selectedUser));
            handleClose();

        } catch (error) {
            console.error("got an error on transferCoin page", error);
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <i className="bi-currency-bitcoin"></i> Transfer
                {/* <i className="bi-coin"></i> Transfer */}
            </Button>
            <Modal show={openModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Transfer Coin</Modal.Title>
                </Modal.Header>
                {alertType.isSuccess ? <SuccessAlert msg={alertType.message} /> : null}
                {alertType.isFailed ? <ErrorAlert msg={alertType.message} /> : null}
                <Modal.Body>
                    <Form>

                        <Form.Group className="mb-3">
                            <Form.Label>Transfer Address:</Form.Label>
                            <Form.Control type="text" value={transferAddress} onChange={(e) => setTransferAddress(e.target.value)} />
                        </Form.Group>

                        <Form.Label>Coin Chain</Form.Label>
                        <Form.Select onChange={(e) => setTransferChain(e.target.value)}>
                            <option></option>
                            <option value={"BCH"}>BCH</option>
                            <option value={"BTC"}>BTC</option>
                            <option value={"ETH"}>ETH</option>
                            <option value={"LTC"}>LTC</option>
                        </Form.Select>

                        <Form.Group className="mb-3">
                            <Form.Label>Transfer Coin:</Form.Label>
                            <Form.Control type="text" required value="2" disabled />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" disabled={!transferAddress || !transferChain} onClick={transferCoin}>
                        Transfer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}




export default CryptoExchangeComponent;