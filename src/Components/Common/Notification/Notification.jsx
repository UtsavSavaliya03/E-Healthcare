import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Notification extends Component {

    notify = (status, messsage) => {
        if (status) {
            toast.success(messsage, {
                position: "top-right",
            });
        } else {
            toast.error(messsage, {
                position: "top-right",
            });
        }
    }

    render() {
        return (
            <div><ToastContainer limit={3}/></div>
        )
    }
}