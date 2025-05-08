function openSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      section.classList.remove('active');
    });
  
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
      activeSection.classList.add('active');
    }
}

// events  : 

let events = {
  '15-06-2025': [
    {
      title: 'Football Training',
      time: '4:00 PM - 6:00 PM',
      location: 'Community Center Field',
      description: 'Join our weekly football training session.',
      program: 'Youth'
    }
  ],
  '09-05-2025': [
    {
      title: 'Women’s Yoga',
      time: '10:00 AM - 11:00 AM',
      location: 'Room 2B',
      description: 'Relaxing yoga session for women of all ages.',
      program: 'Women'
    }
  ]
};

const programColors = {
  'Elderly': '#4a6fa5',
  'Women': '#1678B7',
  'Exceptionals': '#3A6EA4',
  'Youth': '#255484',
  'Culture': '#318DCB',
  'Kids Workshops': '#2E7FBA',
  'Urban Planning': '#2B71A8',
  'Public Action': '#93ccf8'
};
function renderEvents() {
  const container = document.querySelector('.all-events');
  container.innerHTML = '';

  Object.keys(events).sort().forEach(date => {
    const dateHeader = document.createElement('h4');
    dateHeader.textContent = `Events on ${date}`;
    container.appendChild(dateHeader);

    events[date].forEach(event => {
      const card = document.createElement('div');
      card.className = 'event-card';
      card.style.borderLeft = `6px solid ${programColors[event.program] || '#ccc'}`;
      card.innerHTML = `
        <h5>${event.title}</h5>
        <p><strong>Time:</strong> ${event.time}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Description:</strong> ${event.description}</p>
        <p><strong>Program:</strong> ${event.program}</p>
        <button onclick="openEditModal('${date}', '${event.title}')">Edit</button>
        <button onclick="deleteEvent('${date}', '${event.title}')">Delete</button>
      `;
      container.appendChild(card);
    });
  });
}
function openAddModal() {
  document.getElementById('modalTitle').textContent = 'Add New Event';
  const form = document.getElementById('eventForm');
  form.reset();
  form.mode.value = 'add';
  document.getElementById('eventModal').style.display = 'block';
}

function openEditModal(date, title) {
  const event = events[date].find(e => e.title === title);
  const form = document.getElementById('eventForm');
  form.mode.value = 'edit';
  form.originalDate.value = date;
  form.originalTitle.value = title;

  form.date.value = date.split('-').reverse().join('-'); // YYYY-MM-DD
  form.time.value = event.time;
  form.title.value = event.title;
  form.location.value = event.location;
  form.program.value = event.program;
  form.description.value = event.description;

  document.getElementById('modalTitle').textContent = 'Edit Event';
  document.getElementById('eventModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('eventModal').style.display = 'none';
}
document.getElementById('eventForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = e.target;
  const mode = form.mode.value;
  const date = form.date.value.split('-').reverse().join('-'); // DD-MM-YYYY
  const title = form.title.value;

  const eventData = {
    title: title,
    time: form.time.value,
    location: form.location.value,
    description: form.description.value,
    program: form.program.value
  };

  if (mode === 'add') {
    if (!events[date]) events[date] = [];
    events[date].push(eventData);
  } else {
    const originalDate = form.originalDate.value;
    const originalTitle = form.originalTitle.value;

    events[originalDate] = events[originalDate].filter(e => e.title !== originalTitle);
    if (events[originalDate].length === 0) delete events[originalDate];

    if (!events[date]) events[date] = [];
    events[date].push(eventData);
  }

  closeModal();
  renderEvents();
});
function deleteEvent(date, title) {
  if (confirm('Are you sure you want to delete this event?')) {
    events[date] = events[date].filter(e => e.title !== title);
    if (events[date].length === 0) delete events[date];
    renderEvents();
  }
}
document.querySelector('[onclick="openSection(\'events\')"]').addEventListener('click', renderEvents);


// news : 
let newsList = [
  {
    title: "Community Clean-Up Day",
    date: "2025-05-09",
    image: "", // this will be a base64 data URL
    description: "Join us in making our neighborhood cleaner and greener!"
  }
];
const imageInput = document.querySelector('input[name="imageFile"]');
const imagePreview = document.getElementById('imagePreview');

imageInput.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'block';
      imagePreview.dataset.imageData = e.target.result; // store the base64 data
    };
    reader.readAsDataURL(file);
  }
});

function renderNews() {
  const container = document.querySelector('.all-news');
  container.innerHTML = '';

  newsList.forEach(news => {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.innerHTML = `
      <img src="${news.image}" alt="${news.title}" class="news-img" />
      <h4>${news.title}</h4>
      <p><strong>Date:</strong> ${news.date}</p>
      <p>${news.description}</p>
      <button onclick="openNewsEditModal('${news.title}')">Edit</button>
      <button onclick="deleteNews('${news.title}')">Delete</button>
    `;
    container.appendChild(card);
  });
}
function openNewsAddModal() {
  const form = document.getElementById('newsForm');
  form.reset();
  form.mode.value = 'add';
  imagePreview.src = '';
  imagePreview.style.display = 'none';
  imagePreview.dataset.imageData = '';
  document.getElementById('newsModalTitle').textContent = 'Add News';
  document.getElementById('newsModal').style.display = 'block';
}

function closeNewsModal() {
  document.getElementById('newsModal').style.display = 'none';
  imagePreview.src = '';
  imagePreview.style.display = 'none';
  imagePreview.dataset.imageData = '';
}


function openNewsEditModal(title) {
  const news = newsList.find(n => n.title === title);
  const form = document.getElementById('newsForm');

  form.mode.value = 'edit';
  form.originalTitle.value = title;
  form.date.value = news.date;
  form.title.value = news.title;
  form.description.value = news.description;

  imagePreview.src = news.image;
  imagePreview.style.display = 'block';
  imagePreview.dataset.imageData = news.image;

  document.getElementById('newsModalTitle').textContent = 'Edit News';
  document.getElementById('newsModal').style.display = 'block';
}
document.getElementById('newsForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = e.target;
  const mode = form.mode.value;

  const newNews = {
    title: form.title.value,
    date: form.date.value,
    image: imagePreview.dataset.imageData || '',
    description: form.description.value
  };

  if (mode === 'add') {
    newsList.push(newNews);
  } else {
    const originalTitle = form.originalTitle.value;
    const index = newsList.findIndex(n => n.title === originalTitle);
    if (index !== -1) newsList[index] = newNews;
  }

  closeNewsModal();
  renderNews();
});

function deleteNews(title) {
  if (confirm('Are you sure you want to delete this news item?')) {
    newsList = newsList.filter(n => n.title !== title);
    renderNews();
  }
}
document.querySelector('[onclick="openSection(\'news\')"]').addEventListener('click', renderNews);


// compliments : 
let compliments = [
  {
    name: "Jane Doe",
    phone: "+1234567890",
    message: "The community event was amazing!",
    read: false,
    timestamp: "2025-05-08 14:32"
  },
  {
    name: "Ahmed Ali",
    phone: "+9876543210",
    message: "Please fix the park lights.",
    read: true,
    timestamp: "2025-05-07 11:05"
  }
];

function renderCompliments() {
  const tableBody = document.querySelector('#complimentTable tbody');
  const notif = document.getElementById('complimentNotification');
  const tableContainer = document.getElementById('complimentTableContainer');

  if (compliments.length === 0) {
    tableContainer.style.display = 'none';
    notif.textContent = "No compliments available.";
    return;
  } else {
    tableContainer.style.display = 'block';
  }

  tableBody.innerHTML = '';
  let unreadCount = 0;

  compliments.forEach((comp, index) => {
    const row = document.createElement('tr');
    row.className = comp.read ? 'read' : 'unread';

    if (!comp.read) unreadCount++;

    row.innerHTML = `
      <td>${comp.name}</td>
      <td>${comp.phone}</td>
      <td>${comp.read ? comp.message : '<i>Click to read</i>'}</td>
      <td>${comp.timestamp}</td>
      <td><button onclick="deleteCompliment(${index})">Delete</button></td>
    `;

    row.addEventListener('click', () => {
      if (!comp.read) {
        comp.read = true;
        renderCompliments();
      } else {
        alert(`Message:\n\n${comp.message}`);
      }
    });

    tableBody.appendChild(row);
  });

  notif.textContent = unreadCount > 0
    ? `You have ${unreadCount} unread compliment${unreadCount > 1 ? 's' : ''}.`
    : 'All compliments read';
}

function deleteCompliment(index) {
  if (confirm("Are you sure you want to delete this compliment?")) {
    compliments.splice(index, 1);
    renderCompliments();
  }
}

document.querySelector('[onclick="openSection(\'compliments\')"]').addEventListener('click', renderCompliments);
// +
function simulateNewCompliment() {
  const newComp = {
    name: "New User",
    phone: "+000111222",
    message: "Great service!",
    read: false,
    timestamp: new Date().toLocaleString()
  };
  compliments.unshift(newComp); // Add to top
  alert("New compliment received!");
  renderCompliments(); 
}  

// registers:

let registrations = [
  {
    name: "Ali Hassan",
    phone: "+123456789",
    participants: 3,
    event: "Community Yoga",
    date: "2025-05-15 10:00 AM",
    status: "pending" 
  },
  {
    name: "Noura Saleh",
    phone: "+987654321",
    participants: 2,
    event: "Urban Gardening",
    date: "2025-05-20 3:00 PM",
    status: "accepted"
  }
];
function renderRegistrations() {
  const tbody = document.getElementById('registerTableBody');
  const tableContainer = document.getElementById('registerTableContainer');

  if (registrations.length === 0) {
    tableContainer.style.display = 'none';
    return;
  } else {
    tableContainer.style.display = 'block';
  }

  tbody.innerHTML = '';

  registrations.forEach((reg, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${reg.name}</td>
      <td>${reg.phone}</td>
      <td>${reg.participants}</td>
      <td>${reg.event}</td>
      <td>${reg.date}</td>
      <td class="status-${reg.status}">${reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}</td>
      <td>
        ${reg.status === 'pending' ? `
          <button onclick="updateRegistrationStatus(${index}, 'accepted')">Accept</button>
          <button onclick="updateRegistrationStatus(${index}, 'rejected')">Reject</button>
        ` : ''}
        <button onclick="deleteRegistration(${index})">Delete</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

function deleteRegistration(index) {
  if (confirm("Are you sure you want to delete this registration?")) {
    registrations.splice(index, 1);
    renderRegistrations();
  }
}
function updateRegistrationStatus(index, newStatus) {
  registrations[index].status = newStatus;
  renderRegistrations();
}
document.querySelector('[onclick="openSection(\'register\')"]').addEventListener('click', renderRegistrations);
function simulateUserRegistration() {
  registrations.push({
    name: "Lina Abdallah",
    phone: "+111222333",
    participants: 1,
    event: "Art for Kids",
    date: "2025-05-22 1:00 PM",
    status: "pending"
  });
  alert("New registration received!");
}
function signOut(){
    
}
// dashboard:

function updateDashboardCounts() {
  document.getElementById('eventCount').textContent = Object.keys(events).length;
  document.getElementById('newsCount').textContent = Object.keys(newsList).length;
  document.getElementById('complimentCount').textContent = compliments.filter(c => c.status === 'unread').length;
  document.getElementById('registerCount').textContent = registrations.filter(r => r.status === 'pending').length;
}

document.addEventListener("DOMContentLoaded", function () {
  updateDashboardCounts();
});

// sign out :
function signOut() {
  const confirmSignOut = confirm("Are you sure you want to sign out?");
  if (confirmSignOut){
    window.location.href = "login.html"; 
  }
}
