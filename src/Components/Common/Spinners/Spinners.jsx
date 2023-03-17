import React from 'react';
import { HashLoader, PulseLoader } from 'react-spinners';

export function Spinner() {
    return (
        <HashLoader color="#0b8fdc" />
    )
}

export function PulseSpinner() {
    return (
        <PulseLoader color="#0b8fdc" />
    )
}