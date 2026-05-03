// Initialize data in localStorage
function initializeData() {
    // Initialize global data (shared across all users)
    if (!localStorage.getItem('users')) {
        const defaultUsers = [
            { email: 'admin@gmail.com', password: 'admin123', name: 'Administrator', role: 'admin' },
            { email: 'staff@gmail.com', password: 'staff123', name: 'Staff User', role: 'staff' },
            { email: 'user@gmail.com', password: 'user123', name: 'Regular User', role: 'user' },
            { email: 'student1@gmail.com', password: 'user123', name: 'John Smith', role: 'user' },
            { email: 'student2@gmail.com', password: 'user123', name: 'Jane Doe', role: 'user' }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }

    if (!localStorage.getItem('equipment')) {
        const defaultEquipment = [
            { id: 1, name: 'Microscope', category: 'Biology', quantity: 10, available: 7 },
            { id: 2, name: 'Beaker Set', category: 'Chemistry', quantity: 50, available: 45 },
            { id: 3, name: 'Test Tubes', category: 'Chemistry', quantity: 100, available: 90 },
            { id: 4, name: 'Bunsen Burner', category: 'Chemistry', quantity: 20, available: 18 },
            { id: 5, name: 'Digital Scale', category: 'Physics', quantity: 15, available: 12 },
            { id: 6, name: 'Thermometer', category: 'General', quantity: 30, available: 28 },
            { id: 7, name: 'Petri Dish', category: 'Biology', quantity: 200, available: 195 },
            { id: 8, name: 'Pipette', category: 'Chemistry', quantity: 75, available: 70 },
            { id: 9, name: 'Spectrophotometer', category: 'Chemistry', quantity: 5, available: 3 },
            { id: 10, name: 'Centrifuge', category: 'Biology', quantity: 8, available: 6 },
            { id: 11, name: 'Oscilloscope', category: 'Physics', quantity: 12, available: 10 },
            { id: 12, name: 'Safety Goggles', category: 'Safety', quantity: 100, available: 95 }
        ];
        localStorage.setItem('equipment', JSON.stringify(defaultEquipment));
    }

    // Initialize user-specific data for each user
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);
    const twoWeeksAgo = new Date(today);
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    const threeDaysAgo = new Date(today);
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const dueDateNextWeek = new Date(today);
    dueDateNextWeek.setDate(dueDateNextWeek.getDate() + 7);
    const dueDateYesterday = new Date(today);
    dueDateYesterday.setDate(dueDateYesterday.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    users.forEach(user => {
        // Initialize user-specific requests
        if (!localStorage.getItem(`requests_${user.email}`)) {
            let userRequests = [];
            if (user.email === 'user@gmail.com') {
                userRequests = [
                    { id: 1, userEmail: 'user@gmail.com', equipmentId: 1, quantity: 2, requestDate: today.toISOString(), duration: 7, status: 'pending' },
                    { id: 2, userEmail: 'user@gmail.com', equipmentId: 9, quantity: 1, requestDate: yesterday.toISOString(), duration: 10, status: 'rejected' }
                ];
            } else if (user.email === 'student1@gmail.com') {
                userRequests = [
                    { id: 1, userEmail: 'student1@gmail.com', equipmentId: 3, quantity: 10, requestDate: yesterday.toISOString(), duration: 5, status: 'pending' }
                ];
            } else if (user.email === 'student2@gmail.com') {
                userRequests = [
                    { id: 1, userEmail: 'student2@gmail.com', equipmentId: 5, quantity: 1, requestDate: yesterday.toISOString(), duration: 3, status: 'approved' }
                ];
            }
            localStorage.setItem(`requests_${user.email}`, JSON.stringify(userRequests));
        }

        // Initialize user-specific borrowings
        if (!localStorage.getItem(`borrowings_${user.email}`)) {
            let userBorrowings = [];
            if (user.email === 'student2@gmail.com') {
                userBorrowings = [
                    { id: 1, requestId: 1, userEmail: 'student2@gmail.com', equipmentId: 5, quantity: 1, borrowDate: threeDaysAgo.toISOString(), dueDate: dueDateNextWeek.toISOString(), returnDate: null, status: 'borrowed' }
                ];
            } else if (user.email === 'student1@gmail.com') {
                userBorrowings = [
                    { id: 1, requestId: null, userEmail: 'student1@gmail.com', equipmentId: 1, quantity: 3, borrowDate: lastWeek.toISOString(), dueDate: dueDateYesterday.toISOString(), returnDate: null, status: 'borrowed' },
                    { id: 2, requestId: null, userEmail: 'student1@gmail.com', equipmentId: 4, quantity: 2, borrowDate: lastWeek.toISOString(), dueDate: threeDaysAgo.toISOString(), returnDate: threeDaysAgo.toISOString(), status: 'returned' }
                ];
            } else if (user.email === 'user@gmail.com') {
                userBorrowings = [
                    { id: 1, requestId: null, userEmail: 'user@gmail.com', equipmentId: 2, quantity: 5, borrowDate: twoWeeksAgo.toISOString(), dueDate: lastWeek.toISOString(), returnDate: lastWeek.toISOString(), status: 'returned' }
                ];
            }
            localStorage.setItem(`borrowings_${user.email}`, JSON.stringify(userBorrowings));
        }

        // Initialize user-specific logs
        if (!localStorage.getItem(`logs_${user.email}`)) {
            let userLogs = [
                { dateTime: today.toLocaleString(), user: user.email, action: 'Login', details: `User ${user.email} logged in` }
            ];
            
            if (user.email === 'admin@gmail.com') {
                userLogs = [
                    { dateTime: today.toLocaleString(), user: 'admin@gmail.com', action: 'Add Equipment', details: 'Added new equipment: Safety Goggles' },
                    { dateTime: twoDaysAgo.toLocaleString(), user: 'admin@gmail.com', action: 'Add User', details: 'Added new user: student1@gmail.com' },
                    { dateTime: twoDaysAgo.toLocaleString(), user: 'admin@gmail.com', action: 'Login', details: 'User admin@gmail.com logged in' }
                ];
            } else if (user.email === 'staff@gmail.com') {
                userLogs = [
                    { dateTime: yesterday.toLocaleString(), user: 'staff@gmail.com', action: 'Approve Request', details: 'Approved request for 1x Digital Scale' },
                    { dateTime: twoDaysAgo.toLocaleString(), user: 'staff@gmail.com', action: 'Reject Request', details: 'Rejected request for 1x Spectrophotometer' },
                    { dateTime: twoDaysAgo.toLocaleString(), user: 'staff@gmail.com', action: 'Login', details: 'User staff@gmail.com logged in' }
                ];
            } else if (user.email === 'user@gmail.com') {
                userLogs = [
                    { dateTime: twoDaysAgo.toLocaleString(), user: 'user@gmail.com', action: 'Return Equipment', details: 'Returned 5x Beaker Set' },
                    { dateTime: twoDaysAgo.toLocaleString(), user: 'user@gmail.com', action: 'Login', details: 'User user@gmail.com logged in' }
                ];
            }
            
            localStorage.setItem(`logs_${user.email}`, JSON.stringify(userLogs));
        }
    });
}

// Initialize user session data
function initializeUserSession(userEmail) {
    if (!localStorage.getItem(`requests_${userEmail}`)) {
        localStorage.setItem(`requests_${userEmail}`, JSON.stringify([]));
    }
    if (!localStorage.getItem(`borrowings_${userEmail}`)) {
        localStorage.setItem(`borrowings_${userEmail}`, JSON.stringify([]));
    }
    if (!localStorage.getItem(`logs_${userEmail}`)) {
        localStorage.setItem(`logs_${userEmail}`, JSON.stringify([]));
    }
}

// Get data from localStorage (supports user-specific keys)
function getData(key, userEmail = null) {
    if (userEmail && ['requests', 'borrowings', 'logs'].includes(key)) {
        return JSON.parse(localStorage.getItem(`${key}_${userEmail}`)) || [];
    }
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Save data to localStorage (supports user-specific keys)
function saveData(key, data, userEmail = null) {
    if (userEmail && ['requests', 'borrowings', 'logs'].includes(key)) {
        localStorage.setItem(`${key}_${userEmail}`, JSON.stringify(data));
    } else {
        localStorage.setItem(key, JSON.stringify(data));
    }
}

// Add activity log (user-specific)
function addLog(action, details) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    const logs = getData('logs', currentUser.email);
    logs.unshift({
        dateTime: new Date().toLocaleString(),
        user: currentUser.email,
        action: action,
        details: details
    });
    saveData('logs', logs, currentUser.email);
}

// Authentication
let currentUser = null;

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const users = getData('users');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        initializeUserSession(user.email);
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        document.getElementById('userRole').textContent = user.role;
        addLog('Login', `User ${user.email} logged in`);
        setupRoleBasedUI();
        loadDashboard();
    } else {
        document.getElementById('loginError').textContent = 'Invalid email or password';
    }
});

document.getElementById('logoutBtn').addEventListener('click', function() {
    addLog('Logout', `User ${currentUser.email} logged out`);
    currentUser = null;
    localStorage.removeItem('currentUser');
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
    document.getElementById('loginForm').reset();
    document.getElementById('loginError').textContent = '';
});

// Check if user is already logged in
function checkLoginStatus() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        document.getElementById('userRole').textContent = currentUser.role;
        setupRoleBasedUI();
        loadDashboard();
    }
}

// Setup role-based UI
function setupRoleBasedUI() {
    const role = currentUser.role;
    
    // Hide all navigation menus
    document.getElementById('adminNav').classList.add('hidden');
    document.getElementById('staffNav').classList.add('hidden');
    document.getElementById('userNav').classList.add('hidden');
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    
    // Show the appropriate navigation menu and section based on role
    setTimeout(() => {
        if (role === 'admin') {
            document.getElementById('adminNav').classList.remove('hidden');
            document.getElementById('admin-homeSection').classList.add('active');
            document.querySelector('#adminNav .nav-btn').classList.add('active');
        } else if (role === 'staff') {
            document.getElementById('staffNav').classList.remove('hidden');
            document.getElementById('staff-homeSection').classList.add('active');
            document.querySelector('#staffNav .nav-btn').classList.add('active');
        } else {
            document.getElementById('userNav').classList.remove('hidden');
            document.getElementById('user-homeSection').classList.add('active');
            const userHomeBtn = document.querySelector('#userNav .nav-btn[data-section="user-home"]');
            if (userHomeBtn) {
                userHomeBtn.classList.add('active');
            }
        }
    }, 100);
    
    // Hide all role-specific elements
    document.querySelectorAll('.admin-only, .staff-only, .user-only, .admin-staff-only').forEach(el => {
        el.style.display = 'none';
    });
    
    // Show based on role
    if (role === 'admin') {
        document.querySelectorAll('.admin-only, .admin-staff-only').forEach(el => {
            el.style.display = 'block';
        });
    } else if (role === 'staff') {
        document.querySelectorAll('.staff-only, .admin-staff-only').forEach(el => {
            el.style.display = 'block';
        });
    } else {
        document.querySelectorAll('.user-only').forEach(el => {
            el.style.display = 'block';
        });
    }
}

// Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        const sectionId = this.dataset.section + 'Section';
        document.getElementById(sectionId).classList.add('active');
        
        loadSection(sectionId);
    });
});

// Add event listener for newRequestBtn2 (in My Requests section)
document.getElementById('newRequestBtn2').addEventListener('click', function() {
    document.getElementById('newRequestBtn').click();
});

// Load section data
function loadSection(sectionId) {
    switch(sectionId) {
        case 'admin-homeSection':
            loadAdminDashboard();
            break;
        case 'staff-homeSection':
            loadStaffDashboard();
            break;
        case 'user-homeSection':
            loadUserDashboard();
            break;
        case 'homeSection':
            loadStats();
            break;
        case 'inventorySection':
            loadInventory();
            break;
        case 'requestsSection':
            loadRequests();
            break;
        case 'myBorrowingsSection':
            loadMyBorrowings();
            break;
        case 'logsSection':
            loadLogs();
            break;
        case 'usersSection':
            loadUsers();
            break;
        case 'all-requestsSection':
            loadAllRequests();
            break;
        case 'all-borrowingsSection':
            loadAllBorrowings();
            break;
        case 'pending-requestsSection':
            loadPendingRequests();
            break;
        case 'approved-requestsSection':
            loadApprovedRequests();
            break;
        case 'my-requestsSection':
            loadMyRequests();
            break;
        case 'admin-logsSection':
            loadAdminLogs();
            break;
        case 'staff-logsSection':
            loadStaffLogs();
            break;
        case 'user-logsSection':
            loadUserLogs();
            break;
        case 'reportsSection':
            // Reports are generated on button click
            break;
    }
}

// Load dashboard based on role
function loadDashboard() {
    const role = currentUser.role;
    if (role === 'admin') {
        loadAdminDashboard();
    } else if (role === 'staff') {
        loadStaffDashboard();
    } else {
        loadUserDashboard();
    }
}

// Load statistics
function loadStats() {
    const equipment = getData('equipment');
    const requests = getData('requests', currentUser ? currentUser.email : null);
    
    const total = equipment.reduce((sum, eq) => sum + eq.quantity, 0);
    const available = equipment.reduce((sum, eq) => sum + eq.available, 0);
    const borrowed = total - available;
    const pending = requests.filter(r => r.status === 'pending').length;
    
    document.getElementById('totalEquipment').textContent = total;
    document.getElementById('availableEquipment').textContent = available;
    document.getElementById('borrowedEquipment').textContent = borrowed;
    document.getElementById('pendingRequests').textContent = pending;
}

// Load admin dashboard
function loadAdminDashboard() {
    const equipment = getData('equipment');
    const users = getData('users');
    
    // Calculate total active borrowings across all users
    let totalActiveBorrowings = 0;
    let totalPendingRequests = 0;
    users.forEach(user => {
        const userBorrowings = getData('borrowings', user.email);
        totalActiveBorrowings += userBorrowings.filter(b => b.status === 'borrowed').length;
        
        const userRequests = getData('requests', user.email);
        totalPendingRequests += userRequests.filter(r => r.status === 'pending').length;
    });
    
    const totalEquipment = equipment.reduce((sum, eq) => sum + eq.quantity, 0);
    
    document.getElementById('adminTotalEquipment').textContent = totalEquipment;
    document.getElementById('adminTotalUsers').textContent = users.length;
    document.getElementById('adminPendingRequests').textContent = totalPendingRequests;
    document.getElementById('adminActiveBorrowings').textContent = totalActiveBorrowings;
}

// Load staff dashboard
function loadStaffDashboard() {
    const equipment = getData('equipment');
    
    // Calculate total active borrowings across all users
    const users = getData('users');
    let totalActiveBorrowings = 0;
    let totalPendingRequests = 0;
    users.forEach(user => {
        const userBorrowings = getData('borrowings', user.email);
        totalActiveBorrowings += userBorrowings.filter(b => b.status === 'borrowed').length;
        
        const userRequests = getData('requests', user.email);
        totalPendingRequests += userRequests.filter(r => r.status === 'pending').length;
    });
    
    const totalEquipment = equipment.reduce((sum, eq) => sum + eq.quantity, 0);
    const available = equipment.reduce((sum, eq) => sum + eq.available, 0);
    
    document.getElementById('staffTotalEquipment').textContent = totalEquipment;
    document.getElementById('staffAvailableEquipment').textContent = available;
    document.getElementById('staffPendingRequests').textContent = totalPendingRequests;
    document.getElementById('staffActiveBorrowings').textContent = totalActiveBorrowings;
}

// Load user dashboard
function loadUserDashboard() {
    const equipment = getData('equipment');
    const borrowings = getData('borrowings', currentUser.email);
    const requests = getData('requests', currentUser.email);
    
    const activeBorrowings = borrowings.filter(b => b.status === 'borrowed').length;
    const pendingRequests = requests.filter(r => r.status === 'pending').length;
    const returnedItems = borrowings.filter(b => b.status === 'returned').length;
    const availableEquipment = equipment.reduce((sum, eq) => sum + eq.available, 0);
    
    document.getElementById('userActiveBorrowings').textContent = activeBorrowings;
    document.getElementById('userPendingRequests').textContent = pendingRequests;
    document.getElementById('userReturnedItems').textContent = returnedItems;
    document.getElementById('userAvailableEquipment').textContent = availableEquipment;
}

// Load inventory
function loadInventory() {
    const equipment = getData('equipment');
    const tbody = document.getElementById('inventoryBody');
    tbody.innerHTML = '';
    
    equipment.forEach(eq => {
        const row = document.createElement('tr');
        const status = eq.available === eq.quantity ? 'available' : 'borrowed';
        row.innerHTML = `
            <td>${eq.id}</td>
            <td>${eq.name}</td>
            <td>${eq.category}</td>
            <td>${eq.quantity}</td>
            <td><span class="status status-${status}">${status}</span></td>
            <td class="admin-staff-only">
                <button class="btn btn-small btn-primary" onclick="editEquipment(${eq.id})">Edit</button>
                <button class="btn btn-small btn-danger" onclick="deleteEquipment(${eq.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    setupRoleBasedUI();
}

// Add Equipment Modal
document.getElementById('addEquipmentBtn').addEventListener('click', function() {
    document.getElementById('equipmentModalTitle').textContent = 'Add Equipment';
    document.getElementById('equipmentForm').reset();
    document.getElementById('equipmentId').value = '';
    document.getElementById('equipmentModal').classList.remove('hidden');
});

document.getElementById('equipmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('equipmentId').value;
    const name = document.getElementById('equipmentName').value;
    const category = document.getElementById('equipmentCategory').value;
    const quantity = parseInt(document.getElementById('equipmentQuantity').value);
    
    const equipment = getData('equipment');
    
    if (id) {
        // Edit existing equipment
        const index = equipment.findIndex(eq => eq.id === parseInt(id));
        if (index !== -1) {
            const borrowed = equipment[index].quantity - equipment[index].available;
            equipment[index] = {
                ...equipment[index],
                name,
                category,
                quantity,
                available: quantity - borrowed
            };
            addLog('Update Equipment', `Updated equipment: ${name}`);
        }
    } else {
        // Add new equipment
        const newId = equipment.length > 0 ? Math.max(...equipment.map(eq => eq.id)) + 1 : 1;
        equipment.push({
            id: newId,
            name,
            category,
            quantity,
            available: quantity
        });
        addLog('Add Equipment', `Added new equipment: ${name}`);
    }
    
    saveData('equipment', equipment);
    closeModal('equipmentModal');
    loadInventory();
    loadStats();
});

function editEquipment(id) {
    const equipment = getData('equipment');
    const eq = equipment.find(e => e.id === id);
    
    if (eq) {
        document.getElementById('equipmentModalTitle').textContent = 'Edit Equipment';
        document.getElementById('equipmentId').value = eq.id;
        document.getElementById('equipmentName').value = eq.name;
        document.getElementById('equipmentCategory').value = eq.category;
        document.getElementById('equipmentQuantity').value = eq.quantity;
        document.getElementById('equipmentModal').classList.remove('hidden');
    }
}

function deleteEquipment(id) {
    if (confirm('Are you sure you want to delete this equipment?')) {
        const equipment = getData('equipment');
        const eq = equipment.find(e => e.id === id);
        equipment = equipment.filter(e => e.id !== id);
        saveData('equipment', equipment);
        addLog('Delete Equipment', `Deleted equipment: ${eq ? eq.name : id}`);
        loadInventory();
        loadStats();
    }
}

// Load borrowing requests
function loadRequests() {
    const requests = getData('requests', currentUser.email);
    const users = getData('users');
    const equipment = getData('equipment');
    const tbody = document.getElementById('requestsBody');
    tbody.innerHTML = '';
    
    // Admin and staff can see all requests from all users
    let allRequests = requests;
    if (currentUser.role === 'admin' || currentUser.role === 'staff') {
        allRequests = [];
        const allUsers = getData('users');
        allUsers.forEach(user => {
            const userRequests = getData('requests', user.email);
            allRequests = allRequests.concat(userRequests);
        });
    }
    
    allRequests.forEach(req => {
        const user = users.find(u => u.email === req.userEmail);
        const eq = equipment.find(e => e.id === req.equipmentId);
        const row = document.createElement('tr');
        
        let actions = '';
        if (req.status === 'pending' && (currentUser.role === 'admin' || currentUser.role === 'staff')) {
            actions = `
                <button class="btn btn-small btn-success" onclick="approveRequest(${req.id})">Approve</button>
                <button class="btn btn-small btn-danger" onclick="rejectRequest(${req.id})">Reject</button>
            `;
        }
        
        row.innerHTML = `
            <td>${req.id}</td>
            <td>${user ? user.name : req.userEmail}</td>
            <td>${eq ? eq.name : 'Unknown'}</td>
            <td>${req.quantity}</td>
            <td>${new Date(req.requestDate).toLocaleDateString()}</td>
            <td>${req.duration} days</td>
            <td><span class="status status-${req.status}">${req.status}</span></td>
            <td class="admin-staff-only">${actions}</td>
        `;
        tbody.appendChild(row);
    });
    
    setupRoleBasedUI();
}

// New Request Modal
document.getElementById('newRequestBtn').addEventListener('click', function() {
    const equipment = getData('equipment');
    const select = document.getElementById('requestEquipment');
    select.innerHTML = '<option value="">Select Equipment</option>';
    
    equipment.forEach(eq => {
        if (eq.available > 0) {
            select.innerHTML += `<option value="${eq.id}">${eq.name} (Available: ${eq.available})</option>`;
        }
    });
    
    document.getElementById('requestForm').reset();
    document.getElementById('requestModal').classList.remove('hidden');
});

document.getElementById('requestForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const equipmentId = parseInt(document.getElementById('requestEquipment').value);
    const quantity = parseInt(document.getElementById('requestQuantity').value);
    const duration = parseInt(document.getElementById('requestDuration').value);
    
    const equipment = getData('equipment');
    const eq = equipment.find(e => e.id === equipmentId);
    
    if (quantity > eq.available) {
        alert('Requested quantity exceeds available quantity.');
        return;
    }
    
    const requests = getData('requests', currentUser.email);
    const newId = requests.length > 0 ? Math.max(...requests.map(r => r.id)) + 1 : 1;
    
    requests.push({
        id: newId,
        userEmail: currentUser.email,
        equipmentId,
        quantity,
        requestDate: new Date().toISOString(),
        duration,
        status: 'pending'
    });
    
    saveData('requests', requests, currentUser.email);
    addLog('Submit Request', `Submitted request for ${quantity}x ${eq.name}`);
    closeModal('requestModal');
    loadRequests();
    loadStats();
});

function approveRequest(id) {
    // Find the request across all users
    let req = null;
    let reqUserEmail = null;
    const allUsers = getData('users');
    
    for (const user of allUsers) {
        const userRequests = getData('requests', user.email);
        const foundReq = userRequests.find(r => r.id === id);
        if (foundReq) {
            req = foundReq;
            reqUserEmail = user.email;
            break;
        }
    }
    
    if (!req) return;
    
    const requests = getData('requests', reqUserEmail);
    const equipment = getData('equipment');
    const borrowings = getData('borrowings', reqUserEmail);
    
    const reqIndex = requests.findIndex(r => r.id === id);
    
    const eqIndex = equipment.findIndex(e => e.id === req.equipmentId);
    const eq = equipment[eqIndex];
    
    if (req.quantity > eq.available) {
        alert('Not enough equipment available.');
        return;
    }
    
    // Update equipment availability
    equipment[eqIndex].available -= req.quantity;
    
    // Create borrowing record
    const borrowDate = new Date();
    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + req.duration);
    
    const newBorrowingId = borrowings.length > 0 ? Math.max(...borrowings.map(b => b.id)) + 1 : 1;
    borrowings.push({
        id: newBorrowingId,
        requestId: req.id,
        userEmail: req.userEmail,
        equipmentId: req.equipmentId,
        quantity: req.quantity,
        borrowDate: borrowDate.toISOString(),
        dueDate: dueDate.toISOString(),
        returnDate: null,
        status: 'borrowed'
    });
    
    // Update request status
    requests[reqIndex].status = 'approved';
    
    saveData('equipment', equipment);
    saveData('requests', requests, reqUserEmail);
    saveData('borrowings', borrowings, reqUserEmail);
    addLog('Approve Request', `Approved request for ${req.quantity}x ${eq.name}`);
    loadRequests();
    loadStats();
}

function rejectRequest(id) {
    if (confirm('Are you sure you want to reject this request?')) {
        // Find the request across all users
        let reqUserEmail = null;
        const allUsers = getData('users');
        
        for (const user of allUsers) {
            const userRequests = getData('requests', user.email);
            const foundReq = userRequests.find(r => r.id === id);
            if (foundReq) {
                reqUserEmail = user.email;
                break;
            }
        }
        
        if (!reqUserEmail) return;
        
        const requests = getData('requests', reqUserEmail);
        const reqIndex = requests.findIndex(r => r.id === id);
        requests[reqIndex].status = 'rejected';
        saveData('requests', requests, reqUserEmail);
        addLog('Reject Request', `Rejected request #${id}`);
        loadRequests();
        loadStats();
    }
}

// Load my borrowings
function loadMyBorrowings() {
    const borrowings = getData('borrowings', currentUser.email);
    const equipment = getData('equipment');
    const tbody = document.getElementById('myBorrowingsBody');
    tbody.innerHTML = '';
    
    const myBorrowings = borrowings;
    
    myBorrowings.forEach(b => {
        const eq = equipment.find(e => e.id === b.equipmentId);
        const borrowDate = new Date(b.borrowDate);
        const dueDate = new Date(b.dueDate);
        const today = new Date();
        const daysRemaining = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
        
        let status = b.status;
        if (status === 'borrowed' && daysRemaining < 0) {
            status = 'overdue';
        }
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${b.id}</td>
            <td>${eq ? eq.name : 'Unknown'}</td>
            <td>${b.quantity}</td>
            <td>${borrowDate.toLocaleDateString()}</td>
            <td>${dueDate.toLocaleDateString()}</td>
            <td><span class="status status-${status}">${status}</span></td>
            <td>${daysRemaining >= 0 ? daysRemaining + ' days' : 'Overdue by ' + Math.abs(daysRemaining) + ' days'}</td>
        `;
        tbody.appendChild(row);
    });
}

// Load activity logs
function loadLogs() {
    const logs = getData('logs', currentUser.email);
    const tbody = document.getElementById('logsBody');
    tbody.innerHTML = '';
    
    logs.forEach(log => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${log.dateTime}</td>
            <td>${log.user}</td>
            <td>${log.action}</td>
            <td>${log.details}</td>
        `;
        tbody.appendChild(row);
    });
}

// Load all requests (Admin/Staff)
function loadAllRequests() {
    const users = getData('users');
    const equipment = getData('equipment');
    const tbody = document.getElementById('allRequestsBody');
    tbody.innerHTML = '';
    
    let allRequests = [];
    users.forEach(user => {
        const userRequests = getData('requests', user.email);
        allRequests = allRequests.concat(userRequests);
    });
    
    allRequests.forEach(req => {
        const user = users.find(u => u.email === req.userEmail);
        const eq = equipment.find(e => e.id === req.equipmentId);
        const row = document.createElement('tr');
        
        let actions = '';
        if (req.status === 'pending') {
            actions = `
                <button class="btn btn-small btn-success" onclick="approveRequest(${req.id})">Approve</button>
                <button class="btn btn-small btn-danger" onclick="rejectRequest(${req.id})">Reject</button>
            `;
        }
        
        row.innerHTML = `
            <td>${req.id}</td>
            <td>${user ? user.name : req.userEmail}</td>
            <td>${eq ? eq.name : 'Unknown'}</td>
            <td>${req.quantity}</td>
            <td>${new Date(req.requestDate).toLocaleDateString()}</td>
            <td>${req.duration} days</td>
            <td><span class="status status-${req.status}">${req.status}</span></td>
            <td>${actions}</td>
        `;
        tbody.appendChild(row);
    });
}

// Load all borrowings (Admin/Staff)
function loadAllBorrowings() {
    const users = getData('users');
    const equipment = getData('equipment');
    const tbody = document.getElementById('allBorrowingsBody');
    tbody.innerHTML = '';
    
    let allBorrowings = [];
    users.forEach(user => {
        const userBorrowings = getData('borrowings', user.email);
        allBorrowings = allBorrowings.concat(userBorrowings);
    });
    
    allBorrowings.forEach(b => {
        const user = users.find(u => u.email === b.userEmail);
        const eq = equipment.find(e => e.id === b.equipmentId);
        const borrowDate = new Date(b.borrowDate);
        const dueDate = new Date(b.dueDate);
        const today = new Date();
        const isOverdue = dueDate < today && b.status === 'borrowed';
        
        let actions = '';
        if (b.status === 'borrowed') {
            actions = `<button class="btn btn-small btn-success" onclick="returnEquipment(${b.id})">Return</button>`;
        }
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${b.id}</td>
            <td>${user ? user.name : b.userEmail}</td>
            <td>${eq ? eq.name : 'Unknown'}</td>
            <td>${b.quantity}</td>
            <td>${borrowDate.toLocaleDateString()}</td>
            <td>${dueDate.toLocaleDateString()} ${isOverdue ? '(Overdue)' : ''}</td>
            <td><span class="status status-${b.status}">${b.status}</span></td>
            <td>${actions}</td>
        `;
        tbody.appendChild(row);
    });
}

// Load pending requests (Staff)
function loadPendingRequests() {
    const users = getData('users');
    const equipment = getData('equipment');
    const tbody = document.getElementById('pendingRequestsBody');
    tbody.innerHTML = '';
    
    let pendingRequests = [];
    users.forEach(user => {
        const userRequests = getData('requests', user.email);
        pendingRequests = pendingRequests.concat(userRequests.filter(r => r.status === 'pending'));
    });
    
    pendingRequests.forEach(req => {
        const user = users.find(u => u.email === req.userEmail);
        const eq = equipment.find(e => e.id === req.equipmentId);
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${req.id}</td>
            <td>${user ? user.name : req.userEmail}</td>
            <td>${eq ? eq.name : 'Unknown'}</td>
            <td>${req.quantity}</td>
            <td>${new Date(req.requestDate).toLocaleDateString()}</td>
            <td>${req.duration} days</td>
            <td>
                <button class="btn btn-small btn-success" onclick="approveRequest(${req.id})">Approve</button>
                <button class="btn btn-small btn-danger" onclick="rejectRequest(${req.id})">Reject</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Load approved requests (Staff)
function loadApprovedRequests() {
    const users = getData('users');
    const equipment = getData('equipment');
    const tbody = document.getElementById('approvedRequestsBody');
    tbody.innerHTML = '';
    
    let approvedRequests = [];
    users.forEach(user => {
        const userRequests = getData('requests', user.email);
        approvedRequests = approvedRequests.concat(userRequests.filter(r => r.status === 'approved'));
    });
    
    approvedRequests.forEach(req => {
        const user = users.find(u => u.email === req.userEmail);
        const eq = equipment.find(e => e.id === req.equipmentId);
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${req.id}</td>
            <td>${user ? user.name : req.userEmail}</td>
            <td>${eq ? eq.name : 'Unknown'}</td>
            <td>${req.quantity}</td>
            <td>${new Date(req.requestDate).toLocaleDateString()}</td>
            <td>Approved</td>
            <td><span class="status status-approved">Approved</span></td>
        `;
        tbody.appendChild(row);
    });
}

// Load my requests (User)
function loadMyRequests() {
    const requests = getData('requests', currentUser.email);
    const equipment = getData('equipment');
    const tbody = document.getElementById('myRequestsBody');
    tbody.innerHTML = '';
    
    requests.forEach(req => {
        const eq = equipment.find(e => e.id === req.equipmentId);
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${req.id}</td>
            <td>${eq ? eq.name : 'Unknown'}</td>
            <td>${req.quantity}</td>
            <td>${new Date(req.requestDate).toLocaleDateString()}</td>
            <td>${req.duration} days</td>
            <td><span class="status status-${req.status}">${req.status}</span></td>
        `;
        tbody.appendChild(row);
    });
}

// Pagination variables for logs
let currentLogsPage = 1;
let logsPerPage = 10;
let allAdminLogs = [];

// Load admin logs
function loadAdminLogs() {
    const users = getData('users');
    
    // Collect all logs from all users
    allAdminLogs = [];
    users.forEach(user => {
        const userLogs = getData('logs', user.email);
        allAdminLogs = allLogs.concat(userLogs);
    });
    
    // Sort logs by date (newest first)
    allAdminLogs.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
    
    renderLogsPage();
}

// Render logs for current page
function renderLogsPage() {
    const tbody = document.getElementById('adminLogsBody');
    tbody.innerHTML = '';
    
    const startIndex = (currentLogsPage - 1) * logsPerPage;
    const endIndex = startIndex + logsPerPage;
    const pageLogs = allAdminLogs.slice(startIndex, endIndex);
    
    const users = getData('users');
    pageLogs.forEach(log => {
        const user = users.find(u => u.email === log.user);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${log.dateTime}</td>
            <td>${user ? user.name : log.user}</td>
            <td>${log.action}</td>
            <td>${log.details}</td>
        `;
        tbody.appendChild(row);
    });
    
    // Update pagination info
    const totalPages = Math.ceil(allAdminLogs.length / logsPerPage);
    document.getElementById('logsPageInfo').textContent = `Page ${currentLogsPage} of ${totalPages || 1}`;
    document.getElementById('logsPrevBtn').disabled = currentLogsPage === 1;
    document.getElementById('logsNextBtn').disabled = currentLogsPage >= totalPages || totalPages === 0;
}

// Previous logs page
function prevLogsPage() {
    if (currentLogsPage > 1) {
        currentLogsPage--;
        renderLogsPage();
    }
}

// Next logs page
function nextLogsPage() {
    const totalPages = Math.ceil(allAdminLogs.length / logsPerPage);
    if (currentLogsPage < totalPages) {
        currentLogsPage++;
        renderLogsPage();
    }
}

// Change logs per page
function changeLogsPerPage() {
    logsPerPage = parseInt(document.getElementById('logsPerPage').value);
    currentLogsPage = 1;
    renderLogsPage();
}

// Load staff logs
function loadStaffLogs() {
    loadLogs(); // Reuse the existing loadLogs function
    const logs = getData('logs', currentUser.email);
    const tbody = document.getElementById('staffLogsBody');
    tbody.innerHTML = '';
    
    logs.forEach(log => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${log.dateTime}</td>
            <td>${log.user}</td>
            <td>${log.action}</td>
            <td>${log.details}</td>
        `;
        tbody.appendChild(row);
    });
}

// Load user logs
function loadUserLogs() {
    const logs = getData('logs', currentUser.email);
    const tbody = document.getElementById('userLogsBody');
    tbody.innerHTML = '';
    
    logs.forEach(log => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${log.dateTime}</td>
            <td>${log.action}</td>
            <td>${log.details}</td>
        `;
        tbody.appendChild(row);
    });
}

// Open new request modal helper function
function openNewRequestModal() {
    document.getElementById('newRequestBtn').click();
}

// Return equipment function
function returnEquipment(id) {
    if (confirm('Are you sure you want to mark this equipment as returned?')) {
        // Find the borrowing across all users
        let borrowing = null;
        let borrowingUserEmail = null;
        const allUsers = getData('users');
        
        for (const user of allUsers) {
            const userBorrowings = getData('borrowings', user.email);
            const foundBorrowing = userBorrowings.find(b => b.id === id);
            if (foundBorrowing) {
                borrowing = foundBorrowing;
                borrowingUserEmail = user.email;
                break;
            }
        }
        
        if (!borrowing) return;
        
        const borrowings = getData('borrowings', borrowingUserEmail);
        const borrowingIndex = borrowings.findIndex(b => b.id === id);
        const equipment = getData('equipment');
        const eqIndex = equipment.findIndex(e => e.id === borrowings[borrowingIndex].equipmentId);
        
        // Update equipment availability
        equipment[eqIndex].available += borrowings[borrowingIndex].quantity;
        
        // Update borrowing status
        borrowings[borrowingIndex].status = 'returned';
        borrowings[borrowingIndex].returnDate = new Date().toISOString();
        
        saveData('equipment', equipment);
        saveData('borrowings', borrowings, borrowingUserEmail);
        addLog('Return Equipment', `Returned ${borrowings[borrowingIndex].quantity}x equipment`);
        
        // Reload the current section
        loadSection(document.querySelector('.nav-btn.active').dataset.section + 'Section');
    }
}

// Load users
function loadUsers() {
    const users = getData('users');
    const tbody = document.getElementById('usersBody');
    tbody.innerHTML = '';
    
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.email}</td>
            <td>${user.name}</td>
            <td>${user.role}</td>
            <td>
                ${user.email !== 'admin@gmail.com' ? `
                    <button class="btn btn-small btn-primary" onclick="editUser('${user.email}')">Edit</button>
                    <button class="btn btn-small btn-danger" onclick="deleteUser('${user.email}')">Delete</button>
                ` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Add User Modal
document.getElementById('addUserBtn').addEventListener('click', function() {
    document.getElementById('userModalTitle').textContent = 'Add User';
    document.getElementById('userForm').reset();
    document.getElementById('userEmail').value = '';
    document.getElementById('userModal').classList.remove('hidden');
});

document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('userEmailInput').value;
    const name = document.getElementById('userName').value;
    const password = document.getElementById('userPassword').value;
    const role = document.getElementById('userRoleInput').value;
    const existingEmail = document.getElementById('userEmail').value;
    
    const users = getData('users');
    
    if (existingEmail) {
        // Edit existing user
        const index = users.findIndex(u => u.email === existingEmail);
        if (index !== -1) {
            users[index] = { ...users[index], name, password, role };
            addLog('Update User', `Updated user: ${email}`);
        }
    } else {
        // Add new user
        if (users.find(u => u.email === email)) {
            alert('Email already exists.');
            return;
        }
        users.push({ email, name, password, role });
        addLog('Add User', `Added new user: ${email}`);
    }
    
    saveData('users', users);
    closeModal('userModal');
    loadUsers();
});

function editUser(email) {
    const users = getData('users');
    const user = users.find(u => u.email === email);
    
    if (user) {
        document.getElementById('userModalTitle').textContent = 'Edit User';
        document.getElementById('userEmail').value = user.email;
        document.getElementById('userEmailInput').value = user.email;
        document.getElementById('userEmailInput').disabled = true;
        document.getElementById('userName').value = user.name;
        document.getElementById('userPassword').value = user.password;
        document.getElementById('userRoleInput').value = user.role;
        document.getElementById('userModal').classList.remove('hidden');
    }
}

function deleteUser(email) {
    if (confirm('Are you sure you want to delete this user?')) {
        const users = getData('users');
        users = users.filter(u => u.email !== email);
        saveData('users', users);
        addLog('Delete User', `Deleted user: ${email}`);
        loadUsers();
    }
}

// Reports
document.querySelectorAll('.report-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const reportType = this.dataset.report;
        generateReport(reportType);
    });
});

function generateReport(type) {
    const reportContent = document.getElementById('reportContent');
    let html = '';
    const equipment = getData('equipment');
    const users = getData('users');
    
    switch(type) {
        case 'available':
            const availableEquipment = equipment.filter(eq => eq.available > 0);
            html = '<h3>Available Equipment</h3><table><thead><tr><th>ID</th><th>Name</th><th>Category</th><th>Available</th></tr></thead><tbody>';
            availableEquipment.forEach(eq => {
                html += `<tr><td>${eq.id}</td><td>${eq.name}</td><td>${eq.category}</td><td>${eq.available}</td></tr>`;
            });
            html += '</tbody></table>';
            break;
            
        case 'borrowed':
            let borrowings;
            if (currentUser.role === 'admin' || currentUser.role === 'staff') {
                // Admin and staff see all borrowings
                borrowings = [];
                users.forEach(user => {
                    const userBorrowings = getData('borrowings', user.email);
                    borrowings = borrowings.concat(userBorrowings.filter(b => b.status === 'borrowed'));
                });
            } else {
                // Regular users see only their own borrowings
                borrowings = getData('borrowings', currentUser.email).filter(b => b.status === 'borrowed');
            }
            
            html = '<h3>Borrowed Equipment</h3><table><thead><tr><th>ID</th><th>User</th><th>Equipment</th><th>Quantity</th><th>Due Date</th></tr></thead><tbody>';
            borrowings.forEach(b => {
                const eq = equipment.find(e => e.id === b.equipmentId);
                const user = users.find(u => u.email === b.userEmail);
                const dueDate = new Date(b.dueDate);
                const today = new Date();
                const isOverdue = dueDate < today;
                html += `<tr><td>${b.id}</td><td>${user ? user.name : b.userEmail}</td><td>${eq ? eq.name : 'Unknown'}</td><td>${b.quantity}</td><td>${dueDate.toLocaleDateString()} ${isOverdue ? '(Overdue)' : ''}</td></tr>`;
            });
            html += '</tbody></table>';
            break;
            
        case 'records':
            let allBorrowings;
            if (currentUser.role === 'admin' || currentUser.role === 'staff') {
                // Admin and staff see all borrowings
                allBorrowings = [];
                users.forEach(user => {
                    const userBorrowings = getData('borrowings', user.email);
                    allBorrowings = allBorrowings.concat(userBorrowings);
                });
            } else {
                // Regular users see only their own borrowings
                allBorrowings = getData('borrowings', currentUser.email);
            }
            
            html = '<h3>Borrowing/Returning Records</h3><table><thead><tr><th>ID</th><th>User</th><th>Equipment</th><th>Quantity</th><th>Borrow Date</th><th>Return Date</th><th>Status</th></tr></thead><tbody>';
            allBorrowings.forEach(b => {
                const eq = equipment.find(e => e.id === b.equipmentId);
                const user = users.find(u => u.email === b.userEmail);
                const borrowDate = new Date(b.borrowDate);
                const returnDate = b.returnDate ? new Date(b.returnDate) : '-';
                html += `<tr><td>${b.id}</td><td>${user ? user.name : b.userEmail}</td><td>${eq ? eq.name : 'Unknown'}</td><td>${b.quantity}</td><td>${borrowDate.toLocaleDateString()}</td><td>${returnDate !== '-' ? returnDate.toLocaleDateString() : returnDate}</td><td><span class="status status-${b.status}">${b.status}</span></td></tr>`;
            });
            html += '</tbody></table>';
            break;
            
        case 'inventory':
            const allEquipment = equipment;
            html = '<h3>Inventory Status</h3><table><thead><tr><th>ID</th><th>Name</th><th>Category</th><th>Total</th><th>Available</th><th>Borrowed</th></tr></thead><tbody>';
            allEquipment.forEach(eq => {
                const borrowed = eq.quantity - eq.available;
                html += `<tr><td>${eq.id}</td><td>${eq.name}</td><td>${eq.category}</td><td>${eq.quantity}</td><td>${eq.available}</td><td>${borrowed}</td></tr>`;
            });
            html += '</tbody></table>';
            break;
    }
    
    reportContent.innerHTML = html;
}

// Modal functions
function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
    if (modalId === 'userModal') {
        document.getElementById('userEmailInput').disabled = false;
    }
}

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal(this.id);
        }
    });
});

// Clear all data (for testing purposes)
function clearData() {
    localStorage.clear();
    console.log('All data cleared. Refresh the page to reinitialize.');
}

// Initialize on page load
initializeData();
checkLoginStatus();
