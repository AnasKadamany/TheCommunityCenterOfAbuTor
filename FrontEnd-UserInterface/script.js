// =============================================
// DOM Elements
// =============================================
const DOM = {
    // Programs Slider
    programsSlider: document.querySelector('.programs-slider'),
    programCards: document.querySelector('.program-cards'),
    cards: document.querySelectorAll('.program-cards .card'),
    prevArrow: document.querySelector('.slider-arrow-left'),
    nextArrow: document.querySelector('.slider-arrow-right'),
    
    // News Slider
    newsSlider: document.querySelector('.news-slider'),
    newsGrid: document.querySelector('.news-grid'),
    newsCards: document.querySelectorAll('.news-grid .news-card'),
    newsPrevArrow: document.querySelector('.news-slider-container .slider-arrow-left'),
    newsNextArrow: document.querySelector('.news-slider-container .slider-arrow-right'),
    
    // Mobile Navigation
    hamburger: document.querySelector('.hamburger'),
    navLinks: document.querySelector('.nav-links'),
    navItems: document.querySelectorAll('.nav-links li'),
    
    // Header
    header: document.querySelector('header'),
    
    // Animation Elements
    animateElements: document.querySelectorAll('.animate-from-bottom, .animate-from-left, .animate-from-right'),
    
    // Complaint Modal
    complaintBtn: document.getElementById('complaintBtn'),
    complaintModal: document.getElementById('complaintModal'),
    closeModal: document.querySelector('.close-modal'),
    complaintForm: document.getElementById('complaintForm'),
    sendCodeBtn: document.getElementById('sendCodeBtn'),
    verifyCodeBtn: document.getElementById('verifyCodeBtn'),
    step1: document.getElementById('step1'),
    step2: document.getElementById('step2'),
    step3: document.getElementById('step3'),
    
    // Registration Modal
    registrationModal: document.getElementById('registrationModal'),
    registrationForm: document.getElementById('registrationForm'),
    
    // Calendar
    prevMonthBtn: document.getElementById('prevMonth'),
    nextMonthBtn: document.getElementById('nextMonth'),
    currentMonthEl: document.getElementById('currentMonth'),
    calendarGrid: document.querySelector('.calendar-grid'),
    calendarEvents: document.getElementById('calendarEvents'),
    allEventsList: document.getElementById('allEventsList'),
    
    // Language Selector
    languageSelectors: document.querySelectorAll('.language-selector')
  };
  
  // =============================================
  // Constants and Configurations
  // =============================================
  const CONFIG = {
    programColors: {
      'Elderly': '#4a6fa5',
      'Women': '#1678B7',
      'Exceptionals': '#3A6EA4',
      'Youth': '#255484',
      'Culture': '#318DCB',
      'Kids Workshops': '#2E7FBA',
      'Urban Planning': '#2B71A8',
      'Public Action': '#93ccf8'
    },
    
    events: {
      '15-6-2025': [
        {
          title: 'Football Training',
          time: '4:00 PM - 6:00 PM',
          location: 'Community Center Field',
          description: 'Join our weekly football training session for all skill levels. Equipment provided.',
          program: 'Youth'
        }
      ],
      '17-6-2025': [
        {
          title: 'Arts & Crafts Workshop',
          time: '2:00 PM - 4:00 PM',
          location: 'Room 203',
          description: 'Creative workshop for kids and adults. All materials included.',
          program: 'Kids Workshops'
        }
      ],
      '20-6-2025': [
        {
          title: 'Senior Yoga Class',
          time: '10:00 AM - 11:00 AM',
          location: 'Yoga Studio',
          description: 'Gentle yoga class designed specifically for seniors. All levels welcome.',
          program: 'Elderly'
        }
      ],
      '22-6-2025': [
        {
          title: 'Women\'s Leadership Seminar',
          time: '6:00 PM - 8:00 PM',
          location: 'Conference Room A',
          description: 'Empowering women through leadership skills and networking.',
          program: 'Women'
        }
      ],
      '25-6-2025': [
        {
          title: 'Cultural Festival',
          time: '12:00 PM - 4:00 PM',
          location: 'Community Center Grounds',
          description: 'Celebrate our community\'s diversity with food, music, and performances.',
          program: 'Culture'
        }
      ]
    }
  };
  
  // =============================================
  // State Management
  // =============================================
  const STATE = {
    // Programs Slider
    programsSlider: {
      currentIndex: 0,
      cardWidth: DOM.cards[0]?.offsetWidth + 30,
      visibleCards: 4
    },
    
    // News Slider
    newsSlider: {
      currentIndex: 0,
      cardWidth: DOM.newsCards[0]?.offsetWidth + 30,
      visibleCards: 3,
      touchStartX: 0,
      touchEndX: 0
    },
    
    // Complaint Modal
    complaintModal: {
      verificationData: {
        code: null,
        phone: null,
        attempts: 0,
        maxAttempts: 3,
        verified: false
      }
    },
    
    // Registration Modal
    registrationModal: {
      currentEventData: null
    },
    
    // Calendar
    calendar: {
      currentDate: new Date(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear()
    }
  };
  
  // =============================================
  // Utility Functions
  // =============================================
  const UTILS = {
    generateVerificationCode: () => Math.floor(100000 + Math.random() * 900000).toString(),
    
    sendVerificationCode: (phone, code) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`SMS sent to ${phone} with code: ${code}`);
          resolve(true);
        }, 1500);
      });
    },
    
    checkScroll: () => {
      DOM.animateElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
          element.classList.add('animate-appear');
        }
      });
  
      // Force animation for events.html
      if (DOM.allEventsList) {
        const eventCards = document.querySelectorAll('.event-card');
        eventCards.forEach(card => {
          card.classList.add('animate-appear');
        });
      }
    }
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
        STATE.programsSlider.cardWidth = (sliderWidth / STATE.programsSlider.visibleCards) - 
          (30 * (STATE.programsSlider.visibleCards - 1) / STATE.programsSlider.visibleCards);
        
        // Apply the calculated width to each card
        DOM.cards.forEach(card => {
          card.style.flex = `0 0 ${STATE.programsSlider.cardWidth}px`;
        });
        
        SLIDERS.programs.moveSlider();
      },
      
      moveSlider: () => {
        if (!DOM.programCards) return;
        const maxIndex = Math.max(DOM.cards.length - STATE.programsSlider.visibleCards, 0);
        STATE.programsSlider.currentIndex = Math.min(STATE.programsSlider.currentIndex, maxIndex);
        
        const translateValue = STATE.programsSlider.currentIndex * (STATE.programsSlider.cardWidth + 20);
        DOM.programCards.style.transform = `translateX(-${translateValue}px)`;
        SLIDERS.programs.updateArrows();
      },
      
      updateArrows: () => {
        if (!DOM.prevArrow || !DOM.nextArrow) return;
        const maxIndex = Math.max(DOM.cards.length - STATE.programsSlider.visibleCards, 0);
        
        DOM.prevArrow.style.display = STATE.programsSlider.currentIndex === 0 ? 'none' : 'flex';
        DOM.nextArrow.style.display = STATE.programsSlider.currentIndex >= maxIndex ? 'none' : 'flex';
      },
      
      handleSwipe: () => {
        const swipeThreshold = 50;
        
        if (STATE.programsSlider.touchEndX < STATE.programsSlider.touchStartX - swipeThreshold) {
          const maxIndex = Math.max(DOM.cards.length - STATE.programsSlider.visibleCards, 0);
          STATE.programsSlider.currentIndex = Math.min(STATE.programsSlider.currentIndex + 1, maxIndex);
          SLIDERS.programs.moveSlider();
        } else if (STATE.programsSlider.touchEndX > STATE.programsSlider.touchStartX + swipeThreshold) {
          STATE.programsSlider.currentIndex = Math.max(STATE.programsSlider.currentIndex - 1, 0);
          SLIDERS.programs.moveSlider();
        }
      }
    },
    
    // News Slider
    news: {
      updateSlider: () => {
        if (!DOM.newsSlider || !DOM.newsCards.length) return;
        const sliderWidth = DOM.newsSlider.offsetWidth;
        const singleCardWidth = DOM.newsCards[0].offsetWidth + 30;
        STATE.newsSlider.visibleCards = window.innerWidth <= 768 ? 1 : Math.floor(sliderWidth / singleCardWidth);
        
        DOM.newsCards.forEach(card => {
          card.style.flex = `0 0 calc(${100 / STATE.newsSlider.visibleCards}% - 20px)`;
        });
        
        STATE.newsSlider.cardWidth = DOM.newsCards[0].offsetWidth + 20;
        SLIDERS.news.moveSlider();
      },
      
      moveSlider: () => {
        if (!DOM.newsGrid) return;
        const maxIndex = Math.max(DOM.newsCards.length - STATE.newsSlider.visibleCards, 0);
        STATE.newsSlider.currentIndex = Math.min(STATE.newsSlider.currentIndex, maxIndex);
        
        DOM.newsGrid.style.transform = `translateX(-${STATE.newsSlider.currentIndex * STATE.newsSlider.cardWidth}px)`;
        SLIDERS.news.updateArrows();
      },
      
      updateArrows: () => {
        if (!DOM.newsPrevArrow || !DOM.newsNextArrow) return;
        const maxIndex = Math.max(DOM.newsCards.length - STATE.newsSlider.visibleCards, 0);
        
        DOM.newsPrevArrow.style.display = STATE.newsSlider.currentIndex === 0 ? 'none' : 'flex';
        DOM.newsNextArrow.style.display = STATE.newsSlider.currentIndex >= maxIndex ? 'none' : 'flex';
      },
      
      handleSwipe: () => {
        const swipeThreshold = 50;
        
        if (STATE.newsSlider.touchEndX < STATE.newsSlider.touchStartX - swipeThreshold) {
          const maxIndex = Math.max(DOM.newsCards.length - STATE.newsSlider.visibleCards, 0);
          STATE.newsSlider.currentIndex = Math.min(STATE.newsSlider.currentIndex + 1, maxIndex);
          SLIDERS.news.moveSlider();
        } else if (STATE.newsSlider.touchEndX > STATE.newsSlider.touchStartX + swipeThreshold) {
          STATE.newsSlider.currentIndex = Math.max(STATE.newsSlider.currentIndex - 1, 0);
          SLIDERS.news.moveSlider();
        }
      }
    }
  };
  
  // =============================================
  // Modal Modules
  // =============================================
  const MODALS = {
    complaint: {
      resetForm: () => {
        DOM.step1.style.display = 'block';
        DOM.step2.style.display = 'none';
        DOM.step3.style.display = 'none';
        document.getElementById('verificationCode').value = '';
        STATE.complaintModal.verificationData = {
          code: null,
          phone: null,
          attempts: 0,
          maxAttempts: 3,
          verified: false
        };
      },
      
      handleSendCode: async () => {
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        
        if (!name || !phone) {
          alert('Please enter both name and phone number');
          return;
        }
        
        if (!/^[\d\s\-\+]{8,15}$/.test(phone)) {
          alert('Please enter a valid phone number');
          return;
        }
        
        STATE.complaintModal.verificationData.code = UTILS.generateVerificationCode();
        STATE.complaintModal.verificationData.phone = phone;
        STATE.complaintModal.verificationData.attempts = 0;
        STATE.complaintModal.verificationData.verified = false;
        
        DOM.sendCodeBtn.classList.add('loading');
        DOM.sendCodeBtn.textContent = 'Sending...';
        
        const sent = await UTILS.sendVerificationCode(phone, STATE.complaintModal.verificationData.code);
        
        DOM.sendCodeBtn.classList.remove('loading');
        DOM.sendCodeBtn.textContent = 'Send Verification Code';
        
        if (sent) {
          DOM.step1.style.display = 'none';
          DOM.step2.style.display = 'block';
        } else {
          alert('Failed to send verification code. Please try again.');
        }
      },
      
      handleVerifyCode: () => {
        const enteredCode = document.getElementById('verificationCode').value.trim();
        
        if (!enteredCode) {
          alert('Please enter the verification code');
          return;
        }
        
        STATE.complaintModal.verificationData.attempts++;
        
        if (enteredCode === STATE.complaintModal.verificationData.code) {
          STATE.complaintModal.verificationData.verified = true;
          DOM.step2.style.display = 'none';
          DOM.step3.style.display = 'block';
        } else {
          if (STATE.complaintModal.verificationData.attempts >= STATE.complaintModal.verificationData.maxAttempts) {
            alert('Too many incorrect attempts. Please start over.');
            MODALS.complaint.resetForm();
          } else {
            alert(`Incorrect code. You have ${STATE.complaintModal.verificationData.maxAttempts - STATE.complaintModal.verificationData.attempts} attempts left.`);
          }
        }
      },
      
      handleSubmit: (e) => {
        e.preventDefault();
        
        if (!STATE.complaintModal.verificationData.verified) {
          alert('Please complete phone verification first');
          return;
        }
        
        const name = document.getElementById('name').value;
        const phone = STATE.complaintModal.verificationData.phone;
        const complaint = document.getElementById('complaint').value;
        
        console.log('Verified complaint submitted:', { 
          name, 
          phone, 
          complaint,
          timestamp: new Date().toISOString()
        });
        
        alert('Thank you for your feedback! We will review your complaint and get back to you soon.');
        
        DOM.complaintForm.reset();
        MODALS.complaint.resetForm();
        DOM.complaintModal.classList.remove('show');
        document.body.style.overflow = 'auto';
      }
    },
    
    registration: {
      attachRegisterListeners: () => {
        document.querySelectorAll('.event-card .btn.small, .event-item .btn').forEach(btn => {
          btn.removeEventListener('click', MODALS.registration.handleRegisterClick);
          btn.addEventListener('click', MODALS.registration.handleRegisterClick);
        });
      },
      
      handleRegisterClick: function(e) {
        e.preventDefault();
        const eventCard = this.closest('.event-card, .event-item');
        
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const dateElement = eventCard.querySelector('.event-date');
        const calendarDay = eventCard.closest('.calendar-day');
        
        STATE.registrationModal.currentEventData = {
          title: eventCard.querySelector('h3').textContent,
          date: dateElement ? 
                `${dateElement.querySelector('.month').textContent} ${dateElement.querySelector('.day').textContent}` : 
                calendarDay ? 
                `${DOM.currentMonthEl.textContent.split(' ')[0]} ${calendarDay.querySelector('.day-number').textContent}` : 
                'N/A',
          time: eventCard.querySelector('p:nth-of-type(2)') ? 
                eventCard.querySelector('p:nth-of-type(2)').textContent.replace(/^\s*[^:]*:\s*/, '') : 
                eventCard.querySelector('p') ? 
                eventCard.querySelector('p').textContent : 
                'N/A',
          location: eventCard.querySelector('p:first-of-type') ? 
                   eventCard.querySelector('p:first-of-type').textContent.replace(/^\s*[^:]*:\s*/, '') : 
                   'Community Center',
          program: eventCard.getAttribute('data-program')
        };
        
        document.getElementById('reg-event').value = STATE.registrationModal.currentEventData.title;
        document.getElementById('reg-date').value = `${STATE.registrationModal.currentEventData.date}, ${STATE.registrationModal.currentEventData.time}`;
        
        DOM.registrationModal.classList.add('show');
        document.body.style.overflow = 'hidden';
      },
      
      handleSubmit: (e) => {
        e.preventDefault();
        
        const name = document.getElementById('reg-name').value;
        const phone = document.getElementById('reg-phone').value;
        const participants = document.getElementById('reg-participants').value;
        
        console.log('Registration submitted:', { 
          name, 
          phone, 
          participants: parseInt(participants),
          event: STATE.registrationModal.currentEventData.title,
          date: STATE.registrationModal.currentEventData.date,
          time: STATE.registrationModal.currentEventData.time,
          location: STATE.registrationModal.currentEventData.location
        });
        
        alert(`Thank you, ${name}! You have successfully registered ${participants} participant(s) for "${STATE.registrationModal.currentEventData.title}".`);
        
        DOM.registrationForm.reset();
        DOM.registrationModal.classList.remove('show');
        document.body.style.overflow = 'auto';
        STATE.registrationModal.currentEventData = null;
      }
    }
  };
  
  // =============================================
  // Calendar Module
  // =============================================
  const CALENDAR = {
    populateAllEvents: () => {
      if (!DOM.allEventsList) return;
      
      DOM.allEventsList.innerHTML = '';
      const eventArray = [];
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      // Convert events object to array
      for (const dateKey in CONFIG.events) {
        const [day, month, year] = dateKey.split('-').map(Number);
        CONFIG.events[dateKey].forEach(event => {
          eventArray.push({
            dateKey,
            day,
            month: month - 1,
            year,
            ...event
          });
        });
      }
      
      // Sort events by date
      eventArray.sort((a, b) => new Date(a.year, a.month, a.day) - new Date(b.year, b.month, b.day));
      
      // Display message if no events
      if (eventArray.length === 0) {
        DOM.allEventsList.innerHTML = '<p>No upcoming events available.</p>';
        return;
      }
      
      // Render events
      eventArray.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card', 'animate-from-bottom');
        eventCard.setAttribute('data-program', event.program);
        
        const monthDisplay = monthNames[event.month];
        const programColor = CONFIG.programColors[event.program] || '#4a6fa5';
        
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
            <a href="#" class="btn small" style="background-color: ${programColor}; border-color: ${programColor};">Register</a>
          </div>
        `;
        
        DOM.allEventsList.appendChild(eventCard);
      });
      
      // Add animations and attach event listeners
      DOM.allEventsList.querySelectorAll('.event-card').forEach(card => {
        card.classList.add('animate-appear');
      });
      
      MODALS.registration.attachRegisterListeners();
    },
    
    renderCalendar: () => {
      if (!DOM.calendarGrid || !DOM.currentMonthEl) return;
      
      // Clear existing calendar days (keep day headers)
      while (DOM.calendarGrid.children.length > 7) {
        DOM.calendarGrid.removeChild(DOM.calendarGrid.lastChild);
      }
      
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      DOM.currentMonthEl.textContent = `${monthNames[STATE.calendar.currentMonth]} ${STATE.calendar.currentYear}`;
      
      // Calculate first day of month and days in month
      const firstDay = new Date(STATE.calendar.currentYear, STATE.calendar.currentMonth, 1).getDay();
      const daysInMonth = new Date(STATE.calendar.currentYear, STATE.calendar.currentMonth + 1, 0).getDate();
      
      // Add empty cells for days before the first day of the month
      for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day', 'empty');
        DOM.calendarGrid.appendChild(emptyDay);
      }
      
      // Add days of the month
      const today = new Date();
      for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        
        // Highlight today
        if (i === today.getDate() && STATE.calendar.currentMonth === today.getMonth() && STATE.calendar.currentYear === today.getFullYear()) {
          dayElement.classList.add('today');
        }
        
        // Add day number
        const dayNumber = document.createElement('div');
        dayNumber.classList.add('day-number');
        dayNumber.textContent = i;
        dayElement.appendChild(dayNumber);
        
        // Add event indicator if day has events
        const dateKey = `${i}-${STATE.calendar.currentMonth + 1}-${STATE.calendar.currentYear}`;
        if (CONFIG.events[dateKey]) {
          const eventIndicator = document.createElement('span');
          eventIndicator.classList.add('event-indicator');
          dayElement.appendChild(eventIndicator);
        }
        
        // Add click event to show events for the day
        dayElement.addEventListener('click', () => {
          CALENDAR.showEventsForDay(i, STATE.calendar.currentMonth, STATE.calendar.currentYear);
        });
        
        DOM.calendarGrid.appendChild(dayElement);
      }
      
      // Show today's events if viewing current month
      if (STATE.calendar.currentMonth === today.getMonth() && STATE.calendar.currentYear === today.getFullYear()) {
        CALENDAR.showEventsForDay(today.getDate(), STATE.calendar.currentMonth, STATE.calendar.currentYear);
      }
    },
    
    showEventsForDay: (day, month, year) => {
      if (!DOM.calendarEvents) return;
      
      const dateKey = `${day}-${month + 1}-${year}`;
      const dayEvents = CONFIG.events[dateKey] || [];
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      
      // Clear existing events (keep title)
      while (DOM.calendarEvents.children.length > 1) {
        DOM.calendarEvents.removeChild(DOM.calendarEvents.lastChild);
      }
      
      // Set date title
      DOM.calendarEvents.querySelector('#eventDateTitle').textContent = `${monthNames[month]} ${day}, ${year}`;
      
      // Display message if no events
      if (dayEvents.length === 0) {
        const noEvents = document.createElement('p');
        noEvents.textContent = 'No events scheduled for this day.';
        noEvents.classList.add('no-events');
        DOM.calendarEvents.appendChild(noEvents);
        return;
      }
      
      // Create event items
      dayEvents.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.classList.add('event-item');
        eventItem.setAttribute('data-program', event.program);
        
        const eventTitle = document.createElement('h5');
        eventTitle.textContent = event.title;
        
        const programBadge = document.createElement('span');
        programBadge.classList.add('program-badge');
        programBadge.textContent = event.program;
        
        if (CONFIG.programColors[event.program]) {
          programBadge.style.backgroundColor = CONFIG.programColors[event.program];
        }
        
        const eventDetails = document.createElement('p');
        eventDetails.innerHTML = `
          <i class="fas fa-clock"></i> ${event.time} 
          <br><i class="fas fa-map-marker-alt"></i> ${event.location}
          <br><i class="fas fa-tag"></i> `;
        eventDetails.appendChild(programBadge);
        
        const eventDescription = document.createElement('p');
        eventDescription.textContent = event.description;
        eventDescription.classList.add('event-description');
        
        const registerBtn = document.createElement('a');
        registerBtn.href = '#';
        registerBtn.classList.add('btn', 'small');
        registerBtn.textContent = 'Register';
        
        if (CONFIG.programColors[event.program]) {
          registerBtn.style.backgroundColor = CONFIG.programColors[event.program];
          registerBtn.style.borderColor = CONFIG.programColors[event.program];
        }
        
        registerBtn.addEventListener('click', (e) => {
          e.preventDefault();
          
          STATE.registrationModal.currentEventData = {
            title: event.title,
            date: `${monthNames[month]} ${day}`,
            time: event.time,
            location: event.location,
            program: event.program
          };
          
          document.getElementById('reg-event').value = STATE.registrationModal.currentEventData.title;
          document.getElementById('reg-date').value = `${STATE.registrationModal.currentEventData.date}, ${STATE.registrationModal.currentEventData.time}`;
          DOM.registrationModal.classList.add('show');
          document.body.style.overflow = 'hidden';
        });
        
        eventItem.appendChild(eventTitle);
        eventItem.appendChild(eventDetails);
        eventItem.appendChild(eventDescription);
        eventItem.appendChild(registerBtn);
        DOM.calendarEvents.appendChild(eventItem);
      });
    },
    
    navigateMonth: (direction) => {
      if (direction === 'prev') {
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
    }
  };
  
  // =============================================
  // Navigation Module
  // =============================================
  const NAVIGATION = {
    initMobileNav: () => {
      if (DOM.hamburger) {
        DOM.hamburger.addEventListener('click', () => {
          DOM.hamburger.classList.toggle('active');
          DOM.navLinks.classList.toggle('active');
        });
      }
      
      DOM.navItems.forEach(item => {
        item.addEventListener('click', () => {
          DOM.hamburger?.classList.remove('active');
          DOM.navLinks?.classList.remove('active');
        });
      });
    },
    
    initHeaderScroll: () => {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          DOM.header?.classList.add('scrolled');
        } else {
          DOM.header?.classList.remove('scrolled');
        }
      });
    },
    
    initSmoothScroll: () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: 'smooth'
            });
          }
        });
      });
    }
  };
  
  // =============================================
  // Language Selector Module
  // =============================================
  const LANGUAGE = {
    init: () => {
      DOM.languageSelectors?.forEach(selector => {
        const toggle = selector.querySelector('.language-toggle');
        const menu = selector.querySelector('.language-menu');
        
        if (toggle && menu) {
          toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('active');
          });
          
          // Close when clicking outside
          document.addEventListener('click', (e) => {
            if (!selector.contains(e.target)) {
              menu.classList.remove('active');
            }
          });
        }
      });
    }
  };
  
  // =============================================
  // Event Listeners
  // =============================================
  const initEventListeners = () => {
    // Programs Slider
    if (DOM.prevArrow) {
      DOM.prevArrow.addEventListener('click', () => {
        STATE.programsSlider.currentIndex = Math.max(STATE.programsSlider.currentIndex - 1, 0);
        SLIDERS.programs.moveSlider();
      });
    }
    
    if (DOM.nextArrow) {
      DOM.nextArrow.addEventListener('click', () => {
        const maxIndex = Math.max(DOM.cards.length - STATE.programsSlider.visibleCards, 0);
        STATE.programsSlider.currentIndex = Math.min(STATE.programsSlider.currentIndex + 1, maxIndex);
        SLIDERS.programs.moveSlider();
      });
    }
    
    if (DOM.programsSlider) {
      DOM.programsSlider.addEventListener('touchstart', (e) => {
        STATE.programsSlider.touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      
      DOM.programsSlider.addEventListener('touchend', (e) => {
        STATE.programsSlider.touchEndX = e.changedTouches[0].screenX;
        SLIDERS.programs.handleSwipe();
      }, { passive: true });
    }
    
    // News Slider
    if (DOM.newsPrevArrow) {
      DOM.newsPrevArrow.addEventListener('click', () => {
        STATE.newsSlider.currentIndex = Math.max(STATE.newsSlider.currentIndex - 1, 0);
        SLIDERS.news.moveSlider();
      });
    }
    
    if (DOM.newsNextArrow) {
      DOM.newsNextArrow.addEventListener('click', () => {
        const maxIndex = Math.max(DOM.newsCards.length - STATE.newsSlider.visibleCards, 0);
        STATE.newsSlider.currentIndex = Math.min(STATE.newsSlider.currentIndex + 1, maxIndex);
        SLIDERS.news.moveSlider();
      });
    }
    
    if (DOM.newsSlider) {
      DOM.newsSlider.addEventListener('touchstart', (e) => {
        STATE.newsSlider.touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      
      DOM.newsSlider.addEventListener('touchend', (e) => {
        STATE.newsSlider.touchEndX = e.changedTouches[0].screenX;
        SLIDERS.news.handleSwipe();
      }, { passive: true });
    }
    
    // Window resize
    window.addEventListener('resize', () => {
      SLIDERS.programs.updateSlider();
      SLIDERS.news.updateSlider();
    });
    
    // Complaint Modal
    if (DOM.complaintBtn) {
      DOM.complaintBtn.addEventListener('click', () => {
        MODALS.complaint.resetForm();
        DOM.complaintModal.classList.add('show');
        document.body.style.overflow = 'hidden';
      });
    }
    
    if (DOM.closeModal) {
      DOM.closeModal.addEventListener('click', () => {
        DOM.complaintModal.classList.remove('show');
        document.body.style.overflow = 'auto';
      });
    }
    
    window.addEventListener('click', (e) => {
      if (e.target === DOM.complaintModal) {
        DOM.complaintModal.classList.remove('show');
        document.body.style.overflow = 'auto';
      }
    });
    
    if (DOM.sendCodeBtn) {
      DOM.sendCodeBtn.addEventListener('click', MODALS.complaint.handleSendCode);
    }
    
    if (DOM.verifyCodeBtn) {
      DOM.verifyCodeBtn.addEventListener('click', MODALS.complaint.handleVerifyCode);
    }
    
    if (DOM.complaintForm) {
      DOM.complaintForm.addEventListener('submit', MODALS.complaint.handleSubmit);
    }
    
    // Registration Modal
    document.querySelectorAll('#registrationModal .close-modal').forEach(closeBtn => {
      closeBtn.addEventListener('click', () => {
        DOM.registrationModal.classList.remove('show');
        document.body.style.overflow = 'auto';
      });
    });
    
    window.addEventListener('click', (e) => {
      if (e.target === DOM.registrationModal) {
        DOM.registrationModal.classList.remove('show');
        document.body.style.overflow = 'auto';
      }
    });
    
    if (DOM.registrationForm) {
      DOM.registrationForm.addEventListener('submit', MODALS.registration.handleSubmit);
    }
    
    // Calendar Navigation
    if (DOM.prevMonthBtn) {
      DOM.prevMonthBtn.addEventListener('click', () => CALENDAR.navigateMonth('prev'));
    }
    
    if (DOM.nextMonthBtn) {
      DOM.nextMonthBtn.addEventListener('click', () => CALENDAR.navigateMonth('next'));
    }
    
    // Scroll events
    window.addEventListener('scroll', UTILS.checkScroll);
    window.addEventListener('load', UTILS.checkScroll);
  };
  
  // =============================================
  // Initialization
  // =============================================
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize sliders
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
    
    // Initialize appropriate page content
    if (DOM.allEventsList) {
      CALENDAR.populateAllEvents();
    } else {
      CALENDAR.renderCalendar();
      MODALS.registration.attachRegisterListeners();
    }
    
    // Initial scroll check
    UTILS.checkScroll();
  });
