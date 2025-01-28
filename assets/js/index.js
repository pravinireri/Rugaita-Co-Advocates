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

const icons = document.querySelectorAll('.nav-icon');

const navIcons = Array.from(icons).slice(0, -1); 
let lastIndex = -1;

function updateActiveIcon() {
  let index = sections.length - 1;

  while (index >= 0 && window.scrollY + window.innerHeight / 2 < sections[index].offsetTop) {
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