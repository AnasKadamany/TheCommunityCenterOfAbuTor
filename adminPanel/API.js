function getAllEvents() {
  return fetch("http://localhost:8080/api/events")
    .then((response) => response.json())
    .then((data) => {
      return data; // This is missing in your code!
    })
    .catch((error) => {
      console.error("Error fetching events:", error);
      return [];
    });
}
function renderEvents(events) {
  const container = document.querySelector(".all-events");
  container.innerHTML = "";

  if (!events || events.length === 0) {
    container.innerHTML = "<p>No events available.</p>";
    return;
  }

  const grouped = {};

  events.forEach((event) => {
    let eventDate = event.date || event.createdAt;

    if (!eventDate || isNaN(new Date(eventDate).getTime())) {
      console.warn("Skipping event due to invalid date:", event);
      return;
    }

    // Format: DD-MM-YYYY
    const date = new Date(eventDate).toLocaleDateString("en-GB");

    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(event);
  });

  for (const date in grouped) {
    const dateHeader = document.createElement("h3");
    dateHeader.textContent = `Events on ${date}`;
    container.appendChild(dateHeader);

    grouped[date].forEach((event) => {
      const card = document.createElement("div");
      card.className = "event-card";

      // Fix: Use the correct property names from your API response
      const eventDate = new Date(event.date || event.createdAt);

      card.innerHTML = `
        <h4>${event.title || "Untitled Event"}</h4>
        <p><strong>Time:</strong> ${eventDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}</p>
        <p><strong>Description:</strong> ${
          event.description || "No description"
        }</p>
        <p><strong>Type:</strong> ${event.type || "No type specified"}</p>
        <p><strong>Event ID:</strong> ${event.id}</p>
        <button onclick="editEvent('${event.id}', '${event.title}', '${
        event.date
      }')">Edit</button>
        <button onclick="deleteEvent('${event.id}', '${
        event.title
      }')">Delete</button>
      `;
      container.appendChild(card);
    });
  }
}

function addEvent() {
  const title = document.getElementById("eventTitle").value;
  const date = document.getElementById("eventDate").value;
  const description = document.getElementById("eventDescription").value;
  const type = document.getElementById("eventProgram").value;

  if (!title || !date || !description || !type) {
    alert("Please fill in all fields.");
    return;
  }

  const eventData = {
    title,
    date,
    description,
    type,
  };

  fetch("http://localhost:8080/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Event added:", data);
      window.location.reload();
    })
    .catch((error) => console.error("Error adding event:", error));
}

document.addEventListener("DOMContentLoaded", () => {
  const addEventButton = document.getElementById("saveEventButton");
  if (addEventButton) {
    addEventButton.addEventListener("click", addEvent);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const events = await getAllEvents();
    console.log("Fetched events:", events);

    if (events && events.length) {
      const eventCountElement = document.getElementById("eventCount");
      if (eventCountElement) {
        eventCountElement.textContent = events.length;
      }
      renderEvents(events);
    } else {
      const container = document.querySelector(".all-events");
      container.innerHTML = "<p>No events available.</p>";
    }
  } catch (error) {
    console.error("Error loading events:", error);
    const container = document.querySelector(".all-events");
    container.innerHTML = "<p>Error loading events. Please try again.</p>";
  }
});

// You'll also need to update your edit and delete functions
function editEvent(eventId, title, date) {
  console.log("Editing event:", eventId, title, date);
  // Your edit logic here
}

function deleteEvent(eventId, title) {
  console.log("Deleting event:", eventId, title);
  // Your delete logic here
}
