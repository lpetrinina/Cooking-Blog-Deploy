
export const useValidateLoginForm = () => {

    const validateEmail = (email) => {

        if (!email.trim()) {
            return 'Email is required';

        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            return 'Email is invalid';
        }

        return null
    }

    const validatePassword = (pass) => {

        if (!pass) {
            return 'Password is required';

        } else if (pass.length < 5) {
            return 'Password should be at least 5 characters long';
        }

        return null
    }

    return {
        validateEmail,
        validatePassword
    }
}

export const useValidateSignUpForm = () => {

    const validateUsername = (username) => {

        if (!username.trim()) {
            return 'Username is required';

        } else if (username.length < 3) {
            return 'Username should be at least 3 characters long';
        }
        return null
    }

    const validateEmail = (email) => {

        if (!email.trim()) {
            return 'Email is required';

        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            return 'Email is invalid';
        }

        return null
    }

    const validatePassword = (pass) => {

        if (!pass) {
            return 'Password is required';

        } else if (pass.length < 5) {
            return 'Password should be at least 5 characters long';
        }

        return null
    }

    const validateConfirmPassword = (pass, confirmPass) => {
        if (pass !== confirmPass) {
            return 'Passwords do not match'
        }
    }

    return {
        validateUsername,
        validateEmail,
        validatePassword,
        validateConfirmPassword
    }
} 