// Define the API endpoint for fetching user data
const userApiUrl = 'https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users';

// Function to fetch and display all users on page load
function fetchUsers() {
    fetch(userApiUrl)
        .then(response => response.json())
        .then(data => {
            displayUsers(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

// Function to display users in the table
function displayUsers(users) {
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td><img src="${user.profilePic}" alt="Profile Pic" width="50" height="50"></td>
            <td>${user.fullName}</td>
            <td>${user.dob}</td>
            <td>${user.gender}</td>
            <td>${user.currentCity}</td>
            <td>${user.currentCountry}</td>
        `;
        userTableBody.appendChild(row);
    });
}

// Function to search for users based on input
function searchUsers() {
    const searchInput = document.getElementById('searchInput').value.trim();
    
    if (searchInput.length < 2) {
        alert('Please enter at least 2 characters for search.');
        return;
    }

    const searchUrl = `${userApiUrl}?fullName=${searchInput}`;

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            displayUsers(data);
        })
        .catch(error => {
            console.error('Error searching users:', error);
        });
}

// Function to reset the search and display all users
function resetSearch() {
    document.getElementById('searchInput').value = '';
    fetchUsers();
}

// Fetch and display users on page load
fetchUsers();
