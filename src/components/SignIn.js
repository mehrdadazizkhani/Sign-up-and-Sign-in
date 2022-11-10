import React, { useEffect, useState } from 'react';
import styles from './SignUp.module.css'
import { validate } from './validate';
import { notify } from './toast';
import { Link } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {

    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})

    useEffect(() => {
        setErrors(validate(data, "signin"))
    }, [data, touched])

    const changeHandler = event => {
        setData({...data, [event.target.name]: event.target.value})
    }

    const touchHandler = event => {
        setTouched({...touched, [event.target.name]: true})
    }

    const submitHandler = event => {
        event.preventDefault();
        if (!Object.keys(errors).length) {
            notify("You signed in successfully", "success")
        } else {
            notify("Invalid data", "error")
            setTouched({
                email: true,
                password: true
            })
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler} className={styles.formContainer}>
                <h2 className={styles.heading}>Sign in</h2>
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
                <fieldset className={styles.formButtons}>
                    <Link to="/signup">Create account</Link>
                    <button type="submit">Sign in</button>
                </fieldset>
            </form>
            <ToastContainer />
        </div>
    );
};

export default SignIn;