import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ErrorAlert, SuccessAlert } from '../UI/Assest';

function SignupComponent() {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        address: "",
    });
    const [alertType, setAlertType] = useState({ isSuccess: false, isFailed: false, message: null });


    const signup = (e) => {
        try {
            e.preventDefault();
            let localStorageUsers = localStorage.getItem("users");
            setAlertType({ isSuccess: false, message: null, isFailed: false });
            if (!user.email) {
                setAlertType({ isSuccess: false, message: "Email is requried", isFailed: true })
            } else if (!user.password) {
                setAlertType({ isSuccess: false, message: "Password is requried", isFailed: true })
            } else if (!user.address) {
                setAlertType({ isSuccess: false, message: "Address is requried", isFailed: true })
            } else if (!user.username) {
                setAlertType({ isSuccess: false, message: "Username is requried", isFailed: true });
            } else {
                if (localStorageUsers) {
                    localStorageUsers = JSON.parse(localStorageUsers);
                } else {
                    localStorageUsers = [];
                }
                const result = localStorageUsers.find(u => u.email === user.email);
                if (result) {
                    setAlertType({ isSuccess: false, message: "Email already exist", isFailed: true });
                } else {
                    localStorageUsers.push(user);
                    localStorage.setItem("users", JSON.stringify(localStorageUsers));
                    setAlertType({ isFailed: false, message: "Account created successfully", isSuccess: true });
                    setTimeout(() => {
                        setAlertType({ isSuccess: false, message: null, isFailed: false });
                        window.location.href = "/signin";
                    }, 1500);
                }
            }
        } catch (error) {
            console.log("got an error ", error);
        }
    }

    return (
        <div className="form">
            <h1>Create a new account</h1>
            {alertType.isSuccess ? <SuccessAlert msg={alertType.message} /> : null}
            {alertType.isFailed ? <ErrorAlert msg={alertType.message} /> : null}
            <Form onSubmit={signup}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>User name</Form.Label>
                    <Form.Control data-testid="username-input" required type="text" placeholder="Enter Username" onChange={(e) => setUser({ ...user, username: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control data-testid="signup-email-input" required type="email" placeholder="Enter email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control data-testid="signup-pass-input" required type="password" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control data-testid="address-input" required type="text" placeholder="address" onChange={(e) => setUser({ ...user, address: e.target.value })} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={signup} data-testid="button">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default SignupComponent;