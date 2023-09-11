$(document).ready(function() {
    // Check if the user is already logged in.
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        alert('You are already logged in.');
        window.location.href = './orders/orders.html'; // Redirect to orders page
    }

    // Handle login form submission
    $('#login-form').submit(function(e) {
        e.preventDefault();

        const username = $('#username').val();
        const password = $('#password').val();

        // Perform basic validation
        if (username === password) {
            // Set user session in local storage
            localStorage.setItem('loggedInUser', username);

            alert('Login Successful');
            window.location.href = './orders/orders.html'; // Redirect to orders page
        } else {
            alert('Please enter valid credentials!');
        }
    });
});
