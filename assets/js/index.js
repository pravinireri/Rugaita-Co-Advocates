const navLinks = document.querySelectorAll('.services-nav a');
const sections = document.querySelectorAll('.section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all links and sections
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));

        // Add active class to the clicked link and corresponding section
        link.classList.add('active');
        const targetSection = document.querySelector(link.getAttribute('href'));
        targetSection.classList.add('active');
    });
});