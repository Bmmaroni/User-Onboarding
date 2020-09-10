import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup.string().required('Must enter a name'),
    email: yup.string().email('Must be a valid email address').required('Must enter an email'),
    password: yup.string().required('Must enter a Password'),
    terms: yup.boolean().oneOf([true], 'Please agree to terms of use')
});

export default function Form() {

    const [buttonDisabled, setButtonDisabled] = useState(true);

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
        terms: ''
    });

    const [users, setUsers] = useState([]);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState])

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
        let value = e.target.type === 'checked' ? e.target.checked : e.target.value;
        setFormState({...formState, [e.target.name]: value});
    };

    const formSubmit = (e) => {
        e.preventDefault();
        console.log('form submitted');
        axios
            .post("https://reqres.in/api/users", formState)
            .then( res => {
                console.log(res);
                setUsers([...users, res.data]);
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
                <input type='checkbox' id='terms' name='terms' checked={formState.terms} onChange={inputChange} />
                I have read and agree to Terms and Conditions
                {errorState.terms.length > 0 ? (<p>{errorState.terms}</p>) : null}
            </label>
            <button disabled={buttonDisabled}>Submit</button>
            <pre>{JSON.stringify(users, null, 2)}</pre>
        </form>
       
    )
}