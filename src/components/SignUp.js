import React, { useEffect, useState } from 'react';
import styles from './SignUp.module.css'
import { validate } from './validate';
import { notify } from './toast';
import { Link } from 'react-router-dom';

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
        setErrors(validate(data, "signup"))
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
                confirmPassword: true,
                isAccepted: true
            })
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler} className={styles.formContainer}>
                <h2 className={styles.heading}>Sign up</h2>
                <fieldset className={styles.fieldSet}>
                    <label>Name</label>
                    <input
                        className={(touched.name && errors.nameError) ? styles.uncompleted : styles.formInput} 
                        type="text" 
                        name="name" 
                        value={data.name} 
                        onChange={changeHandler} 
                        onFocus={touchHandler}
                    />
                    {touched.name && errors.nameError && <span>{errors.nameError}</span>}
                </fieldset>
                <fieldset className={styles.fieldSet}>
                    <label>Email</label>
                    <input
                        className={(touched.email && errors.emailError) ? styles.uncompleted : styles.formInput}  
                        type="email" 
                        name="email" 
                        value={data.email} 
                        onChange={changeHandler} 
                        onFocus={touchHandler}
                    />
                    {touched.email && errors.emailError && <span>{errors.emailError}</span>}  
                </fieldset>
                <fieldset className={styles.fieldSet}>
                    <label>Password</label>
                    <input 
                        className={(touched.password && errors.passwordError) ? styles.uncompleted : styles.formInput} 
                        type="password" 
                        name="password" 
                        value={data.password} 
                        onChange={changeHandler} 
                        onFocus={touchHandler}
                    />
                    {touched.password && errors.passwordError && <span>{errors.passwordError}</span>}
                </fieldset>
                <fieldset className={styles.fieldSet}>
                    <label>Confirm Password</label>
                    <input
                        className={(touched.confirmPassword && errors.confirmPasswordError) ? styles.uncompleted : styles.formInput}  
                        type="password" 
                        name="confirmPassword" 
                        value={data.confirmPassword} 
                        onChange={changeHandler} 
                        onFocus={touchHandler}
                    />
                    {touched.confirmPassword && errors.confirmPasswordError && <span>{errors.confirmPasswordError}</span>} 
                </fieldset>
                <fieldset className={styles.fieldSet}>
                    <div className={styles.checkboxField}>
                        <label>I accept terms of privacy policy</label>
                        <input type="checkbox" name="isAccepted" value={data.isAccepted} onChange={changeHandler} onFocus={touchHandler}/>
                    </div>
                    {touched.isAccepted && errors.isAcceptedError && <span>{errors.isAcceptedError}</span>} 
                </fieldset>
                <fieldset className={styles.formButtons}>
                    <Link to="/login">Sign In</Link>
                    <button type="submit">Sign up</button>
                </fieldset>
            </form>
            <ToastContainer />
        </div>
    );
};

export default SignUp;