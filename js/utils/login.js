    import { user_data } from "../../data/users_data.js";
    import { validateFields, validate } from "../utils/validators.js";
    import { loginPatterns } from "../utils/patterns.js";

    const timeout = 30 * 60 * 1000; // 30 minutes

    document.addEventListener('DOMContentLoaded', () => {
        const form = document.querySelector('#login-form');
        const rememberCbx = document.querySelector('#remember');    
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = form.querySelector('#email');
            const password = form.querySelector('#password');

            const errors = validate(form, loginPatterns);

            if (errors && errors.length > 0) {
                const errorMessage = errors.join('<br>');
                showError(errorMessage);
            } else {
                let isAuthenticated = false;
                let authUser = null
                user_data.forEach(user => {
                    if (user.email === email.value && user.password === password.value) {
                        isAuthenticated = true;
                        authUser = user;
                        console.log('Authenticated User:', authUser);
                        return;
                    }
                });

                if (isAuthenticated) {
                    Swal.fire({
                        title: "User Management System",
                        text: "Logged in successfully!",
                        icon: "success"
                    });

                    const sessionUser = {
                        user: authUser,
                        loginTime: new Date().toISOString(),
                        isRemember: rememberCbx.checked
                    }

                    if (authUser && authUser != null) {
                        const sessionUserJSON = JSON.stringify(sessionUser);
                        localStorage.setItem('sessionUser', sessionUserJSON);
                        localStorage.setItem('sessionTimeout', Date.now() + timeout);

                        setTimeout(() => {
                            window.location.href = "./app.html";
                        }, 2000);
                    } else {
                        showError('Error storing session data.');
                    }
                } else {
                    showError('Invalid email or password. Please try again.');
                }
            }

        });

        const showError = (message) => {
            Swal.fire({
                icon: 'error',
                title: 'User Management System',
                html: message,
            });
        };

    });