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
    };

    const inputChange = (e) => {
        e.persist();
        validate(e);
        let value = 
            e.target.type === 'checked' ? e.target.checked : e.target.value;
        setFormState({...formState, [e.target.name]: e.target.value});
    };

    const formSubmit = (e) => {
        e.preventDefault();
        console.log('form submitted');
        axios
            .post("https://reqres.in/api/users", formState)
            .then( res => console.log(res))
            .catch( err => console.log(err));
    };
    return (
        <form onSubmit={formSubmit}>
            <label htmlFor='name'>
                Name
                <input type="text" name="name" id="name" value={formState.name} onChange={inputChange} />
            </label>
            <label htmlFor='email'>
                Email
                <input type="email" name="email" id="email" value={formState.email} onChange={inputChange} />
            </label>
            <label htmlFor='password'>
                Password
                <input type="password" name="password" id="password" value={formState.password} onChange={inputChange} />
            </label>
            <label htmlFor='terms'>
                I have read and agree to Terms & Conditions
                <input type='checkbox' name='terms' checked={formState.terms} onChange={inputChange} />
            </label>
            <button>Submit</button>
        </form>
    )
};

export default Form