export const validate = (data, type) => {
    const errors = {};

    if (!data.email) {
        errors.emailError = "Email required"
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.emailError = "Email address is invalid"
    } else {
        delete errors.emailError
    }

    if (!data.password) {
        errors.passwordError = "Password is required"
    } else if (data.password.length < 6) {
        errors.passwordError = "Password needs to be 6 character or more"
    } else {
        delete errors.passwordError
    }


    if (type === "signup") {
        
        if (!data.name.trim()) {
            errors.nameError = "Username required"
        } else {
            delete errors.nameError
        }
        
        if (!data.confirmPassword) {
            errors.confirmPasswordError = "Confirm password"
        } else if (data.confirmPassword !== data.password) {
            errors.confirmPasswordError = "Password do not match"
        } else {
            delete errors.confirmPasswordError
        }

        if (data.isAccepted) {
            delete errors.isAcceptedError
        } else {
            errors.isAcceptedError = "Accept our regulations"
        }
    }

    return errors
}