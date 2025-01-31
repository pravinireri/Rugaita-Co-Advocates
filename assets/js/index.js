// Navbar Highlight
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function highlightNavLink() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionBottom = sectionTop + sectionHeight;

        if (
            window.scrollY + window.innerHeight * 0.4 >= sectionTop &&
            window.scrollY + window.innerHeight * 0.4 <= sectionBottom
        ) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    if (currentSection) {
        document.querySelector(`.nav-link[href="#${currentSection}"]`).classList.add('active');
    }
}

window.addEventListener('scroll', highlightNavLink);

// Smooth Scroll for Navbar Links with Offset
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        navLinks.forEach(navLink => navLink.classList.remove('active'));

        link.classList.add('active');

        const targetSection = document.querySelector(link.getAttribute('href'));
        if (targetSection) {
            const navbarHeight = document.querySelector('nav').clientHeight; // Navbar height
            const targetOffset = targetSection.offsetTop;
            let scrollAdjustment = navbarHeight;

            // Adjust offset for specific sections
            if (targetSection.id === 'section2') { // About section
                scrollAdjustment = navbarHeight + 80; // Slightly lower for About
            } else if (targetSection.id === 'section3') { // Services section
                scrollAdjustment = navbarHeight - 60; // Slightly lower for Services
            } else if (targetSection.id === 'section5') { // Contact section
                scrollAdjustment = navbarHeight + 20; // Slightly lower for Contact
            }

            const scrollPosition = targetOffset - scrollAdjustment;

            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth',
            });
        }
    });
});

highlightNavLink();

// Services Section Navigation
const servicesNavLinks = document.querySelectorAll('.services-nav a');
const serviceSections = document.querySelectorAll('.section');

servicesNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        servicesNavLinks.forEach(navLink => navLink.classList.remove('active'));
        serviceSections.forEach(section => section.classList.remove('active'));

        link.classList.add('active');
        const targetSection = document.querySelector(link.getAttribute('href'));
        targetSection.classList.add('active');
    });
});

// Active Icon for Services Section
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

// Sticky Navbar with Shadow
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// Dynamic Year in Footer
const year = new Date().getFullYear();
document.querySelector('.footer-text').innerHTML = `© ${year} Rugaita & Co Advocates`;

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Footer Animation
document.addEventListener("DOMContentLoaded", function () {
    const creditsText = document.querySelector(".credits-text");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    creditsText.style.opacity = "1";
                    creditsText.style.transform = "translateY(0)";
                }
            });
        },
        { threshold: 0.5 } // Trigger when 50% of the footer is visible
    );

    observer.observe(document.querySelector(".footer-credits"));
});