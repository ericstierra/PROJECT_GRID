// Login Form Validation
const form = document.querySelector('#login-form');
const liveToast = document.querySelector('#liveToast');
const toastBootstrap = new bootstrap.Toast(liveToast);
const errorMessage = liveToast.querySelector('.toast-body');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    //remove whitespace from inputs
    const username = form.querySelector('#username').value.trim();
    const password = form.querySelector('#password').value.trim();

    //check if inputs selected are valid
    const patterns = {
        username: /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, //simple email regex
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_=+\\\[\]{};:'",.<>\/?]).{8,}$/ //min 8 chars, at least one uppercase, one lowercase, one number and one special character
    };

    if (username === '' || password === '') {
        errorMessage.textContent = 'Please fill in all fields.';
        toastBootstrap.show();
        //alert('Please fill in all fields.');
        return;
    }

    if (!patterns.username.test(username)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        toastBootstrap.show();
        //alert('Please enter a valid email address.');
        return;
    }

    if (!patterns.password.test(password)) {
        errorMessage.textContent = 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.';
        toastBootstrap.show();
        //alert('Please enter a valid password.');
        return;
    }

    //alert('Login successful!');

    errorMessage.textContent = 'Login successful!';
    toastBootstrap.show();

    setTimeout(() => {
        window.location.href = 'app.html';
    }, 1500);

    //for demo, just log to console
    console.log('Username:', patterns.username.test(username) ? 'Valid' : 'Invalid');
    console.log('Password:', password);

});