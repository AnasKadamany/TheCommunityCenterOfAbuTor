let currentLang = localStorage.getItem("lang") || "en";
// =============================================
// DOM Elements
// =============================================
const DOM = {
  // Programs Slider
  programsSlider: document.querySelector(".programs-slider"),
  programCards: document.querySelector(".program-cards"),
  cards: document.querySelectorAll(".program-cards .card"),
  prevArrow: document.querySelector(".slider-arrow-left"),
  nextArrow: document.querySelector(".slider-arrow-right"),

  // News Slider
  newsSlider: document.querySelector(".news-slider"),
  newsGrid: document.querySelector(".news-grid"),
  newsCards: document.querySelectorAll(".news-grid .news-card"),
  newsPrevArrow: document.querySelector(
    ".news-slider-container .slider-arrow-left"
  ),
  newsNextArrow: document.querySelector(
    ".news-slider-container .slider-arrow-right"
  ),

  // Mobile Navigation
  hamburger: document.querySelector(".hamburger"),
  navLinks: document.querySelector(".nav-links"),
  navItems: document.querySelectorAll(".nav-links li"),

  // Header
  header: document.querySelector("header"),

  // Animation Elements
  animateElements: document.querySelectorAll(
    ".animate-from-bottom, .animate-from-left, .animate-from-right"
  ),

  // Complaint Modal
  complaintBtn: document.getElementById("complaintBtn"),
  complaintModal: document.getElementById("complaintModal"),
  closeModal: document.querySelector(".close-modal"),
  complaintForm: document.getElementById("complaintForm"),
  sendCodeBtn: document.getElementById("sendCodeBtn"),
  verifyCodeBtn: document.getElementById("verifyCodeBtn"),
  step1: document.getElementById("step1"),
  step2: document.getElementById("step2"),
  step3: document.getElementById("step3"),

  // Registration Modal
  registrationModal: document.getElementById("registrationModal"),
  registrationForm: document.getElementById("registrationForm"),

  // Calendar
  prevMonthBtn: document.getElementById("prevMonth"),
  nextMonthBtn: document.getElementById("nextMonth"),
  currentMonthEl: document.getElementById("currentMonth"),
  calendarGrid: document.querySelector(".calendar-grid"),
  calendarEvents: document.getElementById("calendarEvents"),
  allEventsList: document.getElementById("allEventsList"),

  // Language Selector
  languageSelectors: document.querySelectorAll(".language-selector"),
};

// =============================================
// Constants and Configurations
// =============================================
const CONFIG = {
  programColors: {
    Elderly: "#1678B7",
    Women: "#1678B7",
    Exceptionals: "#1678B7",
    Youth: "#1678B7",
    Culture: "#1678B7",
    "Kids Workshops": "#1678B7",
    "Urban Planning": "#1678B7",
    "Public Action": "#1678B7",
  },

  events: {},
};

// =============================================
// State Management
// =============================================
const STATE = {
  // Programs Slider
  programsSlider: {
    currentIndex: 0,
    cardWidth: DOM.cards[0]?.offsetWidth + 30,
    visibleCards: 4,
  },

  // News Slider
  newsSlider: {
    currentIndex: 0,
    cardWidth: DOM.newsCards[0]?.offsetWidth + 30,
    visibleCards: 3,
    touchStartX: 0,
    touchEndX: 0,
  },

  // Complaint Modal
  complaintModal: {
    verificationData: {
      code: null,
      phone: null,
      attempts: 0,
      maxAttempts: 3,
      verified: false,
    },
  },

  // Registration Modal
  registrationModal: {
    currentEventData: null,
  },

  // Calendar
  calendar: {
    currentDate: new Date(),
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
  },

  eventData: {},
  registrationModal: {
    currentEventData: null,
  },
};

// =============================================
// Utility Functions
// =============================================
const UTILS = {
  generateVerificationCode: () =>
    Math.floor(100000 + Math.random() * 900000).toString(),

  sendVerificationCode: (phone, code) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`SMS sent to ${phone} with code: ${code}`);
        resolve(true);
      }, 1500);
    });
  },

  checkScroll: () => {
    DOM.animateElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.classList.add("animate-appear");
      }
    });

    // Force animation for events.html
    if (DOM.allEventsList) {
      const eventCards = document.querySelectorAll(".event-card");
      eventCards.forEach((card) => {
        card.classList.add("animate-appear");
      });
    }
  },
};

// =============================================
// Slider Modules
// =============================================
const SLIDERS = {
  // Programs Slider
  programs: {
    updateSlider: () => {
      if (!DOM.programsSlider || !DOM.cards.length) return;

      const sliderWidth = DOM.programsSlider.offsetWidth;

      // Calculate visible cards based on viewport width
      if (window.innerWidth <= 768) {
        STATE.programsSlider.visibleCards = 1;
      } else if (window.innerWidth <= 992) {
        STATE.programsSlider.visibleCards = 2;
      } else {
        STATE.programsSlider.visibleCards = 4;
      }

      // Calculate card width including gap
      STATE.programsSlider.cardWidth =
        sliderWidth / STATE.programsSlider.visibleCards -
        (30 * (STATE.programsSlider.visibleCards - 1)) /
          STATE.programsSlider.visibleCards;

      // Apply the calculated width to each card
      DOM.cards.forEach((card) => {
        card.style.flex = `0 0 ${STATE.programsSlider.cardWidth}px`;
      });

      SLIDERS.programs.moveSlider();
    },

    moveSlider: () => {
      if (!DOM.programCards) return;
      const maxIndex = Math.max(
        DOM.cards.length - STATE.programsSlider.visibleCards,
        0
      );
      STATE.programsSlider.currentIndex = Math.min(
        STATE.programsSlider.currentIndex,
        maxIndex
      );

      const translateValue =
        STATE.programsSlider.currentIndex *
        (STATE.programsSlider.cardWidth + 20);
      DOM.programCards.style.transform = `translateX(-${translateValue}px)`;
      SLIDERS.programs.updateArrows();
    },

    updateArrows: () => {
      if (!DOM.prevArrow || !DOM.nextArrow) return;
      const maxIndex = Math.max(
        DOM.cards.length - STATE.programsSlider.visibleCards,
        0
      );

      DOM.prevArrow.style.display =
        STATE.programsSlider.currentIndex === 0 ? "none" : "flex";
      DOM.nextArrow.style.display =
        STATE.programsSlider.currentIndex >= maxIndex ? "none" : "flex";
    },

    handleSwipe: () => {
      const swipeThreshold = 50;

      if (
        STATE.programsSlider.touchEndX <
        STATE.programsSlider.touchStartX - swipeThreshold
      ) {
        const maxIndex = Math.max(
          DOM.cards.length - STATE.programsSlider.visibleCards,
          0
        );
        STATE.programsSlider.currentIndex = Math.min(
          STATE.programsSlider.currentIndex + 1,
          maxIndex
        );
        SLIDERS.programs.moveSlider();
      } else if (
        STATE.programsSlider.touchEndX >
        STATE.programsSlider.touchStartX + swipeThreshold
      ) {
        STATE.programsSlider.currentIndex = Math.max(
          STATE.programsSlider.currentIndex - 1,
          0
        );
        SLIDERS.programs.moveSlider();
      }
    },
  },

  // News Slider
  news: {
    updateSlider: () => {
      if (!DOM.newsSlider || !DOM.newsCards.length) return;
      const sliderWidth = DOM.newsSlider.offsetWidth;
      const singleCardWidth = DOM.newsCards[0].offsetWidth + 30;
      STATE.newsSlider.visibleCards =
        window.innerWidth <= 768
          ? 1
          : Math.floor(sliderWidth / singleCardWidth);

      DOM.newsCards.forEach((card) => {
        card.style.flex = `0 0 calc(${
          100 / STATE.newsSlider.visibleCards
        }% - 20px)`;
      });

      STATE.newsSlider.cardWidth = DOM.newsCards[0].offsetWidth + 20;
      SLIDERS.news.moveSlider();
    },

    moveSlider: () => {
      if (!DOM.newsGrid) return;
      const maxIndex = Math.max(
        DOM.newsCards.length - STATE.newsSlider.visibleCards,
        0
      );
      STATE.newsSlider.currentIndex = Math.min(
        STATE.newsSlider.currentIndex,
        maxIndex
      );

      DOM.newsGrid.style.transform = `translateX(-${
        STATE.newsSlider.currentIndex * STATE.newsSlider.cardWidth
      }px)`;
      SLIDERS.news.updateArrows();
    },

    updateArrows: () => {
      if (!DOM.newsPrevArrow || !DOM.newsNextArrow) return;
      const maxIndex = Math.max(
        DOM.newsCards.length - STATE.newsSlider.visibleCards,
        0
      );

      DOM.newsPrevArrow.style.display =
        STATE.newsSlider.currentIndex === 0 ? "none" : "flex";
      DOM.newsNextArrow.style.display =
        STATE.newsSlider.currentIndex >= maxIndex ? "none" : "flex";
    },

    handleSwipe: () => {
      const swipeThreshold = 50;

      if (
        STATE.newsSlider.touchEndX <
        STATE.newsSlider.touchStartX - swipeThreshold
      ) {
        const maxIndex = Math.max(
          DOM.newsCards.length - STATE.newsSlider.visibleCards,
          0
        );
        STATE.newsSlider.currentIndex = Math.min(
          STATE.newsSlider.currentIndex + 1,
          maxIndex
        );
        SLIDERS.news.moveSlider();
      } else if (
        STATE.newsSlider.touchEndX >
        STATE.newsSlider.touchStartX + swipeThreshold
      ) {
        STATE.newsSlider.currentIndex = Math.max(
          STATE.newsSlider.currentIndex - 1,
          0
        );
        SLIDERS.news.moveSlider();
      }
    },
  },
};

// =============================================
// Modal Modules
// =============================================
const MODALS = {
  complaint: {
    resetForm: () => {
      DOM.step1.style.display = "block";
      DOM.step2.style.display = "none";
      DOM.step3.style.display = "none";
      document.getElementById("verificationCode").value = "";
      STATE.complaintModal.verificationData = {
        code: null,
        phone: null,
        attempts: 0,
        maxAttempts: 3,
        verified: false,
      };
    },

    handleSendCode: async () => {
      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();

      if (!name || !phone) {
        alert("Please enter both name and phone number");
        return;
      }

      // Skip to the complaint textarea (step 3)
      DOM.step1.style.display = "none";
      DOM.step3.style.display = "block";
    },

    handleVerifyCode: () => {
      console.log("Verification skipped — direct complaint mode.");
    },

    handleSubmit: async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email =
        document.getElementById("complaint-email").value.trim() || null;
      const description = document.getElementById("complaint").value.trim();

      if (!name || !phone || !description) {
        alert("Please fill in all fields before submitting.");
        return;
      }

      const submitButton = DOM.complaintForm.querySelector(
        'button[type="submit"]'
      );
      const originalText = submitButton.textContent;
      submitButton.classList.add("loading");
      submitButton.textContent = "Submitting...";
      submitButton.disabled = true;

      try {
        await API.complaints.submit({ name, phone, email, description });
        showToast("Complaint submitted successfully!", "success");
        DOM.complaintForm.reset();
        MODALS.complaint.resetForm();
        DOM.complaintModal.classList.remove("show");
        document.body.style.overflow = "auto";
      } catch (error) {
        console.error("Failed to submit complaint:", error);
        showToast(
          "There was a problem submitting your complaint. Please try again.",
          "error"
        );
      } finally {
        submitButton.classList.remove("loading");
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    },
  },

  registration: {
    attachRegisterListeners: () => {
      document
        .querySelectorAll(".event-card .btn.small, .event-item .btn")
        .forEach((btn) => {
          btn.removeEventListener(
            "click",
            MODALS.registration.handleRegisterClick
          );
          btn.addEventListener(
            "click",
            MODALS.registration.handleRegisterClick
          );
        });
    },

    handleRegisterClick: function (e) {
      e.preventDefault();
      const eventCard = this.closest(".event-card, .event-item");

      // Get the event ID
      const eventId = eventCard.getAttribute("data-event-id");

      // Get event info
      const dateElement = eventCard.querySelector(".event-date");
      const calendarDay = eventCard.closest(".calendar-day");

      STATE.registrationModal.currentEventData = {
        id: eventId, // Store the ID
        title: eventCard.querySelector("h3").textContent,
        date: dateElement
          ? `${dateElement.querySelector(".month").textContent} ${
              dateElement.querySelector(".day").textContent
            }`
          : calendarDay
          ? `${DOM.currentMonthEl.textContent.split(" ")[0]} ${
              calendarDay.querySelector(".day-number").textContent
            }`
          : "N/A",
        time: eventCard.querySelector("p:nth-of-type(2)")
          ? eventCard
              .querySelector("p:nth-of-type(2)")
              .textContent.replace(/^\s*[^:]*:\s*/, "")
          : eventCard.querySelector("p")
          ? eventCard.querySelector("p").textContent
          : "N/A",
        location: eventCard.querySelector("p:first-of-type")
          ? eventCard
              .querySelector("p:first-of-type")
              .textContent.replace(/^\s*[^:]*:\s*/, "")
          : "Community Center",
        program: eventCard.getAttribute("data-program"),
      };

      document.getElementById("reg-event").value =
        STATE.registrationModal.currentEventData.title;
      document.getElementById(
        "reg-date"
      ).value = `${STATE.registrationModal.currentEventData.date}, ${STATE.registrationModal.currentEventData.time}`;

      DOM.registrationModal.classList.add("show");
      document.body.style.overflow = "hidden";
      applyTranslations(currentLang);
    },

    handleSubmit: async (e) => {
      e.preventDefault();

      const name = document.getElementById("reg-name").value;
      const phone = document.getElementById("reg-phone").value;
      const participants = document.getElementById("reg-participants").value;
      const eventId = STATE.registrationModal.currentEventData.id;
      const title = STATE.registrationModal.currentEventData.title.trim();

      // Show loading state
      const submitButton = DOM.registrationForm.querySelector(
        'button[type="submit"]'
      );
      applyTranslations(currentLang);
      const originalText = submitButton.textContent;
      submitButton.classList.add("loading");
      submitButton.textContent = "Registering...";
      submitButton.disabled = true;

      try {
        const reason = translations["ar"][title] || title;
        console.log("Reason:", reason);
        // Send registration to server using API
        await API.registration.submit({
          name,
          eventId,
          phone,
          number: parseInt(participants),
          reason,
        });

        // Show success message
        showToast(
          `Thank you, ${name}! You have successfully registered ${participants} participant(s) for "${STATE.registrationModal.currentEventData.title}".`,
          "success"
        );

        // Reset form and close modal
        DOM.registrationForm.reset();
        DOM.registrationModal.classList.remove("show");
        document.body.style.overflow = "auto";
        STATE.registrationModal.currentEventData = null;
      } catch (error) {
        console.error("Failed to submit registration:", error);
        showToast(
          "There was a problem with your registration. Please try again.",
          "error"
        );
      } finally {
        // Reset button state
        submitButton.classList.remove("loading");
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    },
  },
};

// =============================================
// Calendar Module
// =============================================
const CALENDAR = {
  populateAllEvents: () => {
    if (!DOM.allEventsList) return;

    DOM.allEventsList.innerHTML = "";
    const eventArray = [];

    // Convert events object to array
    for (const dateKey in CONFIG.events) {
      const [day, month, year] = dateKey.split("-").map(Number);
      CONFIG.events[dateKey].forEach((event) => {
        eventArray.push({
          dateKey,
          day,
          month: month - 1,
          year,
          ...event,
        });
      });
    }

    // Sort events by date
    eventArray.sort(
      (a, b) =>
        new Date(a.year, a.month, a.day) - new Date(b.year, b.month, b.day)
    );

    // Display message if no events
    if (eventArray.length === 0) {
      DOM.allEventsList.innerHTML = "<p>No upcoming events available.</p>";
      return;
    }

    // Render events
    eventArray.forEach((event) => {
      const eventCard = document.createElement("div");
      eventCard.classList.add("event-card", "animate-from-bottom");
      eventCard.setAttribute("data-program", event.program);

      // Add data-event-id attribute if available
      if (event.id) {
        eventCard.setAttribute("data-event-id", event.id);
      }

      const monthDisplay = getTranslatedMonth(event.month);
      const programColor = CONFIG.programColors[event.program] || "#4a6fa5";

      eventCard.innerHTML = `
      <div class="event-date">
        <span class="day">${event.day}</span>
        <span class="month">${monthDisplay}</span>
      </div>
      <div class="event-info">
        <h3>${event.title}</h3>
        <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
        <p><i class="fas fa-clock"></i> ${event.time}</p>
        <p><i class="fas fa-tag"></i> <span class="program-badge" style="background-color: ${programColor}">${event.program}</span></p>
        <p>${event.description}</p>
        <a href="#" class="btn small" style="background-color: ${programColor}; border-color: ${programColor};" data-i18n="register">Register</a>
      </div>
    `;

      DOM.allEventsList.appendChild(eventCard);
    });

    // Add animations and attach event listeners
    DOM.allEventsList.querySelectorAll(".event-card").forEach((card) => {
      card.classList.add("animate-appear");
    });

    MODALS.registration.attachRegisterListeners();
    applyTranslations(currentLang);
  },

  renderCalendar: () => {
    if (!DOM.calendarGrid || !DOM.currentMonthEl) return;

    // Clear existing calendar days (keep day headers)
    while (DOM.calendarGrid.children.length > 7) {
      DOM.calendarGrid.removeChild(DOM.calendarGrid.lastChild);
    }

    const monthKeys = [
      "monthJan",
      "monthFeb",
      "monthMar",
      "monthApr",
      "monthMay",
      "monthJun",
      "monthJul",
      "monthAug",
      "monthSep",
      "monthOct",
      "monthNov",
      "monthDec",
    ];

    const currentMonthKey = monthKeys[STATE.calendar.currentMonth];
    const translatedMonth =
      translations[currentLang]?.[currentMonthKey] ||
      monthKeys[STATE.calendar.currentMonth];

    DOM.currentMonthEl.textContent = `${translatedMonth} ${STATE.calendar.currentYear}`;

    // Calculate first day of month and days in month
    const firstDay = new Date(
      STATE.calendar.currentYear,
      STATE.calendar.currentMonth,
      1
    ).getDay();
    const daysInMonth = new Date(
      STATE.calendar.currentYear,
      STATE.calendar.currentMonth + 1,
      0
    ).getDate();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      const emptyDay = document.createElement("div");
      emptyDay.classList.add("calendar-day", "empty");
      DOM.calendarGrid.appendChild(emptyDay);
    }

    // Add days of the month
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("calendar-day");

      // Highlight today
      if (
        i === today.getDate() &&
        STATE.calendar.currentMonth === today.getMonth() &&
        STATE.calendar.currentYear === today.getFullYear()
      ) {
        dayElement.classList.add("today");
      }

      // Add day number
      const dayNumber = document.createElement("div");
      dayNumber.classList.add("day-number");
      dayNumber.textContent = i;
      dayElement.appendChild(dayNumber);

      // Add event indicator if day has events
      const dateKey = `${i}-${STATE.calendar.currentMonth + 1}-${
        STATE.calendar.currentYear
      }`;
      if (CONFIG.events[dateKey]) {
        const eventIndicator = document.createElement("span");
        eventIndicator.classList.add("event-indicator");
        dayElement.appendChild(eventIndicator);
      }

      // Add click event to show events for the day
      dayElement.addEventListener("click", () => {
        CALENDAR.showEventsForDay(
          i,
          STATE.calendar.currentMonth,
          STATE.calendar.currentYear
        );
      });

      DOM.calendarGrid.appendChild(dayElement);
    }

    // Show today's events if viewing current month
    if (
      STATE.calendar.currentMonth === today.getMonth() &&
      STATE.calendar.currentYear === today.getFullYear()
    ) {
      CALENDAR.showEventsForDay(
        today.getDate(),
        STATE.calendar.currentMonth,
        STATE.calendar.currentYear
      );
    }
  },

  showEventsForDay: (day, month, year) => {
    if (!DOM.calendarEvents) return;

    const dateKey = `${day}-${month + 1}-${year}`;
    const dayEvents = CONFIG.events[dateKey] || [];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Clear existing events (keep title)
    while (DOM.calendarEvents.children.length > 1) {
      DOM.calendarEvents.removeChild(DOM.calendarEvents.lastChild);
    }

    // Set date title
    DOM.calendarEvents.querySelector(
      "#eventDateTitle"
    ).textContent = `${monthNames[month]} ${day}, ${year}`;

    // Display message if no events
    if (dayEvents.length === 0) {
      const noEvents = document.createElement("p");
      noEvents.setAttribute("data-i18n", "NoEventsForDay");
      noEvents.textContent = "No events scheduled for this day.";
      noEvents.classList.add("no-events");
      DOM.calendarEvents.appendChild(noEvents);
      applyTranslations(currentLang);
      return;
    }

    // Create event items
    dayEvents.forEach((event) => {
      const eventItem = document.createElement("div");
      eventItem.classList.add("event-item");
      eventItem.setAttribute("data-program", event.program);

      const eventTitle = document.createElement("h5");
      eventTitle.textContent = event.title;

      const programBadge = document.createElement("span");
      programBadge.classList.add("program-badge");
      programBadge.textContent = event.program;

      if (CONFIG.programColors[event.program]) {
        programBadge.style.backgroundColor =
          CONFIG.programColors[event.program];
      }

      const eventDetails = document.createElement("p");
      eventDetails.innerHTML = `
          <i class="fas fa-clock"></i> ${event.time} 
          <br><i class="fas fa-map-marker-alt"></i> ${event.location}
          <br><i class="fas fa-tag"></i> `;
      eventDetails.appendChild(programBadge);

      const eventDescription = document.createElement("p");
      eventDescription.textContent = event.description;
      eventDescription.classList.add("event-description");

      const registerBtn = document.createElement("a");
      registerBtn.href = "#";
      registerBtn.classList.add("btn", "small");
      registerBtn.setAttribute("data-i18n", "register");
      registerBtn.textContent =
        translations[currentLang]?.register || "Register";

      if (CONFIG.programColors[event.program]) {
        registerBtn.style.backgroundColor = CONFIG.programColors[event.program];
        registerBtn.style.borderColor = CONFIG.programColors[event.program];
      }

      registerBtn.addEventListener("click", (e) => {
        e.preventDefault();

        STATE.registrationModal.currentEventData = {
          title: event.title,
          date: `${monthNames[month]} ${day}`,
          time: event.time,
          location: event.location,
          program: event.program,
        };

        document.getElementById("reg-event").value =
          STATE.registrationModal.currentEventData.title;
        document.getElementById(
          "reg-date"
        ).value = `${STATE.registrationModal.currentEventData.date}, ${STATE.registrationModal.currentEventData.time}`;
        DOM.registrationModal.classList.add("show");
        document.body.style.overflow = "hidden";
      });

      eventItem.appendChild(eventTitle);
      eventItem.appendChild(eventDetails);
      eventItem.appendChild(eventDescription);
      eventItem.appendChild(registerBtn);
      DOM.calendarEvents.appendChild(eventItem);
    });
    applyTranslations(currentLang);
  },

  navigateMonth: (direction) => {
    if (direction === "prev") {
      STATE.calendar.currentMonth--;
      if (STATE.calendar.currentMonth < 0) {
        STATE.calendar.currentMonth = 11;
        STATE.calendar.currentYear--;
      }
    } else {
      STATE.calendar.currentMonth++;
      if (STATE.calendar.currentMonth > 11) {
        STATE.calendar.currentMonth = 0;
        STATE.calendar.currentYear++;
      }
    }
    CALENDAR.renderCalendar();
  },
};

// =============================================
// Navigation Module
// =============================================
const NAVIGATION = {
  initMobileNav: () => {
    if (DOM.hamburger) {
      DOM.hamburger.addEventListener("click", () => {
        DOM.hamburger.classList.toggle("active");
        DOM.navLinks.classList.toggle("active");
      });
    }

    DOM.navItems.forEach((item) => {
      item.addEventListener("click", () => {
        DOM.hamburger?.classList.remove("active");
        DOM.navLinks?.classList.remove("active");
      });
    });
  },

  initHeaderScroll: () => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        DOM.header?.classList.add("scrolled");
      } else {
        DOM.header?.classList.remove("scrolled");
      }
    });
  },

  initSmoothScroll: () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          });
        }
      });
    });
  },
};

// =============================================
// Language Selector Module
// =============================================
const LANGUAGE = {
  init: () => {
    DOM.languageSelectors?.forEach((selector) => {
      const toggle = selector.querySelector(".language-toggle");
      const menu = selector.querySelector(".language-menu");

      if (toggle && menu) {
        toggle.addEventListener("click", (e) => {
          e.stopPropagation();
          menu.classList.toggle("active");
        });

        // Close when clicking outside
        document.addEventListener("click", (e) => {
          if (!selector.contains(e.target)) {
            menu.classList.remove("active");
          }
        });
      }
    });
  },
};

// =============================================
// Event Listeners
// =============================================
const initEventListeners = () => {
  // Programs Slider
  if (DOM.prevArrow) {
    DOM.prevArrow.addEventListener("click", () => {
      STATE.programsSlider.currentIndex = Math.max(
        STATE.programsSlider.currentIndex - 1,
        0
      );
      SLIDERS.programs.moveSlider();
    });
  }

  if (DOM.nextArrow) {
    DOM.nextArrow.addEventListener("click", () => {
      const maxIndex = Math.max(
        DOM.cards.length - STATE.programsSlider.visibleCards,
        0
      );
      STATE.programsSlider.currentIndex = Math.min(
        STATE.programsSlider.currentIndex + 1,
        maxIndex
      );
      SLIDERS.programs.moveSlider();
    });
  }

  if (DOM.programsSlider) {
    DOM.programsSlider.addEventListener(
      "touchstart",
      (e) => {
        STATE.programsSlider.touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    DOM.programsSlider.addEventListener(
      "touchend",
      (e) => {
        STATE.programsSlider.touchEndX = e.changedTouches[0].screenX;
        SLIDERS.programs.handleSwipe();
      },
      { passive: true }
    );
  }

  // News Slider
  if (DOM.newsPrevArrow) {
    DOM.newsPrevArrow.addEventListener("click", () => {
      STATE.newsSlider.currentIndex = Math.max(
        STATE.newsSlider.currentIndex - 1,
        0
      );
      SLIDERS.news.moveSlider();
    });
  }

  if (DOM.newsNextArrow) {
    DOM.newsNextArrow.addEventListener("click", () => {
      const maxIndex = Math.max(
        DOM.newsCards.length - STATE.newsSlider.visibleCards,
        0
      );
      STATE.newsSlider.currentIndex = Math.min(
        STATE.newsSlider.currentIndex + 1,
        maxIndex
      );
      SLIDERS.news.moveSlider();
    });
  }

  if (DOM.newsSlider) {
    DOM.newsSlider.addEventListener(
      "touchstart",
      (e) => {
        STATE.newsSlider.touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    DOM.newsSlider.addEventListener(
      "touchend",
      (e) => {
        STATE.newsSlider.touchEndX = e.changedTouches[0].screenX;
        SLIDERS.news.handleSwipe();
      },
      { passive: true }
    );
  }

  // Window resize
  window.addEventListener("resize", () => {
    SLIDERS.programs.updateSlider();
    SLIDERS.news.updateSlider();
  });

  // Complaint Modal
  if (DOM.complaintBtn) {
    DOM.complaintBtn.addEventListener("click", () => {
      MODALS.complaint.resetForm();
      DOM.complaintModal.classList.add("show");
      document.body.style.overflow = "hidden";
    });
  }

  if (DOM.closeModal) {
    DOM.closeModal.addEventListener("click", () => {
      DOM.complaintModal.classList.remove("show");
      document.body.style.overflow = "auto";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === DOM.complaintModal) {
      DOM.complaintModal.classList.remove("show");
      document.body.style.overflow = "auto";
    }
  });

  if (DOM.sendCodeBtn) {
    DOM.sendCodeBtn.addEventListener("click", MODALS.complaint.handleSendCode);
  }

  if (DOM.verifyCodeBtn) {
    DOM.verifyCodeBtn.addEventListener(
      "click",
      MODALS.complaint.handleVerifyCode
    );
  }

  if (DOM.complaintForm) {
    DOM.complaintForm.addEventListener("submit", MODALS.complaint.handleSubmit);
  }

  // Registration Modal
  document
    .querySelectorAll("#registrationModal .close-modal")
    .forEach((closeBtn) => {
      closeBtn.addEventListener("click", () => {
        DOM.registrationModal.classList.remove("show");
        document.body.style.overflow = "auto";
      });
    });

  window.addEventListener("click", (e) => {
    if (e.target === DOM.registrationModal) {
      DOM.registrationModal.classList.remove("show");
      document.body.style.overflow = "auto";
    }
  });

  if (DOM.registrationForm) {
    DOM.registrationForm.addEventListener(
      "submit",
      MODALS.registration.handleSubmit
    );
  }

  // Calendar Navigation
  if (DOM.prevMonthBtn) {
    DOM.prevMonthBtn.addEventListener("click", () =>
      CALENDAR.navigateMonth("prev")
    );
  }

  if (DOM.nextMonthBtn) {
    DOM.nextMonthBtn.addEventListener("click", () =>
      CALENDAR.navigateMonth("next")
    );
  }

  // Scroll events
  window.addEventListener("scroll", UTILS.checkScroll);
  window.addEventListener("load", UTILS.checkScroll);
};

// =============================================
// Initialization
// =============================================
document.addEventListener("DOMContentLoaded", async () => {
  console.log("Page loaded, initializing...");
  currentLang = localStorage.getItem("lang") || "en";
  // Initialize UI components
  SLIDERS.programs.updateSlider();
  SLIDERS.news.updateSlider();

  // Initialize navigation
  NAVIGATION.initMobileNav();
  NAVIGATION.initHeaderScroll();
  NAVIGATION.initSmoothScroll();

  // Initialize language selector
  LANGUAGE.init();

  // Initialize event listeners
  initEventListeners();

  // Initial scroll check
  UTILS.checkScroll();

  try {
    await loadEventsFromBackend(); // 🟢 Wait for dynamic event cards to load
    applyTranslations(currentLang); // 🟢 Apply translation after they are in the DOM

    // Load news only if on news page
    if (DOM.newsGrid) {
      await loadNewsFromBackend();
    }
  } catch (error) {
    console.error("Error loading data:", error);
  }
});

// =============================================
// API Functions
// =============================================

// Load events from backend
async function loadEventsFromBackend() {
  try {
    console.log("Loading events from backend...");

    const events = await API.events.getAll();

    console.log("Events loaded:", events);

    // Process events for the calendar
    processEventsForCalendar(events);

    // Update UI based on which page we're on
    if (DOM.allEventsList) {
      CALENDAR.populateAllEvents();
    } else {
      // For homepage
      updateEventCards(events.slice(0, Math.min(3, events.length))); // Show first 3
      CALENDAR.renderCalendar();
    }

    // Ensure event listeners are attached
    MODALS.registration.attachRegisterListeners();
    applyTranslations(currentLang);
  } catch (error) {
    console.error("Failed to load events:", error);
  }
}

// Process events for the calendar
function processEventsForCalendar(events) {
  // Reset events
  CONFIG.events = {};

  // Store original events for later reference
  STATE.eventData = {};

  events.forEach((event) => {
    // Store the original event
    STATE.eventData[event.id] = event;

    // Format date for calendar
    const eventDate = new Date(event.date);
    const day = eventDate.getDate();
    const month = eventDate.getMonth() + 1;
    const year = eventDate.getFullYear();
    const dateKey = `${day}-${month}-${year}`;

    // Format time using API helper
    const time = API.events.formatEventTime(event.date);

    // Add to calendar data
    if (!CONFIG.events[dateKey]) {
      CONFIG.events[dateKey] = [];
    }

    CONFIG.events[dateKey].push({
      id: event.id,
      title: event.title,
      time: time,
      location: event.location || "Community Center",
      description: event.description,
      program: event.type || "General",
    });
  });
}

// Update event cards on homepage

function updateEventCards(events) {
  console.log(
    "updateEventCards called with",
    events ? events.length : 0,
    "events"
  );

  // Find the event list container
  const eventList = document.querySelector(".event-list");
  if (!eventList) {
    console.error("Event list container not found!");
    return;
  }

  // Clear existing events
  eventList.innerHTML = "";

  // Check if we have events to display
  if (!events || events.length === 0) {
    console.log("No events to display");
    eventList.innerHTML = "<p>No upcoming events available.</p>";
    return;
  }

  // Process each event
  events.forEach((event, index) => {
    console.log(`Processing event ${index + 1}:`, event.title);

    // Safely format date - handle any potential errors
    let day = "1";
    let month = "Jan";
    let time = "12:00 PM";

    try {
      // Convert to Date object if it's a string
      const eventDate =
        typeof event.date === "string" ? new Date(event.date) : event.date;

      // Get day
      day = eventDate.getDate();

      // Get month
      month = getTranslatedMonth(eventDate.getMonth());

      // Format time
      time = event.time || "—";
    } catch (error) {
      console.error("Error formatting date for event:", error);
    }

    // Get program color
    const programColor = CONFIG.programColors[event.type] || "#4a6fa5";

    // Create event card with direct HTML insertion
    const cardHTML = `
      <div class="event-card animate-from-bottom" data-program="${
        event.type || "General"
      }" data-event-id="${event.id || index}">
        <div class="event-date" style="background-color: ${programColor};">
          <span class="day">${day}</span>
          <span class="month">${month}</span>
        </div>
        <div class="event-info">
          <h3>${event.title || "Untitled Event"}</h3>
          <p><i class="fas fa-map-marker-alt"></i> ${
            event.location || "Community Center"
          }</p>
          <p><i class="fas fa-clock"></i> ${time}</p>
          <p><i class="fas fa-tag"></i> <span class="program-badge" style="background-color: ${programColor};">${
      event.type || "General"
    }</span></p>
          <p>${event.description || "No description available."}</p>
          <a href="#" class="btn small" style="background-color: ${programColor}; border-color: ${programColor};" data-i18n="register">Register</a>
        </div>
      </div>
    `;

    // Add card to DOM
    eventList.innerHTML += cardHTML;
  });

  // Force animations to appear immediately
  document.querySelectorAll(".event-card").forEach((card) => {
    card.classList.add("animate-appear");
  });

  // Attach event listeners
  MODALS.registration.attachRegisterListeners();

  console.log("Event cards rendered successfully");
  applyTranslations(currentLang);
}

// Load news from backend
// Add a flag to prevent multiple news loading
let newsLoaded = false;

async function loadNewsFromBackend() {
  // Prevent multiple API calls
  if (newsLoaded) {
    console.log("News already loaded, skipping");
    return;
  }

  try {
    console.log("Loading news from backend...");

    // Check if we're on a page with news section
    if (!DOM.newsGrid) {
      return;
    }

    // Mark as loaded
    newsLoaded = true;

    // Get news from API
    const response = await API.news.getAll();

    // Extract news items
    let newsItems = [];
    if (response && response.news && Array.isArray(response.news)) {
      newsItems = response.news;
    } else if (Array.isArray(response)) {
      newsItems = response;
    }

    console.log("Total news items from API:", newsItems.length);

    // Thorough deduplication
    const uniqueNewsMap = new Map();

    newsItems.forEach((item) => {
      // Create a unique key based on multiple properties
      const key =
        item.id ||
        item.title +
          "-" +
          (item.date ? new Date(item.date).toISOString().split("T")[0] : "");

      // Only add if not already in our map
      if (!uniqueNewsMap.has(key)) {
        uniqueNewsMap.set(key, item);
      }
    });

    // Convert back to array
    const dedupedNews = Array.from(uniqueNewsMap.values());
    console.log(
      "After deduplication:",
      dedupedNews.length,
      "unique news items"
    );

    console.log(dedupedNews);

    // Update the news section
    updateNewsUI(dedupedNews);
  } catch (error) {
    console.error("Failed to load news:", error);
  }
}

function updateNewsUI(newsItems) {
  // Check if we're on a page with news section
  if (!DOM.newsGrid) return;

  // Clear existing news
  DOM.newsGrid.innerHTML = "";

  // If no news items, add a message
  if (!newsItems || newsItems.length === 0) {
    const noNewsMessage = document.createElement("p");
    noNewsMessage.className = "no-news";
    noNewsMessage.textContent = "No news available at this time.";
    DOM.newsGrid.appendChild(noNewsMessage);
    return;
  }

  // Add each news item
  newsItems.forEach((item) => {
    try {
      // Format date safely
      let formattedDate;
      try {
        if (typeof API.news.formatNewsDate === "function") {
          formattedDate = API.news.formatNewsDate(item.date);
        } else {
          const date = new Date(item.date);
          formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        }
      } catch (error) {
        formattedDate = "Recent update";
      }

      // Create news card
      const newsCard = document.createElement("div");
      newsCard.classList.add("news-card", "animate-from-bottom");

      newsCard.innerHTML = `
        <div class="news-image" style="background-image: url('${
          item.image ||
          "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        }');"></div>
        <div class="news-content">
          <span class="news-date">${formattedDate}</span>
          <h3>${item.title || "News Update"}</h3>
          <p>${item.description || "No description available."}</p>
        </div>
      `;

      DOM.newsGrid.appendChild(newsCard);

      // Make the animation appear
      newsCard.classList.add("animate-appear");
    } catch (error) {
      console.error("Error rendering news card:", error);
    }
  });

  // Update DOM references for the slider
  DOM.newsCards = document.querySelectorAll(".news-grid .news-card");

  // Reinitialize the slider
  setTimeout(() => SLIDERS.news.updateSlider(), 100);
}
function getTranslatedMonth(index) {
  const keys = [
    "monthJan",
    "monthFeb",
    "monthMar",
    "monthApr",
    "monthMay",
    "monthJun",
    "monthJul",
    "monthAug",
    "monthSep",
    "monthOct",
    "monthNov",
    "monthDec",
  ];
  return translations[currentLang]?.[keys[index]] || keys[index];
}

// Translation dictionary

const translations = {
  en: {
    homeTitle: "Empowering Our Community Together",
    homeSubtitle:
      "Welcome to AbuTor community center website! join us to have a mind altering experience and make our little world better.",
    programsHeader: "Programs Overview",
    programsDescription:
      "Engage in our diverse programs that cater to teens, kids, and the elderly. From educational workshops to sports classes, we provide a range of activities to suit different interests and age groups.",
    joinNow: "Join Now",
    eventsHeader: "Upcoming Events",
    eventsDescription:
      "Join our exciting events and classes. Register online to secure your spot!",
    viewAllEvents: "View All Events",
    calendarHeader: "Event Calendar",
    calendarDescription:
      "Check our calendar for upcoming events and classes. Click on any event to register.",
    newsHeader: "Community News",
    newsDescription:
      "Stay updated with what's happening in our community center.",
    contactUs: "Contact Us",
    quickLinks: "Quick Links",
    emailUs: "Email us!",
    footerTagline:
      "There must be a wind to dispel the clouds and the sun, in her golden ascent, shall cleanse the heart of every care. From you to you since 2015.",
    complaintBtn: "Make a Complaint",
    complaintModalTitle: "Make a Complaint",
    yourName: "Your Name",
    phoneNumber: "Phone Number",
    sendVerificationCode: "Send Verification Code",
    verificationCode: "Verification Code",
    verifyCode: "Verify Code",
    complaintDetails: "Complaint Details",
    submitComplaint: "Submit Complaint",
    registerEvent: "Register for Event",
    numberOfParticipants: "Number of Participants (Max 5)",
    event: "Event",
    dateTime: "Date & Time",
    completeRegistration: "Complete Registration",
    home: "home",
    programs: "programs",
    events: "events",
    calendar: "calendar",
    news: "news",
    contact: "contact",
    lang: "Language",
    en: "English",
    ar: "العربية",
    he: "Hebrew",
    community: "AbuTor",
    center: "Community Center",
    viewourprograms: "View Our Programs",
    ProgramsOverview: "Programs Overview",
    Engageinour:
      "Engage in our diverse programs that cater to teens, kids, and the elderly. From educational workshops to sports classes, we provide a range of activities to suit different interests and age groups.",
    JoinNow: "Join Now",
    Elderly: "Elderly",
    Providinga:
      "Providing a healthy, social, and recreational framework for the golden generation.",
    Women: "Women",
    enhancingWomen:
      "enhancing Women's personal development through courses in leadership, communication, and time management.",
    Exceptionals: "Exceptionals",
    Enhancesocial:
      "Enhance social skills and connections, and emphasize the vital role this group plays in social inclusion.",
    Youth: "Youth",
    Engagingyouth:
      "Engaging youth in activities that foster personal growth, strengthen social belonging, and encourage leadership.",
    Culture: "Culture",
    Supportingand:
      "Supporting and promoting the cultural aspect of society by celebrating religious and community occasions.",
    KidsWorkshops: "Kids Workshops",
    Fosteringcultural:
      "Fostering cultural awareness among children nurture a sense of belonging and togetherness.",
    UrbanPlanning: "Urban Planning",
    professionally:
      "professionally bridges community planning needs with city planning authorities, with the main goal of enhancing quality of life.",
    PublicAction: "Public Action",
    Asocialserv:
      "A social service that enhances individuals' social skills through group experiences and better problem-solving.",
    UpcomingEvents: "Upcoming Events",
    Joinour:
      "Join our exciting events and classes. Register online to secure your spot!",
    ViewAll: "View All Events",
    CommunityNews: "Community News",
    Stayupdated: "Stay updated with what's happening in our community center.",
    CommunityCenterfooter: "Community Center",
    Theremustbea:
      "There must be a wind to dispel the clouds and the sun, in her golden ascent, shall cleanse the heart of every care.",
    br: "From you to you since 2015.",
    QuickLinks: "Quick Links",
    Home: "Home",
    Programs: "Programs",
    Events: "Events",
    Calendar: "Calendar",
    News: "News",
    ContactUs: "Contact Us",
    Hamefaked: "5 Hamefaked St, Abu Tor",
    num: "(02) 677-5459",
    hours: "Sun - Thu: 8:30AM - 5PM",
    emai: "Email us!",
    Sharewithus: "Share with us your thought and what withn your heart.",
    emailPlaceholder: "Your Email",
    footerCopyright: "© 2025 Community Center. All Rights Reserved.",
    EventCalendar: "Event Calendar",
    Checkourcalendar:
      "Check our calendar for upcoming events and classes. Click on any event to register.",
    daySun: "Sun",
    dayMon: "Mon",
    dayTue: "Tue",
    dayWed: "Wed",
    dayThu: "Thu",
    dayFri: "Fri",
    daySat: "Sat",
    TodayEvents: "Today's Events",
    MakeeaComplaint: "Make a Complaint",
    YourName: "Your Name",
    PhoneNumber: "Phone Number",
    Emailoptional: "Email (optional)",
    Continue: "Continue",
    ComplaintDetails: "Complaint Details",
    SubmitComplaint: "Submit Complaint",
    RegisterforEvent: "Register for Event",
    YourName2: "Your Name",
    PhoneNumber2: "Phone Number",
    NumberofParti: "Number of Participants (Max 5)",
    Selectnumber: "Select number",
    Event2: "Event",
    DateTime: "Date & Time",
    CompleteRegistra: "Complete Registration",
    AllEvents2: "All Events",
    Exploreall2:
      "Explore all our upcoming events and classes. Register online to secure your spot!",
    register: "Register",
    NoEventsForDay: "No events scheduled for this day.",
    monthJan: "Jan",
    monthFeb: "Feb",
    monthMar: "Mar",
    monthApr: "Apr",
    monthMay: "May",
    monthJun: "Jun",
    monthJul: "Jul",
    monthAug: "Aug",
    monthSep: "Sep",
    monthOct: "Oct",
    monthNov: "Nov",
    monthDec: "Dec",
    mailadd: "markazjamahiri@gmail.com",
  },
  ar: {
    homeTitle: "المركز الجماهيري الثوري",
    homeSubtitle:
      "مرحباً بكم في الموقع الرسمي للمركز الجماهيري أبو طور, المكان الذي يملأ عالمكم, هنا يمكنم التسجيل لفعالياتكم المفضلة وتقديم شكاوي الحي بكل أريحية وبساطة.",
    programsHeader: "نظرة عامة على البرامج",
    programsDescription:
      "انضم إلى برامجنا المتنوعة التي تلبي احتياجات المراهقين والأطفال وكبار السن. من ورش العمل التعليمية إلى دروس الرياضة، نقدم مجموعة متنوعة من الأنشطة.",
    joinNow: "انضم الآن",
    eventsHeader: "الفعاليات القادمة",
    eventsDescription:
      "انضم إلى فعالياتنا وفصولنا المثيرة. سجل عبر الإنترنت لتأمين مكانك!",
    viewAllEvents: "عرض جميع الفعاليات",
    calendarHeader: "تقويم الفعاليات",
    calendarDescription:
      "تحقق من تقويمنا للفعاليات والفصول القادمة. انقر على أي فعالية للتسجيل.",
    newsHeader: "أخبار المجتمع",
    newsDescription: "ابق على اطلاع بما يحدث في مركز مجتمعنا.",
    contactUs: "اتصل بنا",
    quickLinks: "روابط سريعة",
    emailUs: "أرسل لنا بريدًا إلكترونيًا!",
    footerTagline:
      "يجب أن تكون هناك ريح لتبدد الغيوم، وستقوم الشمس في صعودها الذهبي بتنقية القلب من كل هم. منكم إليكم منذ 2015.",
    complaintBtn: "تقديم شكوى",
    complaintModalTitle: "تقديم شكوى",
    yourName: "اسمك",
    phoneNumber: "رقم الهاتف",
    sendVerificationCode: "إرسال رمز التحقق",
    verificationCode: "رمز التحقق",
    verifyCode: "التحقق من الرمز",
    complaintDetails: "تفاصيل الشكوى",
    submitComplaint: "إرسال الشكوى",
    registerEvent: "التسجيل للفعالية",
    numberOfParticipants: "عدد المشاركين (الحد الأقصى 5)",
    event: "الفعالية",
    dateTime: "التاريخ والوقت",
    completeRegistration: "إكمال التسجيل",
    home: "الرئيسية",
    programs: "اللأقسام",
    events: "الفعاليات",
    calendar: "الجدول",
    news: "الأخبار",
    contact: "تواصل معنا",
    lang: "اللغة",
    en: "English",
    ar: "العربية",
    he: "Hebrew",
    community: "المركز الجماهيري",
    center: " أبو طور",
    viewourprograms: "عرض الأقسام",
    ProgramsOverview: "أقسام المركز",
    Engageinour:
      "انضموا إلى برامجنا المتنوعة التي تلبي احتياجات الفئات العمرية المختلقة من المراهقين والأطفال وكبار السن. من ورش العمل التعليمية إلى الحصص الرياضية، نقدم لكم مجموعة متنوعة من الأنشطة التي تناسب مختلف الاهتمامات والفئات العمرية.",
    JoinNow: "انضم إلينا",
    Elderly: "المسنين",
    Providinga:
      "توفير إطار ترفيهي اجتماعي صحي للجيل الذهبي توطيد العلاقة بين الجيل الذهبي وفئات المجتمع المختلفة بهدف إبراز قدرة المسنين في استمرارية العطاء و تحسين جودة حياة المسنين.",
    Women: "النساء",
    enhancingWomen:
      "يهدف إلى تمكين المرأة اقتصادياً من خلال التدريب على المهارات الحرفيّة والمهنيّة، كما يهدف إلى تطوير مهاراتها الشخصية من خلال تقديم دورات في القيادة والتواصل وإدارة الوقت.",
    Exceptionals: "الاستثنائيون",
    Enhancesocial:
      "في قسم التربية الخاصة نسعى الى دعم وتطوير وتنمية جميع الجوانب الايجابية عند المنتفعين وتحقيق الصحة النفسية وتنمية المهارات والروابط الاجتماعية إضافة العمل على تأكيد واثبات الدور الهام لهذه الفئة في الدمج المجتمعي.",
    Youth: "الشبيبة",
    Engagingyouth:
      "يهدف الى مشاركة الشباب بجميع الفعاليات التي تسعى لصقل وتطوير شخصياتهم , وتعزيز الانتماء الاجتماعي وروح المبادرة لديهم.",
    Culture: "الثقافة",
    Supportingand:
      "دعم وتعزيز الجانب الثقافي في المجتمع من خلال احياء المناسبات الدينية والمجتمعية لتوثيق الترابط المجتمعي. ",
    KidsWorkshops: "ندوات للأطفال",
    Fosteringcultural:
      "إن تعزيز الوعي الثقافي لدى الأطفال له دورٌ حيوي في ترسيخ شعور قوي بالانتماء والتعاطف والترابط. فمن خلال التعرّف على التقاليد والقيم وأساليب الحياة المختلفة، يكتسب الأطفال تقديرًا أعمق للتنوع، ويصبحون أكثر ميلًا لاحترام الاختلافات التي تُميّز كل شخص والاحتفاء بها.",
    UrbanPlanning: "التخطيط العمراني",
    professionally:
      "يقوم المخطط بالتجسير بين احتياجات المجتمع التخطيطية بصورة مهنية وسلطات التخطيط والتطوير بالمدينة وفهم العمليات الحضرية والاحتياجات الحضرية العامة، الهدف بشكل أساسي يتمحور حول تحسين جودة الحياة للسكان.",
    PublicAction: "العمل الجماهيري",
    Asocialserv:
      "دور العمل الجماهيري هو تخطيط وتنفيذ مشاريع تنموية مجتمعية والمتابعة المستمرة مع سكان في تحصيل الحقوق المجتمعية من خلال التشبيك مع المؤسسات المجتمعية وتعزيز العلاقات المجتمعية مع الجهات والمؤسسات الشريكة.",
    UpcomingEvents: "الفعاليات القادمة",
    Joinour:
      "شاركوا معنا لاكتساب مهارات جديدة وبناء شبكة علاقات مهنية وتطوير مجتمعنا معاً!",
    ViewAll: "جميع فعاليات المركز",
    CommunityNews: "أخبار المركز",
    Stayupdated: "كن على اطلاع على اخر الاخبار بما يجري في الحي, ومركزنا!",
    CommunityCenterfooter: "المركز الجماهيري الثوري",
    Theremustbea: "لا بد من ريح تبدد الغيوم, والشمس في اشراقها ستبدد الغيوم.",
    br: "منكم وإليكم منذ 2015.",
    QuickLinks: "الوصول السريع",
    Home: "الرئيسية",
    Programs: "الأقسام",
    Events: "الفعاليات",
    Calendar: "الجدول",
    News: "الأخبار",
    ContactUs: "اتصلو بنا",
    Hamefaked: "شارع المفكد 5, القدس الثوري",
    num: " 02-6775459  ",
    hours: "الأحد - الخميس : 5PM - 8AM",
    emai: "عندك فكرة!",
    Sharewithus: "شاركنا بأفكارك وما يجول في خاطرك.",
    emailPlaceholder: "بريدك الإلكتروني",
    footerCopyright: "© 2025 جميع الحقوق محفوظة - المركز الجماهيري الثوري.",
    EventCalendar: "جدول الفعاليات",
    Checkourcalendar:
      "ألق نظرة على التقويم لرؤية كل الفعاليات القادمة. اضعط على أي فعالية للتسجيل.",
    daySun: "الأحد",
    dayMon: "الأثنين",
    dayTue: "الثلاثاء",
    dayWed: "الأربعاء",
    dayThu: "الخميس",
    dayFri: "الجمعة",
    daySat: "السبت",
    TodayEvents: "فعاليات اليوم",
    MakeeaComplaint: "استبيان الشكوى",
    YourName: "الإسم الثلاثي",
    PhoneNumber: "رقم الهاتف النقال",
    Emailoptional: "البريد الإلكتروني (إختياري)",
    Continue: "التالي",
    ComplaintDetails: "تفاصيل الشكوى",
    SubmitComplaint: "إرسال",
    RegisterforEvent: "إستمارة التسجيل للفعالية",
    YourName2: " الإسم الثلاثي",
    PhoneNumber2: "رقم الهاتف النقال",
    NumberofParti: "عدد المتسجلين",
    Selectnumber: "إختر عدد المتسجلين",
    Event2: "الفعالية",
    DateTime: " التاريخ والساعة",
    CompleteRegistra: "إرسال",
    AllEvents2: "فعاليات المركز",
    Exploreall2:
      "هنا يمكنك أن تجد كل الفعاليات القادمة, فلا تضيع فرصتك وسجل الان!",
    register: "تسجيل",
    NoEventsForDay: "لا توجد فعاليات لهذا اليوم.",
    monthJan: "يناير",
    monthFeb: "فبراير",
    monthMar: "مارس",
    monthApr: "أبريل",
    monthMay: "مايو",
    monthJun: "يونيو",
    monthJul: "يوليو",
    monthAug: "أغسطس",
    monthSep: "سبتمبر",
    monthOct: "أكتوبر",
    monthNov: "نوفمبر",
    monthDec: "ديسمبر",
    mailadd: " markazjamahiri@gmail.com",
  },
  he: {
    homeTitle: "מחזקים את הקהילה שלנו יחד",
    homeSubtitle:
      "ברוכים הבאים לאתר הרשמי של מרכז הקהילה אבו טור, המקום שממלא את עולמכם. כאן תוכלו להירשם לאירועים האהובים עליכם ולהגיש תלונות שכונתיות בקלות ובפשטות.",
    viewourprograms: "צפו במחלקות שלנו",
    programsHeader: "סקירת תוכניות",
    programsDescription:
      "השתתפו בתוכניות מגוונות המיועדות לבני נוער, ילדים וקשישים. מסדנאות חינוכיות ועד שיעורי ספורט - אנו מציעים מגוון פעילויות לכל גיל.",
    joinNow: "הצטרף עכשיו",
    eventsHeader: "אירועים קרובים",
    eventsDescription:
      "הצטרפו לאירועים ולשיעורים המרגשים שלנו. הירשמו באינטרנט כדי להבטיח את מקומכם!",
    viewAllEvents: "צפה בכל האירועים",
    calendarHeader: "לוח אירועים",
    calendarDescription:
      "בדקו את לוח השנה שלנו לאירועים ושיעורים קרובים. לחצו על כל אירוע כדי להירשם.",
    newsHeader: "חדשות הקהילה",
    newsDescription: "הישארו מעודכנים עם מה שקורה במרכז הקהילתי שלנו.",
    contactUs: "צור קשר",
    quickLinks: "קישורים מהירים",
    emailUs: "שלח לנו אימייל!",
    footerTagline:
      "צריך להיות רוח שתפזר את העננים והשמש, בעלייתה המוזהבת, תנקה את הלב מכל דאגה. ממך אליך מאז 2015.",
    complaintBtn: "הגש תלונה",
    complaintModalTitle: "הגש תלונה",
    yourName: "שמך",
    phoneNumber: "מספר טלפון",
    sendVerificationCode: "שלח קוד אימות",
    verificationCode: "קוד אימות",
    verifyCode: "אמת קוד",
    complaintDetails: "פרטי התלונה",
    submitComplaint: "שלח תלונה",
    registerEvent: "הירשם לאירוע",
    numberOfParticipants: "מספר משתתפים (מקסימום 5)",
    event: "אירוע",
    dateTime: "תאריך ושעה",
    completeRegistration: "השלם רישום",
    lang: "השפה",
    en: "English",
    ar: "العربية",
    he: "עברית",
    home: "ראשי",
    programs: "מחלקות",
    events: "אירועים",
    calendar: "לוח אירועים",
    news: "חשדות",
    contact: "צור קשר",
    community: "מרקז קהילתי",
    center: " אבו טור",
    ProgramsOverview: "החוגים שלנו",
    Engageinour:
      "השתתפו במגוון התוכניות שלנו הפונות לבני נוער, ילדים וקשישים. החל מסדנאות חינוכיות ועד שיעורי ספורט, אנו מציעים מגוון פעילויות שיתאימו לתחומי עניין וקבוצות גיל שונות.",
    JoinNow: "הצטרפו אלינו",
    Elderly: "קשישים",
    Providinga:
      "מתן מסגרת חברתית ופנאי בריאה לדור הזהב. חיזוק הקשר בין דור הזהב לבין מגזרים שונים בחברה במטרה להדגיש את יכולתם של קשישים להמשיך ולתת ולשפר את איכות חייהם.",
    Women: "נשים",
    enhancingWomen:
      "מטרתה להעצים נשים כלכלית באמצעות הכשרה במיומנויות מקצועיות ומקצועיות. כמו כן, היא שואפת לפתח את כישוריהם האישיים על ידי הצעת קורסים במנהיגות, תקשורת וניהול זמן.",
    Exceptionals: "מְיֻחָדים",
    Enhancesocial:
      "במחלקה לחינוך מיוחד, אנו שואפים לתמוך, לפתח ולטפח את כל ההיבטים החיוביים של התלמידים שלנו, להשיג בריאות נפשית, לפתח מיומנויות וקשרים חברתיים, ופועלים לאישור והוכחה של התפקיד החשוב שממלאת קבוצה זו באינטגרציה חברתית.",
    Youth: "נוער",
    Engagingyouth:
      "היא שואפת לערב צעירים בכל הפעילויות שמטרתן לחדד ולפתח את אישיותם, ולחזק את שייכותם החברתית ואת רוח היוזמה שלהם.",
    Culture: "תרבות",
    Supportingand:
      "תמיכה ושיפור ההיבט התרבותי של החברה על ידי חגיגת אירועים דתיים וקהילתיים לחיזוק הלכידות הקהילתית.",
    KidsWorkshops: "סדנאות לילדים",
    Fosteringcultural:
      "טיפוח מודעות תרבותית בקרב ילדים ממלא תפקיד חיוני בטיפוח תחושת שייכות חזקה, אמפתיה ואחדות. על ידי למידה על מסורות, ערכים ודרכי חיים שונות, ילדים מפתחים הערכה עמוקה יותר לגיוון וסביר יותר שיכבדו ויחגגו את השוני שהופך כל אדם לייחודי.",
    UrbanPlanning: "תכנון עירוני",
    professionally:
      "התוכנית מגשרת בין צרכי התכנון המקצועיים של הקהילה לבין רשויות התכנון והפיתוח של העיר, תוך הבנת תהליכים עירוניים וצרכים עירוניים כלליים, כאשר המטרה העיקרית היא שיפור איכות החיים של התושבים.",
    PublicAction: "פעולה ציבורית",
    Asocialserv:
      "תפקידה של פעולה ציבורית הוא לתכנן וליישם פרויקטים של פיתוח קהילתי ולעקוב באופן רציף אחר התושבים כדי להשיג זכויות קהילתיות באמצעות יצירת קשרים עם מוסדות קהילתיים וחיזוק קשרי הקהילה עם סוכנויות ומוסדות שותפים.",
    UpcomingEvents: "אירועים קרובים",
    Joinour:
      "הצטרפו אלינו כדי לרכוש מיומנויות חדשות, לבנות רשת קשרים מקצועית ולפתח את הקהילה שלנו יחד!",
    ViewAll: "כל האירועים",
    CommunityNews: "החדשות",
    Stayupdated: "הישאר מעודכן במה שקורה במרכז הקהילתי שלנו.",
    CommunityCenterfooter: "מרקז הקהילה אבו טור",
    Theremustbea:
      "הכרחית היא רוח שתפזר את העננים, והשמש, בעלייתה הזהובה, תטהר את הלב מכל דאגה.",
    br: "מכם ואליכם מאז 2015.",
    QuickLinks: "קישורים",
    Home: "ראשי",
    Programs: "מחלקות",
    Events: "אירועים",
    Calendar: "לוח אירועים",
    News: "חדשות",
    ContactUs: "צור קשר",
    Hamefaked: "רחוב המפקד 5, אבו טור",
    num: " 02-6775459",
    hours: "ראשון - חמישי : 8AM - 5PM",
    emai: "יש לך רעיון?",
    Sharewithus: "שתף אותנו במחשבה שלך ובמה שבלבך.",
    emailPlaceholder: "המייל שלך",
    footerCopyright: "© 2025 כל הזכויות שמורות - מרקז הקהילה אבו טור.",
    EventCalendar: "לוח אירועים",
    Checkourcalendar:
      "עיין בלוח השנה שלנו לאירועים ושיעורים קרובים. לחצו על אירוע להרשמה.",
    daySun: "ראשון",
    dayMon: "שני",
    dayTue: "שלישי",
    dayWed: "רביעי",
    dayThu: "חמישי",
    dayFri: "שישי",
    daySat: "שבת",
    TodayEvents: "אירועי היום.",
    MakeeaComplaint: "הגש תלונה",
    YourName: "השם שלך",
    PhoneNumber: "מםפר הטלפון",
    Emailoptional: "דואר אלקטרוני (אופציונלי)",
    Continue: "להמשך",
    ComplaintDetails: "פרטי תלונה",
    SubmitComplaint: "להגיש",
    RegisterforEvent: "הרשמה לאירוע",
    YourName2: "השם שלך",
    PhoneNumber2: "מספר הטלפון",
    NumberofParti: "מםפר הנרשמים",
    Selectnumber: "בחר את מספר הנרשמים",
    Event2: "האירוע",
    DateTime: "תאריך ושעה",
    CompleteRegistra: "השלם רישום",
    AllEvents2: "כל האירועים",
    Exploreall2:
      "חקור את כל האירועים והשיעורים הקרובים שלנו. הירשם אונליין כדי להבטיח את מקומך!",
    register: "הרשמה",
    NoEventsForDay: "אין אירועים ליום זה.",
    monthJan: "ינואר",
    monthFeb: "פברואר",
    monthMar: "מרץ",
    monthApr: "אפריל",
    monthMay: "מאי",
    monthJun: "יוני",
    monthJul: "יולי",
    monthAug: "אוגוסט",
    monthSep: "ספטמבר",
    monthOct: "אוקטובר",
    monthNov: "נובמבר",
    monthDec: "דצמבר",
    mailadd: "  markazjamahiri@gmail.com",
  },
};

// Function to apply translations
function applyTranslations(lang) {
  STATE.currentLanguage = lang;

  // Fallback for <html lang> and direction
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" || lang === "he" ? "rtl" : "ltr";

  // Remove Hebrew-specific style
  document.querySelector(".line1")?.classList.remove("he-line1");

  // Update text for all elements with data-i18n
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      if (el.children.length > 0) {
        const textNodes = getTextNodes(el);
        if (textNodes.length > 0) {
          textNodes[0].nodeValue = translations[lang][key];
        } else {
          el.innerHTML = translations[lang][key];
        }
      } else {
        el.textContent = translations[lang][key];
      }
    }
  });

  // Update placeholder attributes
  const placeholders = document.querySelectorAll("[data-i18n-placeholder]");
  placeholders.forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  // Update navigation links
  const navLinks = document.querySelectorAll(".nav-links a");
  const navKeys = ["home", "programs", "events", "calendar", "news", "contact"];
  navLinks.forEach((link, index) => {
    if (navKeys[index] && translations[lang][navKeys[index]]) {
      link.textContent = translations[lang][navKeys[index]];
    }
  });

  // Update quick links
  const quickLinks = document.querySelectorAll(".quick-links a");
  quickLinks.forEach((link, index) => {
    if (navKeys[index] && translations[lang][navKeys[index]]) {
      link.textContent = translations[lang][navKeys[index]];
    }
  });

  // Hebrew-specific style
  if (lang === "he") {
    document.querySelector(".line1")?.classList.add("he-line1");
  }
  if (DOM.currentMonthEl) {
    const monthKeys = [
      "monthJan",
      "monthFeb",
      "monthMar",
      "monthApr",
      "monthMay",
      "monthJun",
      "monthJul",
      "monthAug",
      "monthSep",
      "monthOct",
      "monthNov",
      "monthDec",
    ];
    const currentMonthKey = monthKeys[STATE.calendar.currentMonth];
    const translatedMonth =
      translations[lang]?.[currentMonthKey] || currentMonthKey;

    DOM.currentMonthEl.textContent = `${translatedMonth} ${STATE.calendar.currentYear}`;
  }
}

// Helper function to get text nodes
function getTextNodes(node) {
  const textNodes = [];
  function recurse(currentNode) {
    for (let i = 0; i < currentNode.childNodes.length; i++) {
      const child = currentNode.childNodes[i];
      if (child.nodeType === Node.TEXT_NODE && child.nodeValue.trim() !== "") {
        textNodes.push(child);
      } else {
        recurse(child);
      }
    }
  }
  recurse(node);
  return textNodes;
}

// Function to handle language change
// Function to handle language change
async function onLanguageChange(newLang) {
  currentLang = newLang;
  localStorage.setItem("lang", currentLang);
  applyTranslations(currentLang);

  // Rerender calendar + events with updated lang
  CALENDAR.renderCalendar();

  try {
    const events = await API.events.getAll();
    processEventsForCalendar(events); // Rebuild CONFIG.events + STATE.eventData

    if (DOM.allEventsList) {
      CALENDAR.populateAllEvents(); // Re-render all events
    } else {
      updateEventCards(events.slice(0, Math.min(3, events.length)));
    }

    // Re-render events for the current day
    CALENDAR.showEventsForDay(
      STATE.calendar.currentDate.getDate(),
      STATE.calendar.currentDate.getMonth(),
      STATE.calendar.currentDate.getFullYear()
    );

    // Reload news when language changes if we're on a page with news
    if (DOM.newsGrid) {
      newsLoaded = false; // Reset the news loaded flag
      await loadNewsFromBackend(); // Reload news
    }
  } catch (err) {
    console.error("Failed to reload events:", err);
  }
}

// Add event listener after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  // Language selector
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = e.target.getAttribute("data-lang");
      onLanguageChange(lang);
      // Update language toggle text
      const toggle = btn
        .closest(".language-selector")
        .querySelector(".language-toggle");
      if (toggle) {
        toggle.textContent = translations[lang]?.[lang] || "Language";
      }
    });
  });

  // Optional: set default language on load
  currentLang = localStorage.getItem("lang") || "en";
  applyTranslations(currentLang);
});
