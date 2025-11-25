// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Update user info in dashboard
    updateUserInfo(currentUser);

    // Initialize dashboard features
    initializeDashboard();
});

// Update user information in the dashboard
function updateUserInfo(user) {
    const userNameElement = document.getElementById('userName');
    const profileNameElement = document.getElementById('profileName');
    
    if (userNameElement) {
        userNameElement.textContent = user.name.split(' ')[0]; // First name only
    }
    
    if (profileNameElement) {
        profileNameElement.textContent = user.name;
    }
}

// Initialize dashboard features
function initializeDashboard() {
    console.log('Dashboard initialized');
    
    // Add any dashboard-specific initialization here
}

// Navigation functions
function navigateToDigitalID() {
    window.location.href = 'digital-id.html';
}

function navigateToFacilityBooking() {
    window.location.href = 'facility-booking.html';
}

function showComingSoon(featureName) {
    const modal = document.getElementById('comingSoonModal');
    const messageElement = document.getElementById('comingSoonMessage');
    
    if (modal && messageElement) {
        messageElement.textContent = `${featureName} is currently under development and will be available soon.`;
        modal.style.display = 'block';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

function hideAlert(alertId) {
    const alert = document.getElementById(alertId);
    if (alert) {
        alert.style.display = 'none';
    }
}

function logout() {
    // Clear user session
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    
    // Redirect to login page
    window.location.href = 'login.html';
}

// Show success message
function showSuccess(message) {
    const successAlert = document.getElementById('successAlert');
    if (successAlert) {
        successAlert.querySelector('.alert-message').textContent = message;
        successAlert.style.display = 'flex';
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            successAlert.style.display = 'none';
        }, 3000);
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
            errorAlert.style.display = 'none';
        }, 5000);
    }
}