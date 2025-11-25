// Digital Smart ID functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Initialize digital ID
    initializeDigitalID();
});

// Initialize digital ID with dynamic QR code
function initializeDigitalID() {
    let timer = 60;
    const qrTimerElement = document.getElementById('qrTimer');
    const qrDataElement = document.getElementById('qrData');
    
    // Generate initial QR code
    generateQRCode();
    
    // Update timer every second
    const timerInterval = setInterval(() => {
        timer--;
        if (qrTimerElement) {
            qrTimerElement.textContent = `Refreshes in: ${timer}s`;
        }
        
        if (timer <= 0) {
            timer = 60;
            generateQRCode();
        }
    }, 1000);
    
    // Generate new QR code every 60 seconds
    setInterval(() => {
        generateQRCode();
    }, 60000);
}

// Generate a new QR code (simulated)
function generateQRCode() {
    const qrDataElement = document.getElementById('qrData');
    
    if (qrDataElement) {
        // Generate a random code (in real app, this would be a secure token from backend)
        const randomCode = generateSecureCode();
        qrDataElement.textContent = `ID: ${randomCode}`;
        
        console.log('New QR Code Generated:', randomCode);
    }
}

// Generate a secure random code
function generateSecureCode() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return btoa(`${timestamp}-${random}`).substring(0, 20);
}

// Handle NFC tap simulation (for demo purposes)
document.addEventListener('click', function(e) {
    if (e.target.closest('.digital-id-container')) {
        simulateNFCTap();
    }
});

function simulateNFCTap() {
    console.log('NFC Tap simulated - Access granted');
    // In a real app, this would trigger the actual NFC functionality
}