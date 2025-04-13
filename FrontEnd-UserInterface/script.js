// Programs Slider Functionality
const programsSlider = document.querySelector('.programs-slider');
const programCards = document.querySelector('.program-cards');
const cards = document.querySelectorAll('.program-cards .card');
const prevArrow = document.querySelector('.slider-arrow-left');
const nextArrow = document.querySelector('.slider-arrow-right');

let currentIndex = 0;
let cardWidth = cards[0]?.offsetWidth + 30;
let visibleCards = 4;

// Programs Slider
function updateSlider() {
    if (!programsSlider || !cards.length) return;
    
    // Get the total available width (subtract padding if any)
    const sliderWidth = programsSlider.offsetWidth;
    
    // Calculate how many cards can fit based on viewport width
    if (window.innerWidth <= 768) {
        visibleCards = 1;
    } else if (window.innerWidth <= 992) {
        visibleCards = 2;
    } else {
        visibleCards = 4; // Show 4 cards on desktop
    }
    
    // Calculate card width including gap
    cardWidth = (sliderWidth / visibleCards) - (30 * (visibleCards - 1) / visibleCards);
    
    // Apply the calculated width to each card
    cards.forEach(card => {
        card.style.flex = `0 0 ${cardWidth}px`;
    });
    
    moveSlider();
}

function moveSlider() {
    if (!programCards) return;
    const maxIndex = Math.max(cards.length - visibleCards, 0);
    currentIndex = Math.min(currentIndex, maxIndex);
    
    // Calculate the exact translation needed
    const translateValue = currentIndex * (cardWidth + 20); // 30px is the gap between cards
    programCards.style.transform = `translateX(-${translateValue}px)`;
    updateArrows();
}

function updateArrows() {
    if (!prevArrow || !nextArrow) return;
    const maxIndex = Math.max(cards.length - visibleCards, 0);
    
    prevArrow.style.display = currentIndex === 0 ? 'none' : 'flex';
    nextArrow.style.display = currentIndex >= maxIndex ? 'none' : 'flex';
}

updateSlider();

if (prevArrow) {
    prevArrow.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        moveSlider();
    });
}

if (nextArrow) {
    nextArrow.addEventListener('click', () => {
        const maxIndex = Math.max(cards.length - visibleCards, 0);
        currentIndex = Math.min(currentIndex + 1, maxIndex);
        moveSlider();
    });
}

window.addEventListener('resize', () => {
    updateSlider();
});

// News Slider Functionality
const newsSlider = document.querySelector('.news-slider');
const newsGrid = document.querySelector('.news-grid');
const newsCards = document.querySelectorAll('.news-grid .news-card');
const newsPrevArrow = document.querySelector('.news-slider-container .slider-arrow-left');
const newsNextArrow = document.querySelector('.news-slider-container .slider-arrow-right');

let newsCurrentIndex = 0;
let newsCardWidth = newsCards[0]?.offsetWidth + 30;
let newsVisibleCards = 3;

function updateNewsSlider() {
    if (!newsSlider || !newsCards.length) return;
    const sliderWidth = newsSlider.offsetWidth;
    const singleCardWidth = newsCards[0].offsetWidth + 30;
    newsVisibleCards = window.innerWidth <= 768 ? 1 : Math.floor(sliderWidth / singleCardWidth);
    
    newsCards.forEach(card => {
        card.style.flex = `0 0 calc(${100 / newsVisibleCards}% - 20px)`;
    });
    
    newsCardWidth = newsCards[0].offsetWidth + 20;
    moveNewsSlider();
}

function moveNewsSlider() {
    if (!newsGrid) return;
    const maxIndex = Math.max(newsCards.length - newsVisibleCards, 0);
    newsCurrentIndex = Math.min(newsCurrentIndex, maxIndex);
    
    newsGrid.style.transform = `translateX(-${newsCurrentIndex * newsCardWidth}px)`;
    updateNewsArrows();
}

function updateNewsArrows() {
    if (!newsPrevArrow || !newsNextArrow) return;
    const maxIndex = Math.max(newsCards.length - newsVisibleCards, 0);
    
    newsPrevArrow.style.display = newsCurrentIndex === 0 ? 'none' : 'flex';
    newsNextArrow.style.display = newsCurrentIndex >= maxIndex ? 'none' : 'flex';
}

updateNewsSlider();

if (newsPrevArrow) {
    newsPrevArrow.addEventListener('click', () => {
        newsCurrentIndex = Math.max(newsCurrentIndex - 1, 0);
        moveNewsSlider();
    });
}

if (newsNextArrow) {
    newsNextArrow.addEventListener('click', () => {
        const maxIndex = Math.max(newsCards.length - newsVisibleCards, 0);
        newsCurrentIndex = Math.min(newsCurrentIndex + 1, maxIndex);
        moveNewsSlider();
    });
}

window.addEventListener('resize', () => {
    updateNewsSlider();
});

let newsTouchStartX = 0;
let newsTouchEndX = 0;

if (newsSlider) {
    newsSlider.addEventListener('touchstart', (e) => {
        newsTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    newsSlider.addEventListener('touchend', (e) => {
        newsTouchEndX = e.changedTouches[0].screenX;
        handleNewsSwipe();
    }, { passive: true });
}

function handleNewsSwipe() {
    const swipeThreshold = 50;
    
    if (newsTouchEndX < newsTouchStartX - swipeThreshold) {
        const maxIndex = Math.max(newsCards.length - newsVisibleCards, 0);
        newsCurrentIndex = Math.min(newsCurrentIndex + 1, maxIndex);
        moveNewsSlider();
    } else if (newsTouchEndX > newsTouchStartX + swipeThreshold) {
        newsCurrentIndex = Math.max(newsCurrentIndex - 1, 0);
        moveNewsSlider();
    }
}

let touchStartX = 0;
let touchEndX = 0;

if (programsSlider) {
    programsSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    programsSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
        const maxIndex = Math.max(cards.length - visibleCards, 0);
        currentIndex = Math.min(currentIndex + 1, maxIndex);
        moveSlider();
    } else if (touchEndX > touchStartX + swipeThreshold) {
        currentIndex = Math.max(currentIndex - 1, 0);
        moveSlider();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Header Scroll Effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Scroll Animation
    const animateElements = document.querySelectorAll('.animate-from-bottom, .animate-from-left, .animate-from-right');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate-appear');
            }
        });

        // Force animation for events.html
        if (document.getElementById('allEventsList')) {
            const eventCards = document.querySelectorAll('.event-card');
            eventCards.forEach(card => {
                card.classList.add('animate-appear');
            });
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('load', checkScroll);
    checkScroll(); // Run immediately on load
    
    // Complaint Modal with Phone Verification
    const complaintBtn = document.getElementById('complaintBtn');
    const complaintModal = document.getElementById('complaintModal');
    const closeModal = document.querySelector('.close-modal');
    const complaintForm = document.getElementById('complaintForm');
    const sendCodeBtn = document.getElementById('sendCodeBtn');
    const verifyCodeBtn = document.getElementById('verifyCodeBtn');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    
    let verificationData = {
        code: null,
        phone: null,
        attempts: 0,
        maxAttempts: 3,
        verified: false
    };
    
    function generateVerificationCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    
    function sendVerificationCode(phone, code) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`SMS sent to ${phone} with code: ${code}`);
                resolve(true);
            }, 1500);
        });
    }
    
    function resetComplaintForm() {
        step1.style.display = 'block';
        step2.style.display = 'none';
        step3.style.display = 'none';
        document.getElementById('verificationCode').value = '';
        verificationData = {
            code: null,
            phone: null,
            attempts: 0,
            maxAttempts: 3,
            verified: false
        };
    }
    
    if (complaintBtn) {
        complaintBtn.addEventListener('click', function() {
            resetComplaintForm();
            complaintModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            complaintModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === complaintModal) {
            complaintModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
    
    if (sendCodeBtn) {
        sendCodeBtn.addEventListener('click', async function() {
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
            
            verificationData.code = generateVerificationCode();
            verificationData.phone = phone;
            verificationData.attempts = 0;
            verificationData.verified = false;
            
            this.classList.add('loading');
            this.textContent = 'Sending...';
            
            const sent = await sendVerificationCode(phone, verificationData.code);
            
            this.classList.remove('loading');
            this.textContent = 'Send Verification Code';
            
            if (sent) {
                step1.style.display = 'none';
                step2.style.display = 'block';
            } else {
                alert('Failed to send verification code. Please try again.');
            }
        });
    }
    
    if (verifyCodeBtn) {
        verifyCodeBtn.addEventListener('click', function() {
            const enteredCode = document.getElementById('verificationCode').value.trim();
            
            if (!enteredCode) {
                alert('Please enter the verification code');
                return;
            }
            
            verificationData.attempts++;
            
            if (enteredCode === verificationData.code) {
                verificationData.verified = true;
                step2.style.display = 'none';
                step3.style.display = 'block';
            } else {
                if (verificationData.attempts >= verificationData.maxAttempts) {
                    alert('Too many incorrect attempts. Please start over.');
                    resetComplaintForm();
                } else {
                    alert(`Incorrect code. You have ${verificationData.maxAttempts - verificationData.attempts} attempts left.`);
                }
            }
        });
    }
    
    if (complaintForm) {
        complaintForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!verificationData.verified) {
                alert('Please complete phone verification first');
                return;
            }
            
            const name = document.getElementById('name').value;
            const phone = verificationData.phone;
            const complaint = document.getElementById('complaint').value;
            
            console.log('Verified complaint submitted:', { 
                name, 
                phone, 
                complaint,
                timestamp: new Date().toISOString()
            });
            
            alert('Thank you for your feedback! We will review your complaint and get back to you soon.');
            
            complaintForm.reset();
            resetComplaintForm();
            complaintModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Event Registration Functionality
    const registrationModal = document.getElementById('registrationModal');
    const registrationForm = document.getElementById('registrationForm');
    let currentEventData = null;
    
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
    
    function attachRegisterListeners() {
        document.querySelectorAll('.event-card .btn.small, .event-item .btn').forEach(btn => {
            btn.removeEventListener('click', handleRegisterClick);
            btn.addEventListener('click', handleRegisterClick);
        });
    }
    
    function handleRegisterClick(e) {
        e.preventDefault();
        const eventCard = this.closest('.event-card, .event-item');
        currentEventData = {
            title: eventCard.querySelector('h3').textContent,
            date: eventCard.querySelector('.event-date') ? 
                  `${eventCard.querySelector('.event-date .month').textContent} ${eventCard.querySelector('.event-date .day').textContent}` : 
                  eventCard.closest('.calendar-day') ? 
                  `${currentMonthEl.textContent.split(' ')[0]} ${eventCard.closest('.calendar-day').querySelector('.day-number').textContent}` : 
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
        
        document.getElementById('reg-event').value = currentEventData.title;
        document.getElementById('reg-date').value = `${currentEventData.date}, ${currentEventData.time}`;
        
        registrationModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    document.querySelectorAll('#registrationModal .close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            registrationModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === registrationModal) {
            registrationModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('reg-name').value;
            const phone = document.getElementById('reg-phone').value;
            const participants = document.getElementById('reg-participants').value;
            
            console.log('Registration submitted:', { 
                name, 
                phone, 
                participants: parseInt(participants),
                event: currentEventData.title,
                date: currentEventData.date,
                time: currentEventData.time,
                location: currentEventData.location
            });
            
            alert(`Thank you, ${name}! You have successfully registered ${participants} participant(s) for "${currentEventData.title}".`);
            
            registrationForm.reset();
            registrationModal.classList.remove('show');
            document.body.style.overflow = 'auto';
            currentEventData = null;
        });
    }
    
    // Calendar Functionality
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const currentMonthEl = document.getElementById('currentMonth');
    const calendarGrid = document.querySelector('.calendar-grid');
    const calendarEvents = document.getElementById('calendarEvents');
    
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    const events = {
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
    };
    
    function populateAllEvents() {
        console.log('populateAllEvents called');
        const allEventsList = document.getElementById('allEventsList');
        if (!allEventsList) {
            console.log('allEventsList not found');
            return;
        }

        console.log('Events object:', events);
        allEventsList.innerHTML = '';

        const eventArray = [];
        for (const dateKey in events) {
            const [day, month, year] = dateKey.split('-').map(Number);
            events[dateKey].forEach(event => {
                eventArray.push({
                    dateKey,
                    day,
                    month: month - 1,
                    year,
                    ...event
                });
            });
        }

        console.log('Event array before sorting:', eventArray);

        eventArray.sort((a, b) => {
            const dateA = new Date(a.year, a.month, a.day);
            const dateB = new Date(b.year, b.month, b.day);
            console.log(`Sorting: ${dateA.toISOString()} vs ${dateB.toISOString()}`);
            return dateA - dateB;
        });

        console.log('Event array after sorting:', eventArray);

        if (eventArray.length === 0) {
            allEventsList.innerHTML = '<p>No upcoming events available.</p>';
            console.log('No events to display');
            return;
        }

        eventArray.forEach((event, index) => {
            console.log(`Rendering event ${index + 1}:`, event);
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card', 'animate-from-bottom');
            eventCard.setAttribute('data-program', event.program);

            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const monthDisplay = monthNames[event.month];
            const programColor = programColors[event.program] || '#4a6fa5';

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

            allEventsList.appendChild(eventCard);
        });

        const eventCards = allEventsList.querySelectorAll('.event-card');
        eventCards.forEach(card => {
            card.classList.add('animate-appear');
        });

        console.log('Events rendered:', eventArray.length);
        attachRegisterListeners();
    }
    
    function renderCalendar() {
        if (!calendarGrid || !currentMonthEl) return;
        while (calendarGrid.children.length > 7) {
            calendarGrid.removeChild(calendarGrid.lastChild);
        }
        
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;
        
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day', 'empty');
            calendarGrid.appendChild(emptyDay);
        }
        
        const today = new Date();
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            
            if (i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                dayElement.classList.add('today');
            }
            
            const dayNumber = document.createElement('div');
            dayNumber.classList.add('day-number');
            dayNumber.textContent = i;
            dayElement.appendChild(dayNumber);
            
            const dateKey = `${i}-${currentMonth + 1}-${currentYear}`;
            if (events[dateKey]) {
                const eventIndicator = document.createElement('span');
                eventIndicator.classList.add('event-indicator');
                dayElement.appendChild(eventIndicator);
            }
            
            dayElement.addEventListener('click', function() {
                showEventsForDay(i, currentMonth, currentYear);
            });
            
            calendarGrid.appendChild(dayElement);
        }
        
        if (currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
            showEventsForDay(today.getDate(), currentMonth, currentYear);
        }
    }
    
    function showEventsForDay(day, month, year) {
        if (!calendarEvents) return;
        const dateKey = `${day}-${month + 1}-${year}`;
        const dayEvents = events[dateKey] || [];
        
        while (calendarEvents.children.length > 1) {
            calendarEvents.removeChild(calendarEvents.lastChild);
        }
        
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        calendarEvents.querySelector('#eventDateTitle').textContent = `${monthNames[month]} ${day}, ${year}`;
        
        if (dayEvents.length === 0) {
            const noEvents = document.createElement('p');
            noEvents.textContent = 'No events scheduled for this day.';
            noEvents.classList.add('no-events');
            calendarEvents.appendChild(noEvents);
        } else {
            dayEvents.forEach(event => {
                const eventItem = document.createElement('div');
                eventItem.classList.add('event-item');
                eventItem.setAttribute('data-program', event.program);
                
                const eventTitle = document.createElement('h5');
                eventTitle.textContent = event.title;
                
                const programBadge = document.createElement('span');
                programBadge.classList.add('program-badge');
                programBadge.textContent = event.program;
                
                if (programColors[event.program]) {
                    programBadge.style.backgroundColor = programColors[event.program];
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
                if (programColors[event.program]) {
                    registerBtn.style.backgroundColor = programColors[event.program];
                    registerBtn.style.borderColor = programColors[event.program];
                }
                registerBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const registrationModal = document.getElementById('registrationModal');
                    const regEvent = document.getElementById('reg-event');
                    const regDate = document.getElementById('reg-date');
                    
                    currentEventData = {
                        title: event.title,
                        date: `${monthNames[month]} ${day}`,
                        time: event.time,
                        location: event.location,
                        program: event.program
                    };
                    
                    regEvent.value = currentEventData.title;
                    regDate.value = `${currentEventData.date}, ${currentEventData.time}`;
                    registrationModal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                });
                
                eventItem.appendChild(eventTitle);
                eventItem.appendChild(eventDetails);
                eventItem.appendChild(eventDescription);
                eventItem.appendChild(registerBtn);
                calendarEvents.appendChild(eventItem);
            });
        }
    }
    
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar();
        });
    }
    
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar();
        });
    }
    
    if (document.getElementById('allEventsList')) {
        console.log('Initializing events.html');
        populateAllEvents();
    } else {
        console.log('Initializing index.html');
        renderCalendar();
        attachRegisterListeners();
    }
    
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
});
// Language Selector Functionality

// Language Selector Toggle
const languageToggle = document.querySelector('.language-toggle');
const languageMenu = document.querySelector('.language-menu');
// Language Selector Functionality - Unified for both desktop and mobile
document.addEventListener('DOMContentLoaded', function() {
    const languageSelectors = document.querySelectorAll('.language-selector');
    
    languageSelectors.forEach(selector => {
        const toggle = selector.querySelector('.language-toggle');
        const menu = selector.querySelector('.language-menu');
        
        if (toggle && menu) {
            toggle.addEventListener('click', function(e) {
                e.stopPropagation();
                menu.classList.toggle('active');
            });
            
            // Close when clicking outside
            document.addEventListener('click', function(e) {
                if (!selector.contains(e.target)) {
                    menu.classList.remove('active');
                }
            });
        }
    });
});
