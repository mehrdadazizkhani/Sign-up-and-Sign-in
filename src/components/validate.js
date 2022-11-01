export const validate = data => {
    const errors = {};
    
    if (!data.name.trim()) {
        errors.nameError = "Username required"
    } else {
        delete errors.nameError
    }

    if (!data.email) {
        errors.emailErrors = "Email required"
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.emailErrors = "Email address is invalid"
    } else {
        delete errors.emailErrors
    }

    if (!data.password) {
        errors.passwordError = "Password is required"
    } else if (data.password.lenghts < 6) {
        errors.passwordError = "Password needs to be 6 character or more"
    } else {
        delete errors.passwordError
    }

    if (!data.confirmPassword) {
        errors.confirmPasswordError = "Confirm password"
    } else if (data.confirmPassword !== data.password) {
        errors.confirmPasswordError = "Paasword do not match"
    } else {
        delete errors.confirmPasswordError
    }

    if (data.isAccepted) {
        delete errors.isAcceptedError
    } else {
        errors.isAcceptedError = "Accept our regulations"
    }

    return errors
}