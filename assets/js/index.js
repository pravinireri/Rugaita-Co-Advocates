// Highlight navbar links based on scroll position
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Function to check which section is in view
function highlightNavLink() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionBottom = sectionTop + sectionHeight;

        // Check if the section is in view (with a threshold)
        if (
            window.scrollY + window.innerHeight * 0.4 >= sectionTop && // Check if 40% of the viewport is within the section
            window.scrollY + window.innerHeight * 0.4 <= sectionBottom
        ) {
            currentSection = section.getAttribute('id');
        }
    });

    // Remove active class from all nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to the corresponding nav link
    if (currentSection) {
        document.querySelector(`.nav-link[href="#${currentSection}"]`).classList.add('active');
    }
}

// Event listener for scroll
window.addEventListener('scroll', highlightNavLink);

// Event listener for click on nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all nav links
        navLinks.forEach(navLink => navLink.classList.remove('active'));

        // Add active class to the clicked link
        link.classList.add('active');

        // Scroll to the corresponding section with an adjusted offset
        const targetSection = document.querySelector(link.getAttribute('href'));
        if (targetSection) {
            const targetOffset = targetSection.offsetTop;
            const navbarHeight = document.querySelector('nav').clientHeight; // Height of the navbar
            const windowHeight = window.innerHeight;

            // Adjust scroll position for specific sections (e.g., Team and Contact)
            let scrollAdjustment = 0;
            if (targetSection.id === 'section4' || targetSection.id === 'section5') {
                scrollAdjustment = -100; // Scroll a bit higher for Team and Contact sections
            }

            // Calculate the scroll position to center the section
            const scrollPosition = targetOffset - navbarHeight + scrollAdjustment;

            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth',
            });
        }
    });
});

// Highlight the first section by default on page load
highlightNavLink();

// Existing code for services-nav and icons
const servicesNavLinks = document.querySelectorAll('.services-nav a');
const serviceSections = document.querySelectorAll('.section');

servicesNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all services-nav links and sections
        servicesNavLinks.forEach(navLink => navLink.classList.remove('active'));
        serviceSections.forEach(section => section.classList.remove('active'));

        // Add active class to the clicked link and corresponding section
        link.classList.add('active');
        const targetSection = document.querySelector(link.getAttribute('href'));
        targetSection.classList.add('active');
    });
});

const icons = document.querySelectorAll('.nav-icon');
const navIcons = Array.from(icons).slice(0, -1);
let lastIndex = -1;

function updateActiveIcon() {
    let index = serviceSections.length - 1;

    while (index >= 0 && window.scrollY + window.innerHeight / 2 < serviceSections[index].offsetTop) {
        index--;
    }

    if (index !== lastIndex) {
        navIcons[lastIndex]?.classList.remove('active');
        navIcons[index]?.classList.add('active');
        lastIndex = index;
    }
}

window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
        updateActiveIcon();
    });
});

updateActiveIcon();