document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const loginBtn = document.getElementById('loginBtn');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const logoutBtn = document.getElementById('logoutBtn');
    const adminBtn = document.getElementById('adminBtn');

    if (loggedInUser) {
        loginBtn.style.display = 'none';
        userNameDisplay.style.display = 'inline-block';

        // Show full name if available, else email
        const fullName = loggedInUser.firstName && loggedInUser.lastName
            ? loggedInUser.firstName + ' ' + loggedInUser.lastName
            : loggedInUser.email;
        userNameDisplay.textContent = fullName;

        logoutBtn.style.display = 'inline-block';

        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        });

        if (loggedInUser.role === 'admin') {
            adminBtn.style.display = 'inline-block';
            adminBtn.addEventListener('click', () => {
                window.location.href = 'admin.html';
            });
        }

    } else {
        loginBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }
});
