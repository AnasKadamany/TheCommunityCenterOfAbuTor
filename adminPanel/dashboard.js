// Dashboard Navigation Functions
function openSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.classList.remove("active");
  });

  // Remove active class from all nav items
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.classList.remove("active");
  });

  // Show the selected section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add("active");
  }

  // Add active class to the clicked nav item
  const activeNavItem = document.querySelector(
    `[onclick="openSection('${sectionId}')"]`
  );
  if (activeNavItem) {
    activeNavItem.classList.add("active");
  }
  //////////////////////////////////////////////////////////////////////////////////////////

  // Load data for specific sections when opened
  switch (sectionId) {
    case "events":
      loadEvents();
      break;
    case "news":
      loadNews();
      break;
    case "complaints":
      loadComplaints();
      break;
    case "register":
      loadRegistrations();
      break;
    case "dashboard":
      updateDashboardCounts();
      break;
  }
}

// Modal Functions
function openAddModal() {
  const modal = document.getElementById("eventModal");
  const form = document.getElementById("eventForm");
  const title = document.getElementById("modalTitle");

  // Reset form and set to add mode
  form.reset();
  form.querySelector('input[name="mode"]').value = "add";
  form.querySelector('input[name="eventId"]').value = "";
  title.textContent = "Add New Event";

  // Set default date to today
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("eventDate").value = today;

  modal.style.display = "block";
}
//edit to choose just one item XgetAllEventsX
function openEditEventModal(eventId) {
  // Fetch event data and populate the form
  getAllEvents().then((events) => {
    const event = events.find((e) => e._id === eventId);
    if (event) {
      const modal = document.getElementById("eventModal");
      const form = document.getElementById("eventForm");
      const title = document.getElementById("modalTitle");

      // Populate form fields
      form.querySelector('input[name="mode"]').value = "edit";
      form.querySelector('input[name="eventId"]').value = eventId;
      document.getElementById("eventDate").value = event.date.split("T")[0];
      document.getElementById("eventTime").value = event.time || "";
      document.getElementById("eventTitle").value = event.title;
      document.getElementById("eventLocation").value = event.location || "";
      document.getElementById("eventProgram").value = event.type || "";
      document.getElementById("eventDescription").value = event.description;

      title.textContent = "Edit Event";
      modal.style.display = "block";
    }
  });
}

function closeModal() {
  const modal = document.getElementById("eventModal");
  modal.style.display = "none";
}

function openNewsAddModal() {
  const modal = document.getElementById("newsModal");
  const form = document.getElementById("newsForm");
  const title = document.getElementById("newsModalTitle");

  // Reset form and set to add mode
  form.reset();
  form.querySelector('input[name="mode"]').value = "add";
  title.textContent = "Add News Article";

  // Set default date to today
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("newsDate").value = today;

  modal.style.display = "block";
}

function closeNewsModal() {
  const modal = document.getElementById("newsModal");
  modal.style.display = "none";
}

// Sign out function
function signOut() {
  if (confirm("Are you sure you want to sign out?")) {
    console.log("Signing out...");
    window.location.href = "/adminPanel/login.html";
  }
}

// Update dashboard counts
async function updateDashboardCounts() {
  try {
    const events = await getAllEvents();
    document.getElementById("eventCount").textContent = events.length;

    const news = await getAllNews();
    document.getElementById("newsCount").textContent = news.length;

    const complaints = await getAllComplaints();
    document.getElementById("complaintCount").textContent = complaints.length;

    const registrations = await getAllRegistrations();
    document.getElementById("registerCount").textContent = registrations.length;
  } catch (error) {
    console.error("Error updating dashboard counts:", error);
  }
}

async function loadComplaints() {
  const tableBody = document.querySelector("#complaintTable tbody");

  // Show loading state
  tableBody.innerHTML = `
    <tr>
      <td colspan="6" style="text-align: center; padding: 2rem;">
        <span class="loading"></span>
        Loading complaints...
      </td>
    </tr>
  `;

  try {
    const complaints = await getAllComplaints();

    if (!complaints || complaints.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 2rem;">
            No complaints found.
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = ""; // Clear old content

    complaints.forEach((complaint) => {
      const row = document.createElement("tr");

      const receivedDate = new Date(complaint.createdAt).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );

      row.innerHTML = `
        <td>${complaint.name || "N/A"}</td>
        <td>${complaint.phone || "N/A"}</td>
        <td>${complaint.message || "No message"}</td>
        <td>${receivedDate}</td>
        <td>${complaint.isRead ? "Read" : "Unread"}</td>
        <td>
          <button class="btn btn-sm btn-success" onclick="markComplaintAsRead('${
            complaint._id
          }')">Mark Read</button>
          <button class="btn btn-sm btn-danger" onclick="confirmDeleteComplaint('${
            complaint._id
          }')">Delete</button>
        </td>
      `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading complaints:", error);
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 2rem;">
          Failed to load complaints. Please try again later.
        </td>
      </tr>
    `;
  }
}

async function loadRegistrations() {
  const tableBody = document.getElementById("registerTableBody");

  // Show loading row
  tableBody.innerHTML = `
    <tr>
      <td colspan="7" style="text-align: center; padding: 2rem;">
        <span class="loading"></span>
        Loading registrations...
      </td>
    </tr>
  `;

  try {
    const registrations = await getAllRegistrations();
    if (!registrations || registrations.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 2rem;">
            No registrations found.
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = ""; // Clear previous content
    for (const reg of registrations) {
      const currEvent = await getSpecificEvent(reg.eventId);
      const eventTitle = currEvent?.title || "Unknown Event";
      const date = new Date(reg.createdAt);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${reg.name || "N/A"}</td>
        <td>${reg.phone || "N/A"}</td>
        <td>${reg.number || 1}</td>
        <td>${eventTitle}</td>
        <td>${formattedDate}</td>
        <td>${reg.isConfirmed ? "Confirmed" : "Pending"}</td>
        <td>
          <button class="btn btn-sm btn-success">Confirm</button>
          <button class="btn btn-sm btn-danger">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    }
  } catch (error) {
    console.error("Error loading registrations:", error);
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 2rem;">
          Failed to load registrations. Please try again.
        </td>
      </tr>
    `;
  }
}

function markAllComplaintsRead() {
  console.log("Marking all complaints as read...");
  // Implement mark all as read logic
}

function refreshComplaints() {
  console.log("Refreshing complaints...");
  loadComplaints();
}

function refreshRegistrations() {
  console.log("Refreshing registrations...");
  loadRegistrations();
}

function exportRegistrations() {
  console.log("Exporting registrations...");
  // Implement export logic
}

// Utility functions for better UX
function showLoadingOverlay(message = "Loading...") {
  let overlay = document.getElementById("loadingOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "loadingOverlay";
    overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            color: white;
            font-size: 1.1rem;
        `;
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = `
        <div style="text-align: center;">
            <div class="loading" style="margin: 0 auto 1rem;"></div>
            <div>${message}</div>
        </div>
    `;
  overlay.style.display = "flex";
}

function hideLoadingOverlay() {
  const overlay = document.getElementById("loadingOverlay");
  if (overlay) {
    overlay.style.display = "none";
  }
}

function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `notification notification-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        min-width: 300px;
        animation: slideIn 0.3s ease;
    `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 5000);
}

function showConfirmModal(
  title,
  message,
  onConfirm,
  confirmText = "Confirm",
  confirmClass = "btn-primary"
) {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.style.display = "block";
  modal.innerHTML = `
        <div class="modal-content">
            <h3>${title}</h3>
            <p style="margin: 1.5rem 0;">${message}</p>
            <div class="modal-actions">
                <button type="button" class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                <button type="button" class="btn ${confirmClass}" id="confirmBtn">${confirmText}</button>
            </div>
        </div>
    `;

  document.body.appendChild(modal);

  document.getElementById("confirmBtn").onclick = function () {
    onConfirm();
    modal.remove();
  };

  modal.onclick = function (e) {
    if (e.target === modal) {
      modal.remove();
    }
  };
}

// EVENT MANAGEMENT FUNCTIONS (from your existing code)

// 1. Get all events from API
async function getAllEvents() {
  try {
    const response = await fetch("http://localhost:8080/api/events");
    const data = await response.json();

    // Handle different response structures
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.events)) {
      return data.events;
    } else if (data && data.length > 0 && Array.isArray(data[0])) {
      return data[0];
    }

    return [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

async function getSpecificEvent(eventId) {
  try {
    const response = await fetch(`http://localhost:8080/api/events/${eventId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data; // Assuming it's already a single event object
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

async function getAllNews() {
  try {
    const response = await fetch("http://localhost:8080/api/news");
    const data = await response.json();

    // Handle different response structures
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.news)) {
      return data.news;
    } else if (data && data.length > 0 && Array.isArray(data[0])) {
      return data[0];
    }

    return [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

function getAllComplaints() {
  return fetch("http://localhost:8080/api/complaints")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle different response structures
      if (Array.isArray(data)) {
        return data;
      } else if (data && Array.isArray(data.complaints)) {
        return data.complaints;
      } else if (data && data.length > 0 && Array.isArray(data[0])) {
        return data[0];
      }
      return [];
    })
    .catch((error) => {
      console.error("Error fetching complaints:", error);
      return [];
    });
}

function getAllRegistrations() {
  return fetch("http://localhost:8080/api/joins")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (Array.isArray(data)) {
        return data;
      } else if (data && Array.isArray(data.registrations)) {
        return data.registrations;
      } else if (data && data.length > 0 && Array.isArray(data[0])) {
        return data[0];
      }
      return [];
    })
    .catch((error) => {
      console.error("Error fetching registrations:", error);
      return [];
    });
}
// 2. Render events with proper image display
function renderEvents(events) {
  const container = document.querySelector(".all-events");
  container.innerHTML = "";

  if (!events || events.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class='bx bx-calendar-x'></i>
        <h3>No Events Found</h3>
        <p>Create your first event to get started.</p>
        <button class="btn btn-primary" onclick="openAddModal()">
          <i class='bx bx-plus'></i>
          Add New Event
        </button>
      </div>
    `;
    return;
  }

  events.forEach((event) => {
    const card = document.createElement("div");
    card.className = "event-card";

    const eventDate = new Date(event.date);
    const eventId = event._id;

    // Format the date and time properly
    const formattedDate = eventDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime =
      event.time ||
      eventDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

    card.innerHTML = `
      <div class="card-header">
        <h4 class="card-title-text">${event.title || "Untitled Event"}</h4>
        <div class="card-actions">
          <button class="btn btn-sm btn-outline btn-primary" onclick="openEditEventModal('${eventId}')">
            <i class='bx bx-edit'></i> Edit
          </button>
          <button class="btn btn-sm btn-outline btn-danger" onclick="confirmDeleteEvent('${eventId}', '${
      event.title
    }')">
            <i class='bx bx-trash'></i> Delete
          </button>
        </div>
      </div>
      
      ${
        event.image
          ? `
        <div style="margin-bottom: 1rem;">
          <img src="${event.image}" alt="${event.title}" 
               style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 8px;">
        </div>
      `
          : ""
      }
      
      <div style="margin-bottom: 1rem;">
        <p><strong><i class='bx bx-calendar'></i> Date:</strong> ${formattedDate}</p>
        <p><strong><i class='bx bx-time'></i> Time:</strong> ${formattedTime}</p>
        <p><strong><i class='bx bx-map'></i> Location:</strong> ${
          event.location || "TBA"
        }</p>
        <p><strong><i class='bx bx-category'></i> Type:</strong> 
          <span class="status-badge" style="background-color: var(--primary-color); color: white;">
            ${event.type || "General"}
          </span>
        </p>
      </div>
      
      <p><strong>Description:</strong></p>
      <p style="color: var(--gray-600); line-height: 1.6;">
        ${event.description || "No description provided"}
      </p>
    `;
    container.appendChild(card);
  });
}

function renderNews(news) {
  const container = document.querySelector(".all-news");
  container.innerHTML = "";

  if (!news || news.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class='bx bx-calendar-x'></i>
        <h3>No News Found</h3>
        <p>Create your first news article to get started.</p>
        <button class="btn btn-primary" onclick="openNewsAddModal()">
          <i class='bx bx-plus'></i>
          Add News
        </button>
      </div>
    `;
    return;
  }

  news.forEach((item) => {
    const card = document.createElement("div");
    card.className = "news-card";

    const newsDate = new Date(item.date);
    const formattedDate = newsDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    card.innerHTML = `
      <div class="card-header">
        <h4 class="card-title-text">${item.title || "Untitled News"}</h4>
        <div class="card-actions">
          <button class="btn btn-sm btn-outline btn-primary" onclick="openEditNewsModal('${
            item._id
          }')">
            <i class='bx bx-edit'></i> Edit
          </button>
          <button class="btn btn-sm btn-outline btn-danger" onclick="confirmDeleteNews('${
            item._id
          }', '${item.title}')">
            <i class='bx bx-trash'></i> Delete
          </button>
        </div>
      </div>

      ${
        item.image
          ? `
        <div style="margin-bottom: 1rem;">
          <img src="${item.image}" alt="${item.title}" 
               style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 8px;">
        </div>
      `
          : ""
      }

      <div style="margin-bottom: 1rem;">
        <p><strong><i class='bx bx-calendar'></i> Date:</strong> ${formattedDate}</p>
      </div>

      <p><strong>Description:</strong></p>
      <p style="color: var(--gray-600); line-height: 1.6;">
        ${item.description || "No description provided"}
      </p>
    `;

    container.appendChild(card);
  });
}

// 4. Create new event
async function createEvent(eventData) {
  try {
    const response = await fetch("http://localhost:8080/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create event: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
}

// 5. Update existing event
async function updateEvent(eventId, eventData) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/events/${eventId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update event: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
}

// 6. Delete event
async function deleteEvent(eventId) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/events/${eventId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete event: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
}

async function uploadEventImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch("http://localhost:8080/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload image: ${response.statusText}`);
  }

  const result = await response.json();
  return result.imageUrl || ""; // 👈 match the backend response key
}

// 7. Confirm delete event with modal
function confirmDeleteEvent(eventId, eventTitle) {
  showConfirmModal(
    "Delete Event",
    `Are you sure you want to delete "${eventTitle}"? This action cannot be undone.`,
    async () => {
      showLoadingOverlay("Deleting event...");
      try {
        await deleteEvent(eventId);
        hideLoadingOverlay();
        showToast("Event deleted successfully!", "success");
        loadEvents();
      } catch (error) {
        hideLoadingOverlay();
        showToast("Failed to delete event. Please try again.", "error");
      }
    },
    "Delete",
    "btn-danger"
  );
}

// 8. Handle event form submission
async function handleEventFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  showLoadingOverlay("Saving event...");

  try {
    let imageUrl = "";

    const imageFile = formData.get("imageFile");
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadEventImage(imageFile);
      console.log("Image uploaded successfully:", imageUrl);
    }

    const eventData = {
      title: formData.get("title").trim(),
      type: formData.get("program"),
      location: formData.get("location").trim(),
      time: formData.get("time").trim(),
      description: formData.get("description").trim(),
      date: formData.get("date"),
      image: imageUrl, // will be "" if no image selected
    };

    if (
      !eventData.title ||
      !eventData.type ||
      !eventData.description ||
      !eventData.date
    ) {
      hideLoadingOverlay();
      showToast("Please fill in all required fields.", "error");
      return;
    }

    const mode = formData.get("mode");
    const eventId = formData.get("eventId");
    console.log(eventData);
    let result;
    if (mode === "edit" && eventId) {
      result = await updateEvent(eventId, eventData);
      showToast("Event updated successfully!", "success");
    } else {
      result = await createEvent(eventData);
      showToast("Event created successfully!", "success");
    }

    hideLoadingOverlay();
    closeModal();
    await loadEvents();
    await updateDashboardCounts();
  } catch (error) {
    hideLoadingOverlay();
    console.error("Error saving event:", error);
    showToast("Failed to save event. Please try again.", "error");
  }
}

// 9. Load and display events
async function loadEvents() {
  try {
    const events = await getAllEvents();
    renderEvents(events);

    const eventCount = document.getElementById("eventCount");
    if (eventCount) {
      eventCount.textContent = events.length;
    }

    return events;
  } catch (error) {
    console.error("Error loading events:", error);
    const container = document.querySelector(".all-events");
    container.innerHTML = `
      <div class="empty-state">
        <i class='bx bx-error'></i>
        <h3>Error Loading Events</h3>
        <p>Failed to load events. Please try again.</p>
        <button class="btn btn-primary" onclick="loadEvents()">
          <i class='bx bx-refresh'></i>
          Retry
        </button>
      </div>
    `;
    return [];
  }
}
async function loadNews() {
  console.log("Loading news...");
  const container = document.querySelector(".all-news");
  container.innerHTML =
    '<div style="text-align: center; padding: 2rem;"><span class="loading"></span><p>Loading news...</p></div>';
  try {
    const news = await getAllNews();
    renderNews(news);

    const newsCount = document.getElementById("newsCount");
    if (newsCount) {
      newsCount.textContent = news.length;
    }

    return news;
  } catch (error) {
    console.error("Error loading news:", error);
    const container = document.querySelector(".all-news");
    container.innerHTML = `
      <div class="empty-state">
        <i class='bx bx-error'></i>
        <h3>Error Loading news</h3>
        <p>Failed to load news. Please try again.</p>
        <button class="btn btn-primary" onclick="loadNews()">
          <i class='bx bx-refresh'></i>
          Retry
        </button>
      </div>
    `;
    return [];
  }
}

// 10. Search events functionality
function searchEvents() {
  const searchTerm = document.getElementById("eventSearch").value.toLowerCase();
  const eventCards = document.querySelectorAll(".event-card");

  eventCards.forEach((card) => {
    const title = card
      .querySelector(".card-title-text")
      .textContent.toLowerCase();
    const description = card.textContent.toLowerCase();

    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Initialize the application
document.addEventListener("DOMContentLoaded", async () => {
  // Load dashboard data
  await updateDashboardCounts();

  // Attach event form submission handler
  const eventForm = document.getElementById("eventForm");
  if (eventForm) {
    eventForm.addEventListener("submit", handleEventFormSubmit);
  }

  // Initialize search functionality
  const searchInput = document.getElementById("eventSearch");
  if (searchInput) {
    searchInput.addEventListener("input", searchEvents);
  }

  // Set up modal close on outside click
  window.onclick = function (event) {
    const eventModal = document.getElementById("eventModal");
    const newsModal = document.getElementById("newsModal");

    if (event.target === eventModal) {
      closeModal();
    }
    if (event.target === newsModal) {
      closeNewsModal();
    }
  };
});

// Add CSS for toast animations
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
