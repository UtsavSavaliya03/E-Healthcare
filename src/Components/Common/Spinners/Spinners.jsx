import React from 'react';
import { HashLoader, PulseLoader } from 'react-spinners';

export function Spinner() {
    return (
        <HashLoader color="#8a88f9" />
    )
}

export function PulseSpinner() {
    return (
        <PulseLoader color="#8a88f9" />
    )
}