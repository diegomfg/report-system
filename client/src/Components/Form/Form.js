import React from 'react';
import { useEffect } from "react";
import { Alert } from "react-bootstrap";


const Form = (props) => {

    useEffect(() => {

        var elements = document.querySelectorAll('.Form-title');

        elements.forEach((element) => {
            return element.innerHTML.toLowerCase() === "login" ?
                element.classList.add("login") :
                element.classList.add("register");
        })

    }, [props.title]);

    return (
        <React.Fragment>
            <form className="Form">
                <h3 className="Form-title">{props.title}</h3>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" required />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" required />

                <button type="submit" onClick={() => { props.handleForm() }}>{props.title}</button>

            </form>
        </React.Fragment>
    )

}

export default Form;