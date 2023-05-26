import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ErrorAlert, SuccessAlert } from '../UI/Assest';

function SigninComponent() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    let [loginAttempt, setLoginAttempt] = useState(0);
    const [alertType, setAlertType] = useState({ isSuccess: false, isFailed: false, message: null });


    const signin = (e) => {
        try {
            e.preventDefault();
            setLoginAttempt(++loginAttempt);
            let localStorageUsers = localStorage.getItem("users");
            setAlertType({ isSuccess: false, message: null, isFailed: false });
            if (!user.email) {
                setAlertType({ isSuccess: false, message: "Email is requried", isFailed: true })
            } else if (!user.password) {
                setAlertType({ isSuccess: false, message: "Password is requried", isFailed: true })
            } else {
                if (localStorageUsers) {
                    localStorageUsers = JSON.parse(localStorageUsers);
                } else {
                    localStorageUsers = [];
                }

                let wrongAttampt = false;
                const result = localStorageUsers.find((u, i) => {
                    if (u.email === user.email && u.password !== user.password) {
                        if (loginAttempt > 2) {
                            localStorageUsers[i].blocked = true;
                        }
                        wrongAttampt = true;
                        return true; // stop searching
                    }
                    if (u.email === user.email && u.password === user.password && !u.blocked) {
                        return true; // stop searching
                    }
                });
                if (wrongAttampt && loginAttempt > 2) {
                    localStorage.setItem("users", JSON.stringify(localStorageUsers));
                    setAlertType({ isSuccess: false, message: `${result.username} is blocked, You have attempted many time wrong password`, isFailed: true });
                    return;
                }
                if (result && !wrongAttampt) {
                    localStorage.setItem("loggedInUser", JSON.stringify(result));
                    setAlertType({ isFailed: false, message: "Loggedin successfully", isSuccess: true });
                    setTimeout(() => {
                        setAlertType({ isSuccess: false, message: null, isFailed: false });
                        window.location.href = "/";
                    }, 1500);
                } else {
                    setAlertType({ isSuccess: false, message: "Invalid Credentials", isFailed: true });
                }
            }
        } catch (error) {
            console.log("got an error on login page", error);
        }
    }

    return (
        <div className="form">
            <h1>Sign in</h1>
            {alertType.isSuccess ? <SuccessAlert msg={alertType.message} /> : null}
            {alertType.isFailed ? <ErrorAlert msg={alertType.message} /> : null}
            <Form onSubmit={signin}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={signin}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default SigninComponent;