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

// languagges:
  const tabButtons = document.querySelectorAll('.tab-btn');
  const langGroups = document.querySelectorAll('.lang-group');
  const labelIds = ['label-eventDate', 'label-eventTime', 'label-eventImage', 'label-eventProgram'];
  const sharedFields = document.getElementById('sharedFields');


  let currentLang = "en";

  const programOptions = {
    en: {
      "": "Select a program",
      Elderly: "Elderly",
      Women: "Women",
      Exceptionals: "Exceptionals",
      Youth: "Youth",
      Culture: "Culture",
      "Kids Workshops": "Kids Workshops",
      "Urban Planning": "Urban Planning",
      "Public Action": "Public Action"
    },
    ar: {
      "": "اختار برنامج",
      Elderly: "المسنين",
      Women: "النساء",
      Exceptionals: "الاستثنائيون",
      Youth: "الشبيبة",
      Culture: "الثقافة",
      "Kids Workshops": "ندوات للاطفال",
      "Urban Planning": "التخطيط العمراني",
      "Public Action": "العمل الجماهيري"
    },
    he: {
      "": "בחר תוכנית",
      Elderly: "קשישים",
      Women: "נשים",
      Exceptionals: "איחדים",
      Youth: "נוער",
      Culture: "תרבות",
      "Kids Workshops": "סדנאות לילדים",
      "Urban Planning": "תכנון עירוני",
      "Public Action": "פעולה ציבורית"
    }
  };

  const programLabels = {
  Elderly: { en: 'Elderly', ar: 'المسنين', he: 'קשישים' },
  Women: { en: 'Women', ar: 'النساء', he: 'נשים' },
  Exceptionals: { en: 'Exceptionals', ar: 'الاستثنائيون', he: 'איחדים' },
  Youth: { en: 'Youth', ar: 'الشبيبة', he: 'נוער' },
  Culture: { en: 'Culture', ar: 'الثقافة', he: 'תרבות' },
  "Kids Workshops": { en: 'Kids Workshops', ar: 'ندوات الاطفال', he: 'סדנאות לילדים' },
  "Urban Planning": { en: 'Urban Planning', ar: 'التخطيط العمراني', he: 'תכנון עירוני' },
  "Public Action": { en: 'Public Action', ar: 'العمل الجماهيري', he: 'פעולה ציבורית' },
};

// let multilingualData = {
//   title: { en: "", ar: "", he: "" },
//   location: { en: "", ar: "", he: "" },
//   description: { en: "", ar: "", he: "" }
// };
// function updateMultilingualFields(lang) {
//   document.getElementById("eventTitle").value = multilingualData.title[lang] || "";
//   document.getElementById("eventLocation").value = multilingualData.location[lang] || "";
//   document.getElementById("eventDescription").value = multilingualData.description[lang] || "";
// }

// function storeMultilingualFields(lang) {
//   multilingualData.title[lang] = document.getElementById("eventTitle").value;
//   multilingualData.location[lang] = document.getElementById("eventLocation").value;
//   multilingualData.description[lang] = document.getElementById("eventDescription").value;
// }


function populateProgramDropdown(lang) {
  const select = document.getElementById("eventProgram");
  select.innerHTML = ""; // Clear old options

  Object.keys(programLabels).forEach(key => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = programLabels[key][lang];
    select.appendChild(option);
  });
}


  function updateProgramOptions(lang) {
  const select = document.getElementById(`eventProgram_${lang}`);
  const options = programOptions[lang];
  if (!select || !options) return;

  select.innerHTML = "";
  for (const [value, label] of Object.entries(options)) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    select.appendChild(option);
  }
}

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedLang = button.getAttribute('data-lang');
    currentLang = selectedLang;

    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    langGroups.forEach(group => {
      const isActive = group.getAttribute('data-lang') === selectedLang;
      group.classList.toggle('hidden', !isActive);
    });

    // Update shared labels
    labelIds.forEach(id => {
      const label = document.getElementById(id);
      label.textContent = label.getAttribute(`data-label-${selectedLang}`);
    });

    // Update Program dropdown
    populateProgramDropdown(selectedLang);

    // Update direction
    if (selectedLang === 'ar' || selectedLang === 'he') {
      sharedFields.setAttribute('dir', 'rtl');
      sharedFields.style.textAlign = 'right';
    } else {
      sharedFields.setAttribute('dir', 'ltr');
      sharedFields.style.textAlign = 'left';
    }
  });
});
// tabButtons.forEach(button => {
//   button.addEventListener("click", () => {
//     const selectedLang = button.getAttribute("data-lang");

//     // Save current values
//     storeMultilingualFields(currentLang);

//     // Set new active language
//     currentLang = selectedLang;

//     // Toggle active class
//     tabButtons.forEach(btn => btn.classList.remove("active"));
//     button.classList.add("active");

//     // Update labels
//     labelIds.forEach(id => {
//       const label = document.getElementById(id);
//       label.textContent = label.getAttribute(`data-label-${selectedLang}`);
//     });

//     // Update shared input values
//     updateMultilingualFields(selectedLang);

//     // Update direction
//     if (["ar", "he"].includes(selectedLang)) {
//       sharedFields.setAttribute("dir", "rtl");
//       sharedFields.style.textAlign = "right";
//     } else {
//       sharedFields.setAttribute("dir", "ltr");
//       sharedFields.style.textAlign = "left";
//     }

//     // Update dropdown
//     populateProgramDropdown(selectedLang);
//   });
// });

  // Initial population
  updateProgramOptions('en');

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

  // Reset image preview
  document.getElementById("imagePreview").style.display = "none";

  // Reset and populate all program fields
  ['en', 'ar', 'he'].forEach(lang => {
    updateProgramOptions(lang);
    const select = document.getElementById(`eventProgram_${lang}`);
    if (select) select.value = "";
  });

  modal.style.display = "block";
}
populateProgramDropdown(currentLang);
//edit to choose just one item XgetAllEventsX
function setSelectedProgram(eventTypeJson) {
  const select = document.getElementById("eventProgram");
  const matchingKey = Object.keys(programLabels).find(key => 
    programLabels[key].en === eventTypeJson.en
  );

  if (matchingKey) {
    select.value = matchingKey;
  }
}

async function openEditEventModal(eventId) {
  const modal = document.getElementById("eventModal");
  const form = document.getElementById("eventForm");
  const title = document.getElementById("modalTitle");
  const imagePreview = document.getElementById("imagePreview");

  // Helper to fetch event in a given language
  async function fetchEventInLang(lang) {
    try {
      const res = await fetch(`http://localhost:8080/api/events/${eventId}?lang=${lang}`);
      return res.ok ? await res.json() : null;
    } catch (err) {
      console.error(`Error fetching ${lang} data:`, err);
      return null;
    }
  }

  // Fetch event data in all 3 languages
  const [enData, arData, heData] = await Promise.all([
    fetchEventInLang('en'),
    fetchEventInLang('ar'),
    fetchEventInLang('he'),
  ]);

  if (!enData || !arData || !heData) {
    alert("Failed to load event data in all languages.");
    return;
  }

  // Set form mode to edit
  form.querySelector('input[name="mode"]').value = "edit";
  form.querySelector('input[name="eventId"]').value = eventId;
  title.textContent = "Edit Event";

  // Shared fields (use EN for consistency)
  document.getElementById("eventDate").value = enData.date?.split("T")[0] || "";
  document.getElementById("eventTime").value = enData.time || "";
  form.querySelector('input[name="existingImage"]').value = enData.image || "";

  if (enData.image) {
    imagePreview.src = enData.image;
    imagePreview.style.display = "block";
  } else {
    imagePreview.style.display = "none";
  }

  // Set program (uses English value)
  setSelectedProgram({ en: enData.type });

  // Fill multilingual fields
  document.getElementById("title_en").value = enData.title || "";
  document.getElementById("location_en").value = enData.location || "";
  document.getElementById("description_en").value = enData.description || "";

  document.getElementById("title_ar").value = arData.title || "";
  document.getElementById("location_ar").value = arData.location || "";
  document.getElementById("description_ar").value = arData.description || "";

  document.getElementById("title_he").value = heData.title || "";
  document.getElementById("location_he").value = heData.location || "";
  document.getElementById("description_he").value = heData.description || "";

  // Language tab
  tabButtons.forEach(btn => btn.classList.remove('active'));
  langGroups.forEach(group => group.classList.add('hidden'));

  const activeTab = document.querySelector(`.tab-btn[data-lang="${currentLang}"]`);
  const activeGroup = document.querySelector(`.lang-group[data-lang="${currentLang}"]`);
  if (activeTab) activeTab.classList.add('active');
  if (activeGroup) activeGroup.classList.remove('hidden');

  if (['ar', 'he'].includes(currentLang)) {
    sharedFields.setAttribute('dir', 'rtl');
    sharedFields.style.textAlign = 'right';
  } else {
    sharedFields.setAttribute('dir', 'ltr');
    sharedFields.style.textAlign = 'left';
  }

  modal.style.display = "block";
}



// function openEditEventModal(eventId) {
//   getAllEvents().then((events) => {
//     const event = events.find((e) => e.id === eventId);
//     if (event) {
//       const modal = document.getElementById("eventModal");
//       const form = document.getElementById("eventForm");
//       const title = document.getElementById("modalTitle");

//       // Set hidden fields
//       form.querySelector('input[name="mode"]').value = 'edit';
//       form.querySelector('input[name="eventId"]').value = eventId;

//       // Shared fields
//       document.getElementById("eventDate").value = event.date.split('T')[0];
//       document.getElementById("eventTime").value = event.time || "";
//       setSelectedProgram(programLabels)
//       document.getElementById("eventProgram").value = event.type || "";

// //       multilingualData.title = event.title || { en: "", ar: "", he: "" };
// // multilingualData.location = event.location || { en: "", ar: "", he: "" };
// // multilingualData.description = event.description || { en: "", ar: "", he: "" };

// // // Load the current language values into fields
// // updateMultilingualFields(currentLang);


//       // Multilingual text fields
//       document.querySelector('input[name="title_en"]').value = event.title?.en || "";
//       document.querySelector('input[name="title_ar"]').value = event.title?.ar || "";
//       document.querySelector('input[name="title_he"]').value = event.title?.he || "";

//       document.querySelector('input[name="location_en"]').value = event.location?.en || "";
//       document.querySelector('input[name="location_ar"]').value = event.location?.ar || "";
//       document.querySelector('input[name="location_he"]').value = event.location?.he || "";

//       document.querySelector('textarea[name="description_en"]').value = event.description?.en || "";
//       document.querySelector('textarea[name="description_ar"]').value = event.description?.ar || "";
//       document.querySelector('textarea[name="description_he"]').value = event.description?.he || "";

//       // Image
//       const preview = document.getElementById("imagePreview");
//       form.querySelector('input[name="existingImage"]').value = event.image || "";
//       if (event.image) {
//         preview.src = event.image;
//         preview.style.display = "block";
//       } else {
//         preview.style.display = "none";
//       }

//       title.textContent = "Edit Event";
//       modal.style.display = "block";
//     }
//   });
// }

// async function openEditEventModal(eventId) {
//   const modal = document.getElementById("eventModal");
//   const form = document.getElementById("eventForm");
//   const title = document.getElementById("modalTitle");
//   const imagePreview = document.getElementById("imagePreview");

//   // Fetch the event
//   const eventData = await getSpecificEvent(eventId);
//   if (!eventData) {
//     alert("Failed to load event data.");
//     return;
//   }

//   // Set modal title and mode
//   title.textContent = "Edit Event";
//   form.querySelector('input[name="mode"]').value = "edit";
//   form.querySelector('input[name="eventId"]').value = eventId;

//   // Set date, time, and image (shared fields)
//   document.getElementById("eventDate").value = eventData.date || "";
//   document.getElementById("eventTime").value = eventData.time || "";
//   form.querySelector('input[name="existingImage"]').value = eventData.image || "";

//   // Show image preview if image exists
//   if (eventData.image) {
//     imagePreview.src = eventData.image;
//     imagePreview.style.display = "block";
//   } else {
//     imagePreview.style.display = "none";
//   }

//   // Set the selected program
//   setSelectedProgram(eventData.type); // eventData.type should have { en, ar, he }

//   // Fill multilingual fields
//   ['en', 'ar', 'he'].forEach(lang => {
//     const titleInput = document.getElementById(`title_${lang}`);
//     const locationInput = document.getElementById(`location_${lang}`);
//     const descInput = document.getElementById(`description_${lang}`);

//     if (titleInput) titleInput.value = eventData[`title_${lang}`] || "";
//     if (locationInput) locationInput.value = eventData[`location_${lang}`] || "";
//     if (descInput) descInput.value = eventData[`description_${lang}`] || "";
//   });

//   // Show the correct language tab
//   tabButtons.forEach(btn => btn.classList.remove('active'));
//   langGroups.forEach(group => group.classList.add('hidden'));

//   const activeTab = document.querySelector(`.tab-btn[data-lang="${currentLang}"]`);
//   const activeGroup = document.querySelector(`.lang-group[data-lang="${currentLang}"]`);
//   if (activeTab) activeTab.classList.add('active');
//   if (activeGroup) activeGroup.classList.remove('hidden');

//   // Set direction
//   if (currentLang === 'ar' || currentLang === 'he') {
//     sharedFields.setAttribute('dir', 'rtl');
//     sharedFields.style.textAlign = 'right';
//   } else {
//     sharedFields.setAttribute('dir', 'ltr');
//     sharedFields.style.textAlign = 'left';
//   }

//   // Show modal
//   modal.style.display = "block";
// }


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
    localStorage.removeItem("token");
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
        <td class="message-cell">${complaint.description || "No message"}</td>
        <td>${receivedDate}</td>
        <td>${complaint.isSolved ? "Read" : "Unread"}</td>
        <td>
        ${
          !complaint.isSolved
            ? `
            <button
              class="btn btn-sm btn-success"
              onclick="markComplaintAsRead('${complaint.id}')"
            >
              Mark Read
            </button>
            `
            : ""
        }
          
          <button class="btn btn-sm btn-danger" onclick="confirmDeleteComplaint('${
            complaint.id
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

function confirmDeleteNews(newsId, title) {
  showConfirmModal(
    "Delete News",
    `Are you sure you want to delete "${title}"? This action cannot be undone.`,
    async () => {
      showLoadingOverlay("Deleting news...");
      try {
        const res = await fetch(`http://localhost:8080/api/news/${newsId}`, {
          method: "DELETE",
        });

        if (!res.ok) throw new Error("Failed to delete");

        hideLoadingOverlay();
        showToast("News deleted successfully!", "success");
        loadNews();
        updateDashboardCounts();
      } catch (err) {
        console.error("Delete failed:", err);
        hideLoadingOverlay();
        showToast("Failed to delete news", "error");
      }
    },
    "Delete",
    "btn-danger"
  );
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
      ${
        reg.isConfirmed
          ? ""
          : `<button class="btn btn-sm btn-success" onclick="confirmRegistration('${reg.id}')">Confirm</button>`
      }
      <button class="btn btn-sm btn-danger" onclick="confirmDeleteRegistration('${
        reg.id
      }')">Delete</button>
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

async function confirmRegistration(registrationId) {
  try {
    showLoadingOverlay("Confirming registration...");

    const response = await fetch(
      `http://localhost:8080/api/joins/${registrationId}/confirm`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isConfirmed: true }),
      }
    );

    if (!response.ok) throw new Error("Failed to confirm registration");

    hideLoadingOverlay();
    showToast("Registration confirmed successfully!", "success");
    loadRegistrations();
    updateDashboardCounts();
  } catch (error) {
    hideLoadingOverlay();
    console.error("Error confirming registration:", error);
    showToast("Failed to confirm registration", "error");
  }
}
function confirmDeleteRegistration(registrationId) {
  showConfirmModal(
    "Delete Registration",
    "Are you sure you want to delete this registration? This action cannot be undone.",
    async () => {
      try {
        showLoadingOverlay("Deleting registration...");
        const res = await fetch(
          `http://localhost:8080/api/joins/${registrationId}`,
          {
            method: "DELETE",
          }
        );

        if (!res.ok) throw new Error("Failed to delete registration");

        hideLoadingOverlay();
        showToast("Registration deleted successfully!", "success");
        loadRegistrations();
        updateDashboardCounts();
      } catch (err) {
        hideLoadingOverlay();
        console.error("Delete failed:", err);
        showToast("Failed to delete registration", "error");
      }
    },
    "Delete",
    "btn-danger"
  );
}

async function changeComplaintStatus(complaintId, isSolved) {
  try {
    const res = await fetch(
      `http://localhost:8080/api/complaints/${complaintId}/solve`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isSolved: isSolved }),
      }
    );

    if (!res.ok) throw new Error("Failed to update complaint status");

    const result = await res.json();
    showToast("Complaint status updated successfully!", "success");
    loadComplaints(); // Refresh list
  } catch (error) {
    console.error("Error updating complaint status:", error);
    showToast("Failed to update complaint status", "error");
  }
}

function markComplaintAsRead(complaintId) {
  changeComplaintStatus(complaintId, true);
}

function confirmDeleteComplaint(complaintId) {
  showConfirmModal(
    "Delete Complaint",
    "Are you sure you want to delete this complaint? This action cannot be undone.",
    async () => {
      showLoadingOverlay("Deleting complaint...");
      try {
        const res = await fetch(
          `http://localhost:8080/api/complaints/${complaintId}`,
          {
            method: "DELETE",
          }
        );

        if (!res.ok) throw new Error("Failed to delete complaint");

        hideLoadingOverlay();
        showToast("Complaint deleted successfully!", "success");
        loadComplaints();
        updateDashboardCounts();
      } catch (err) {
        console.error("Delete failed:", err);
        hideLoadingOverlay();
        showToast("Failed to delete complaint", "error");
      }
    },
    "Delete",
    "btn-danger"
  );
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
    const response = await fetch(`http://localhost:8080/api/events?lang=${currentLang}`);
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

async function getSpecificEvent(eventId) {
  try {
    const response = await fetch(`http://localhost:8080/api/events/${eventId}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json(); // Full multilingual data
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
    const formattedDate = eventDate.toLocaleDateString(currentLang === "en" ? "en-US" : currentLang === "ar" ? "ar-EG" : "he-IL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = event.time || "";

    card.innerHTML = `
      <div class="card-header">
        <h4 class="card-title-text">${event.title || "Untitled Event"}</h4>
        <div class="card-actions">
          <button class="btn btn-sm btn-outline btn-primary" onclick="openEditEventModal('${event.id}')">
            <i class='bx bx-edit'></i> Edit
          </button>
          <button class="btn btn-sm btn-outline btn-danger" onclick="confirmDeleteEvent('${event.id}', '${event.title}')">
            <i class='bx bx-trash'></i> Delete
          </button>
        </div>
      </div>
      ${event.image ? `
        <div style="margin-bottom: 1rem;">
          <img src="${event.image}" alt="${event.title}" 
               style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 8px;">
        </div>` : ""}
      <div style="margin-bottom: 1rem;">
        <p><strong><i class='bx bx-calendar'></i> Date:</strong> ${formattedDate}</p>
        <p><strong><i class='bx bx-time'></i> Time:</strong> ${formattedTime}</p>
        <p><strong><i class='bx bx-map'></i> Location:</strong> ${event.location || "TBA"}</p>
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
    console.log(item);
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
            item.id
          }')">
            <i class='bx bx-edit'></i> Edit
          </button>
          <button class="btn btn-sm btn-outline btn-danger" onclick="confirmDeleteNews('${
            item.id
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

async function openEditNewsModal(newsId) {
  try {
    const res = await fetch(`http://localhost:8080/api/news/${newsId}`);
    if (!res.ok) throw new Error("Failed to load news");

    const news = await res.json();

    const modal = document.getElementById("newsModal");
    const form = document.getElementById("newsForm");
    const title = document.getElementById("newsModalTitle");

    // Populate form fields
    form.reset();
    form.querySelector('input[name="mode"]').value = "edit";
    form.querySelector('input[name="originalTitle"]').value = newsId;
    form.querySelector('input[name="existingImage"]').value = news.image || "";
    document.getElementById("newsDate").value = news.date.split("T")[0];
    document.getElementById("newsTitle").value = news.title;
    document.getElementById("newsDescription").value = news.description;

    // Preview the image if available
    const preview = document.getElementById("imagePreview");
    if (news.image) {
      preview.src = news.image;
      preview.style.display = "block";
    } else {
      preview.style.display = "none";
    }

    title.textContent = "Edit News Article";
    modal.style.display = "block";
  } catch (error) {
    console.error("Error loading news:", error);
    showToast("Failed to load news", "error");
  }
}

async function handleNewsFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  showLoadingOverlay("Saving news...");

  try {
    const mode = formData.get("mode");
    const newsId = formData.get("originalTitle");
    let imageUrl = formData.get("existingImage") || "";

    if (mode === "edit" && newsId) {
      const existingNews = await getAllNews();
      const foundNews = existingNews.find((n) => n.id === newsId);
      imageUrl = foundNews?.image || "";
    }

    const imageFile = formData.get("imageFile");
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadEventImage(imageFile);
    }

    const rawDate = formData.get("date");
    const isoDate = new Date(rawDate).toISOString();

    const newsData = {
      title: formData.get("title").trim(),
      description: formData.get("description").trim(),
      date: isoDate,
      image: imageUrl,
    };

    const token = localStorage.getItem("token");
    const url =
      mode === "edit" && newsId
        ? `http://localhost:8080/api/news/${newsId}`
        : `http://localhost:8080/api/news`;

    const method = mode === "edit" ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newsData),
    });

    if (response.status === 401) {
      showToast("Please Login Again", "error");
      window.location.href = "/adminPanel/login.html";
      return;
    }

    if (!response.ok) throw new Error("Failed to save news");

    hideLoadingOverlay();
    closeNewsModal();
    await loadNews();
    await updateDashboardCounts();
    showToast("News saved successfully!", "success");
  } catch (err) {
    console.error("Error saving news:", err);
    hideLoadingOverlay();
    showToast("Error saving news", "error");
  }
}

// 4. Create new event
async function createEvent(eventData) {
  try {
    const response = await fetch("http://localhost:8080/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(eventData),
    });

    if (response.status === 401) {
      showToast("Please Login Again", "error");
      window.location.href = "/adminPanel/login.html";
      return; // prevent further code from running
    }

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
    let imageUrl = formData.get("existingImage") || "";
    const imageFile = formData.get("imageFile");
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadEventImage(imageFile);
    }
    
    const selectedProgramKey = document.getElementById("eventProgram").value;

const eventData = {
  title: {
    en: formData.get("title_en")?.trim() || "",
    ar: formData.get("title_ar")?.trim() || "",
    he: formData.get("title_he")?.trim() || "",
  },
  description: {
    en: formData.get("description_en")?.trim() || "",
    ar: formData.get("description_ar")?.trim() || "",
    he: formData.get("description_he")?.trim() || "",
  },
  location: {
    en: formData.get("location_en")?.trim() || "",
    ar: formData.get("location_ar")?.trim() || "",
    he: formData.get("location_he")?.trim() || "",
  },
  type: {
    en: programLabels[selectedProgramKey].en,
    ar: programLabels[selectedProgramKey].ar,
    he: programLabels[selectedProgramKey].he,
  },
  date: new Date(formData.get("date")).toISOString(),
  time: formData.get("time")?.trim() || "",
  image: imageUrl,
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
// async function handleEventFormSubmit(event) {
//   event.preventDefault();

//   const form = event.target;
//   const formData = new FormData(form);

//   showLoadingOverlay("Saving event...");

//   try {
//     // 🟡 Save the current language's input values before using multilingualData
//     storeMultilingualFields(currentLang);

//     // 🟢 Handle image upload
//     let imageUrl = formData.get("existingImage") || "";
//     const imageFile = formData.get("imageFile");
//     if (imageFile && imageFile.size > 0) {
//       imageUrl = await uploadEventImage(imageFile);
//     }

//     // 🟠 Get selected program type
//     const selectedProgramKey = document.getElementById("eventProgram").value;
//     if (!selectedProgramKey) {
//       hideLoadingOverlay();
//       showToast("Please select a program type.", "error");
//       return;
//     }

//     // 🔵 Construct event data
//     const eventData = {
//       title: { ...multilingualData.title },
//       location: { ...multilingualData.location },
//       description: { ...multilingualData.description },
//       type: {
//         en: programLabels[selectedProgramKey].en,
//         ar: programLabels[selectedProgramKey].ar,
//         he: programLabels[selectedProgramKey].he,
//       },
//       date: new Date(formData.get("date")).toISOString(),
//       time: formData.get("time")?.trim() || "",
//       image: imageUrl,
//     };

//     // 🟥 Validation (make sure at least English fields are filled)
//     if (
//       !eventData.title.en.trim() ||
//       !eventData.location.en.trim() ||
//       !eventData.description.en.trim() ||
//       !eventData.type ||
//       !eventData.date
//     ) {
//       hideLoadingOverlay();
//       showToast("Please fill in all required fields (at least in English).", "error");
//       return;
//     }

//     const mode = formData.get("mode");
//     const eventId = formData.get("eventId");

//     // 🟩 Submit data to backend
//     let result;
//     if (mode === "edit" && eventId) {
//       result = await updateEvent(eventId, eventData);
//       showToast("Event updated successfully!", "success");
//     } else {
//       result = await createEvent(eventData);
//       showToast("Event created successfully!", "success");
//     }

//     hideLoadingOverlay();
//     closeModal();
//     await loadEvents();
//     await updateDashboardCounts();
//   } catch (error) {
//     hideLoadingOverlay();
//     console.error("Error saving event:", error);
//     showToast("Failed to save event. Please try again.", "error");
//   }
// }


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
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/adminPanel/login.html";
    return;
  }

  //  Handle language switching
  // let currentLang = "en";
  const languageSelect = document.getElementById("languageSelect");
  if (languageSelect) {
    languageSelect.addEventListener("change", async function () {
      currentLang = this.value;
      await loadEvents(); // Reload events in the selected language
    });
  }

  // Load dashboard data
  await updateDashboardCounts();

  // Attach event form submission handler
  const eventForm = document.getElementById("eventForm");
  if (eventForm) {
    eventForm.addEventListener("submit", handleEventFormSubmit);
  }

  const newsForm = document.getElementById("newsForm");
  if (newsForm) {
    newsForm.addEventListener("submit", handleNewsFormSubmit);
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
