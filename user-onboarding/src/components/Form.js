import React, { useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup.string().required('Must enter a name'),
    email: yup.string('Must be a valid email address').required('Must enter an email'),
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

    const [users, setUsers] = useState([]);

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
            .then( res => {
                console.log(res);
                setUsers(res);
            })
            .catch( err => console.log(err));
    };
    return (
        <form onSubmit={formSubmit}>
            <label htmlFor='name'>
                Name
                <input type="text" name="name" id="name" value={formState.name} onChange={inputChange} />
                {errorState.name.length > 0 ? (<p>{errorState.name}</p>) : null}
            </label>
            <label htmlFor='email'>
                Email
                <input type="email" name="email" id="email" value={formState.email} onChange={inputChange} />
                {errorState.email.length > 0 ? (<p>{errorState.email}</p>) : null}
            </label>
            <label htmlFor='password'>
                Password
                <input type="password" name="password" id="password" value={formState.password} onChange={inputChange} />
                {errorState.password.length > 0 ? (<p>{errorState.password}</p>) : null}
            </label>
            <label htmlFor='terms'>
                I have read and agree to Terms & Conditions
                <input type='checkbox' name='terms' checked={formState.terms} onChange={inputChange} />
                {errorState.terms.length > 0 ? (<p>{errorState.terms}</p>) : null}
            </label>
            <button>Submit</button>
        </form>
    )
};

export default Form