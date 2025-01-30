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

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        navLinks.forEach(navLink => navLink.classList.remove('active'));

        link.classList.add('active');

        const targetSection = document.querySelector(link.getAttribute('href'));
        if (targetSection) {
            const targetOffset = targetSection.offsetTop;
            const navbarHeight = document.querySelector('nav').clientHeight; 
            const windowHeight = window.innerHeight;

            let scrollAdjustment = 0;
            if (targetSection.id === 'section4' || targetSection.id === 'section5') {
                scrollAdjustment = -100;
            }

            const scrollPosition = targetOffset - navbarHeight + scrollAdjustment;

            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth',
            });
        }
    });
});

highlightNavLink();

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

// Smooth Scroll for Navbar Links

document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId); 
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Sticky Navbar with Shadow
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// Lazy Load Images
const images = document.querySelectorAll('img[data-src]');

const lazyLoad = (img) => {
    img.setAttribute('src', img.getAttribute('data-src'));
    img.onload = () => {
        img.removeAttribute('data-src');
    };
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            lazyLoad(entry.target);
            imageObserver.unobserve(entry.target);
        }
    });
}, { rootMargin: '0px 0px 200px 0px' });

images.forEach(img => imageObserver.observe(img));


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