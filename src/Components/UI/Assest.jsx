import React from "react";
import Alert from 'react-bootstrap/Alert';

export function CustomAlert({ variant, msg }) {
    return <Alert key={variant} variant={variant}> {msg} </Alert>
}

export function ErrorAlert({ msg }) {
    return <Alert key={'danger'} variant={'danger'}> {msg} </Alert>
}

export function SuccessAlert({ msg }) {
    return <Alert key={'success'} variant={'success'}> {msg} </Alert>
}