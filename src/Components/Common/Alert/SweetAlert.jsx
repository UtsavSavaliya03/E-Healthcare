import { Component } from 'react';
import Swal from 'sweetalert2';

export default class Notification extends Component {
    alert = (icon, title, text, footer) => {
        Swal.fire(
            {
                icon: icon,
                title: title,
                text: text,
                footer: footer
            },
            setTimeout(() => {
                Swal.close()
            }, 1500)
        )
    }
}