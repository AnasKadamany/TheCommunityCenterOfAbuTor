// api/browser.js
(function () {
  // Base URL for all API requests
  const API_BASE_URL = "http://localhost:8080/api";

  // Helper function for making API requests
  async function fetchAPI(endpoint, options = {}) {
    try {
      const url = `${API_BASE_URL}${endpoint}`;

      // Default options for all requests
      const defaultOptions = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Merge options
      const requestOptions = {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultOptions.headers,
          ...options.headers,
        },
      };

      // Make the request
      const response = await fetch(url, requestOptions);

      // Handle errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.message ||
          errorData.error ||
          `API request failed with status ${response.status}`;
        throw new Error(errorMessage);
      }

      // Parse JSON response
      return await response.json();
    } catch (error) {
      console.error(`API request to ${endpoint} failed:`, error);
      throw error;
    }
  }

  // Create and expose the API object with all required functions
  window.API = {
    // ----- EVENTS API FUNCTIONS -----
    events: {
      // Gets all events - Maps to GET /api/events endpoint (eventController.getEvents)
      getAll: async function () {
        return fetchAPI("/events?lang=ar");
      },

      // Gets upcoming events - Maps to GET /api/events/upcoming endpoint (eventController.upcomingEvents)
      getUpcoming: async function () {
        return fetchAPI("/events/upcoming");
      },

      // Gets a specific event - Maps to GET /api/events/:id endpoint (eventController.getOneEvent)
      getById: async function (eventId) {
        if (!eventId) throw new Error("Event ID is required");
        return fetchAPI(`/events/${eventId}`);
      },

      // Helper function to format event date
      formatEventDate: function (dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const month = monthNames[date.getMonth()];

        return { day, month };
      },

      // Helper function to format event time
      formatEventTime: function (dateString) {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, "0");

        return `${formattedHours}:${formattedMinutes} ${ampm}`;
      },
    },

    // ----- NEWS API FUNCTIONS -----
    news: {
      // Gets all news - Maps to GET /api/news endpoint (newsController.getAllNews)
      getAll: async function () {
        return fetchAPI("/news?lang=ar");
      },

      // Gets a specific news item - Maps to GET /api/news/:id endpoint (newsController.getNewsById)
      getById: async function (newsId) {
        if (!newsId) throw new Error("News ID is required");
        return fetchAPI(`/news/${newsId}`);
      },

      // Helper function to format news date
      formatNewsDate: function (dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
    },

    // ----- COMPLAINT API FUNCTIONS -----
    complaints: {
      // Submit a new complaint - Maps to POST /api/complaints endpoint (complaintController.submitComplaint)
      submit: async function (complaintData) {
        // Validate required fields
        if (!complaintData.name) throw new Error("Name is required");
        if (!complaintData.phone) throw new Error("Phone is required");
        if (!complaintData.description)
          throw new Error("Description is required");

        return fetchAPI("/complaints", {
          method: "POST",
          body: JSON.stringify(complaintData),
        });
      },
    },

    // ----- EVENT REGISTRATION API FUNCTIONS -----
    registration: {
      // Register for an event - Maps to POST /api/joins endpoint (joinController.submitJoinRequest)
      submit: async function (registrationData) {
        // Validate required fields
        if (!registrationData.name) throw new Error("Name is required");
        if (!registrationData.phone) throw new Error("Phone is required");
        if (!registrationData.eventId) throw new Error("Event ID is required");
        if (!registrationData.number)
          throw new Error("Number of participants is required");
        console.log(registrationData);
        return fetchAPI("/joins", {
          method: "POST",
          body: JSON.stringify(registrationData),
        });
      },
    },

    // Utility functions
    utils: {
      // Error handling for UI
      handleError: function (error, fallbackMessage = "An error occurred") {
        console.error(error);
        return error.message || fallbackMessage;
      },

      // Loading state helpers
      showLoading: function (element) {
        if (element) element.classList.add("loading");
      },

      hideLoading: function (element) {
        if (element) element.classList.remove("loading");
      },
    },
  };
})();
