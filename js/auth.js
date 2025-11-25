// Demo user accounts
const demoAccounts = {
    'kyaw': { password: 'password123', name: 'Kyaw Tun', id: 'STU-2024-001' },
    'admin': { password: 'admin123', name: 'Admin User', role: 'admin' }
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && window.location.pathname.includes('login.html')) {
        window.location.href = 'dashboard.html';
    }

    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Admin login form handling
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', handleAdminLogin);
    }
});

// Handle student login
function handleLogin(e) {
    e.preventDefault();
    
    const studentId = document.getElementById('studentId').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    const loginBtn = document.querySelector('.login-btn');
    const btnText = loginBtn.querySelector('.btn-text');
    const btnSpinner = loginBtn.querySelector('.btn-spinner');

    // Show loading state
    btnText.style.display = 'none';
    btnSpinner.style.display = 'inline-block';
    loginBtn.disabled = true;

    // Simulate API call delay
    setTimeout(() => {
        // Check credentials against demo accounts
        if (demoAccounts[studentId] && demoAccounts[studentId].password === password) {
            const user = {
                username: studentId,
                name: demoAccounts[studentId].name,
                id: demoAccounts[studentId].id,
                role: 'student'
            };
            
            // Store user session
            if (rememberMe) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            } else {
                sessionStorage.setItem('currentUser', JSON.stringify(user));
            }
            
            showSuccess('Login successful! Redirecting...');
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
            
        } else {
            showError('Invalid student ID or password. Please try again.');
            
            // Reset loading state
            btnText.style.display = 'inline-block';
            btnSpinner.style.display = 'none';
            loginBtn.disabled = false;
        }
    }, 1500);
}

// Handle admin login
function handleAdminLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;

    // Simple admin validation
    if (email === 'admin@campus.edu' && password === 'admin123') {
        const adminUser = {
            username: 'admin',
            name: 'Administrator',
            role: 'admin'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(adminUser));
        showSuccess('Admin login successful!');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        showError('Invalid admin credentials.');
    }
}

// Show admin login modal
function showAdminLogin() {
    const modal = document.getElementById('adminModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Close admin modal
function closeAdminModal() {
    const modal = document.getElementById('adminModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Show error message
function showError(message) {
    const errorAlert = document.getElementById('errorAlert');
    if (errorAlert) {
        errorAlert.querySelector('.alert-message').textContent = message;
        errorAlert.style.display = 'flex';
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            hideError();
        }, 5000);
    }
}

// Hide error message
function hideError() {
    const errorAlert = document.getElementById('errorAlert');
    if (errorAlert) {
        errorAlert.style.display = 'none';
    }
}

// Show success message
function showSuccess(message) {
    // Create success alert if it doesn't exist
    let successAlert = document.getElementById('successAlert');
    if (!successAlert) {
        successAlert = document.createElement('div');
        successAlert.id = 'successAlert';
        successAlert.className = 'alert alert-success';
        successAlert.innerHTML = `
            <span class="alert-icon">✅</span>
            <span class="alert-message">${message}</span>
            <button class="alert-close" onclick="this.parentElement.style.display='none'">×</button>
        `;
        document.body.appendChild(successAlert);
    } else {
        successAlert.querySelector('.alert-message').textContent = message;
        successAlert.style.display = 'flex';
    }
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        successAlert.style.display = 'none';
    }, 3000);
}

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let modal of modals) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
}