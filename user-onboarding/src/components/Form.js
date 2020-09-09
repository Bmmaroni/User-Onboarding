import React, { useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup.string().required('Name is a required field'),
    email: yup.string('Must be a valid email address').required('Email is a required field'),
    password: yup.string().required('Must enter a Password'),
    terms: yup.boolean().oneOf([true], 'Please agree to terms of use')
});

const Form = () => {

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        terms: false
    });

    const [errorState, setErrorState] = useState({
        name: '',
        email: '',
        password: '',
        terms: false
    });

    const validate = (e) => {
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        yup
            .reach(formSchema, e.target.name)
            .validate(value)
            .then( valid => {
                setErrorState({
                    ...errorState,
                    [e.target.name]: ''
                });
            })
            .catch( err => {
                setErrorState({
                    ...errorState,
                    [e.target.name]: err.errors[0]
                });
            })
    }

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