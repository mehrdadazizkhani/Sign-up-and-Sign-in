import React, { useEffect, useState } from 'react';
import styles from '../components/SignUp.module.css'
import { validate } from './validate';
import { notify } from './toast';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        isAccepted: false
    })
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})

    useEffect(() => {
        setErrors(validate(data))
    }, [data, touched])

    const changeHandler = event => {
        if (event.target.name === "isAccepted") {
            setData({...data, [event.target.name]: event.target.checked})
        } else {
            setData({...data, [event.target.name]: event.target.value})
        }
    }

    const touchHandler = event => {
        setTouched({...touched, [event.target.name]: true})
    }

    const submitHandler = event => {
        event.preventDefault();
        if (!Object.keys(errors).length) {
            notify("You signed up successfully", "success")
        } else {
            notify("Invalid data", "error")
            setTouched({
                name: true,
                email: true,
                password: true,
                confirmPassword: true
            })
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <h2>SignUp</h2>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={data.name} onChange={changeHandler} onFocus={touchHandler}/>
                    {touched.name && errors.nameError && <span>{errors.nameError}</span>}
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={data.email} onChange={changeHandler} onFocus={touchHandler}/>
                    {touched.email && errors.emailError && <span>{errors.emailError}</span>}
                    
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={data.password} onChange={changeHandler} onFocus={touchHandler}/>
                    {touched.password && errors.passwordError && <span>{errors.passwordError}</span>}
                    
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type="password" name="confirmPassword" value={data.confirmPassword} onChange={changeHandler} onFocus={touchHandler}/>
                    {touched.confirmPassword && errors.confirmPasswordError && <span>{errors.confirmPasswordError}</span>}
                    
                </div>
                <div>
                    <label>I accept terms of privacy policy</label>
                    <input type="checkbox" name="isAccepted" value={data.isAccepted} onChange={changeHandler} onFocus={touchHandler}/>
                    {errors.isAcceptedError && <span>{errors.isAcceptedError}</span>}
                    
                </div>
                <div>
                    <a href="#">Login</a>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default SignUp;