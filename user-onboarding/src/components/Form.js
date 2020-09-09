import React, { useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    name: '',
    email: '',
    password: '',
    terms: false
})

const Form = () => {

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        terms: false
    });

    return (
        <form>
            <label>
                Name
                <input type="text" name="name" id="name" ></input>
            </label>
            <label>
                Email
                <input type="text" name="email" id="email" ></input>
            </label>
            <label>
                Password
                <input type="text" name="password" id="password" ></input>
            </label>
            <label>
                I have read and agree to Terms & Conditions
                <input type='checkbox' name='terms'></input>
            </label>
            <button>Submit</button>
        </form>
    )
};

export default Form