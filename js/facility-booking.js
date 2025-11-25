// Facility Booking functionality
let facilities = [];
let selectedFacility = null;

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Initialize facility booking
    initializeFacilityBooking();
});

// Initialize facility booking page
function initializeFacilityBooking() {
    loadFacilities();
    setupEventListeners();
}

// Load facilities data
function loadFacilities() {
    // Demo facilities data
    facilities = [
        {
            id: 1,
            name: 'Discussion Room A',
            type: 'discussion',
            status: 'available',
            capacity: '4 people',
            location: 'Library Floor 2'
        },
        {
            id: 2,
            name: 'Discussion Room B',
            type: 'discussion',
            status: 'available',
            capacity: '6 people',
            location: 'Library Floor 2'
        },
        {
            id: 3,
            name: 'Computer Lab 1',
            type: 'lab',
            status: 'occupied',
            availableIn: 20,
            capacity: '20 computers',
            location: 'Tech Building Floor 1'
        },
        {
            id: 4,
            name: 'Media Lab',
            type: 'lab',
            status: 'available',
            capacity: '8 stations',
            location: 'Arts Building Floor 3'
        },
        {
            id: 5,
            name: 'Study Room C',
            type: 'discussion',
            status: 'available',
            capacity: '8 people',
            location: 'Student Center'
        },
        {
            id: 6,
            name: 'Robotics Lab',
            type: 'lab',
            status: 'occupied',
            availableIn: 45,
            capacity: '12 stations',
            location: 'Engineering Building'
        }
    ];
    
    renderFacilities();
}

// Render facilities list
function renderFacilities(filteredFacilities = null) {
    const facilitiesList = document.getElementById('facilitiesList');
    const facilitiesToRender = filteredFacilities || facilities;
    
    if (!facilitiesList) return;
    
    facilitiesList.innerHTML = '';
    
    facilitiesToRender.forEach(facility => {
        const facilityElement = createFacilityElement(facility);
        facilitiesList.appendChild(facilityElement);
    });
}

// Create facility element
function createFacilityElement(facility) {
    const div = document.createElement('div');
    div.className = `facility-item ${facility.status}`;
    div.onclick = () => handleFacilityClick(facility);
    
    const statusText = facility.status === 'available' 
        ? 'Available' 
        : `Occupied (Unlockable in ${facility.availableIn} mins)`;
    
    const statusClass = facility.status === 'available' ? 'status-available' : 'status-occupied';
    
    div.innerHTML = `
        <div class="facility-info">
            <h3>${facility.name}</h3>
            <div class="facility-type">${facility.type === 'lab' ? 'Computer Lab' : 'Discussion Room'} • ${facility.capacity}</div>
            <div class="facility-status ${statusClass}">${statusText}</div>
            <div class="facility-capacity">${facility.location}</div>
        </div>
        ${facility.status === 'available' ? '<div class="book-indicator">→</div>' : ''}
    `;
    
    return div;
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilter);
    });
}

// Handle search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    const filteredFacilities = facilities.filter(facility => 
        facility.name.toLowerCase().includes(searchTerm) ||
        facility.type.toLowerCase().includes(searchTerm) ||
        facility.location.toLowerCase().includes(searchTerm)
    );
    
    renderFacilities(filteredFacilities);
}

// Handle filter
function handleFilter(e) {
    const filter = e.target.dataset.filter;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    let filteredFacilities = facilities;
    
    switch (filter) {
        case 'available':
            filteredFacilities = facilities.filter(f => f.status === 'available');
            break;
        case 'labs':
            filteredFacilities = facilities.filter(f => f.type === 'lab');
            break;
        case 'rooms':
            filteredFacilities = facilities.filter(f => f.type === 'discussion');
            break;
        // 'all' shows all facilities
    }
    
    renderFacilities(filteredFacilities);
}

// Handle facility click
function handleFacilityClick(facility) {
    if (facility.status !== 'available') {
        showError('This facility is currently occupied. Please check back later.');
        return;
    }
    
    selectedFacility = facility;
    showBookingModal(facility);
}

// Show booking modal
function showBookingModal(facility) {
    const modal = document.getElementById('bookingModal');
    const facilityName = document.getElementById('modalFacilityName');
    const facilityStatus = document.getElementById('modalFacilityStatus');
    
    if (modal && facilityName && facilityStatus) {
        facilityName.textContent = `Book ${facility.name}`;
        facilityStatus.textContent = `${facility.type === 'lab' ? 'Computer Lab' : 'Discussion Room'} • ${facility.capacity} • ${facility.location}`;
        modal.style.display = 'block';
    }
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Confirm booking
function confirmBooking() {
    if (!selectedFacility) return;
    
    const duration = document.getElementById('bookingDuration').value;
    
    // Simulate API call
    setTimeout(() => {
        // Update facility status
        const facilityIndex = facilities.findIndex(f => f.id === selectedFacility.id);
        if (facilityIndex !== -1) {
            facilities[facilityIndex].status = 'occupied';
            facilities[facilityIndex].availableIn = 60; // Will be available in 60 minutes
        }
        
        // Show confirmation
        showConfirmation(selectedFacility, duration);
        
        // Close booking modal
        closeModal('bookingModal');
        
        // Refresh facilities list
        renderFacilities();
    }, 1000);
}

// Show booking confirmation
function showConfirmation(facility, duration) {
    const modal = document.getElementById('confirmedModal');
    const messageElement = document.getElementById('confirmationMessage');
    
    if (modal && messageElement) {
        messageElement.textContent = `You've successfully booked ${facility.name} for ${duration} minutes. Your Smart ID will now unlock this facility.`;
        modal.style.display = 'block';
    }
}

// Show my bookings (demo function)
function showMyBookings() {
    showError('My Bookings feature is coming soon!');
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

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let modal of modals) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
}