export const validatePassword = (password: string) => {
    if (!password) {
        return { isValid: false, message: 'Password cannot be empty' };
    }
    if (password.length < 6) {
        return { isValid: false, message: 'Password must be at least 6 characters' };
    }
    return { isValid: true, message: 'Password is valid' };
};
