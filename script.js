const featureRows = document.querySelectorAll('.feature-row');
const heroVideo = document.querySelector('.hero-video');
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, {
    threshold: 0.2
});

featureRows.forEach(row => observer.observe(row));

// Observe accessory images so they slide in when visible
const accessoryImages = document.querySelectorAll('.accessories-row img');
accessoryImages.forEach(img => observer.observe(img));

// Observe animated images (description and student images)
const animatedImages = document.querySelectorAll('.animate-image');
animatedImages.forEach(img => observer.observe(img));

if (heroVideo) {
    const startVideo = () => heroVideo.play().catch(() => {});

    heroVideo.addEventListener('canplay', startVideo, { once: true });
    startVideo();
}

if (navbar && menuToggle) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navbar.classList.toggle('menu-open');

        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        menuToggle.setAttribute('aria-label', isOpen ? 'Navigation schließen' : 'Navigation öffnen');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Navigation öffnen');
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            navbar.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Navigation öffnen');
        }
    });
}

const descriptionContainer = document.getElementById('description-container');
const descriptionTabs = document.querySelectorAll('.description-tab');
const descriptionImage = document.querySelector('.description-image');
const descriptionKicker = document.querySelector('.description-kicker');
const descriptionHeadline = document.querySelector('.description-info h2');
const descriptionText = document.querySelector('.description-info p:last-child');

const descriptionContent = {
    case: {
        image: 'Modi.png',
        imageAlt: 'Rotom-Lampe im Modi-Modus',
        kicker: 'Modi',
        headline: 'Verschiedene Modi für jede Situation',
        text: 'Die Lampe bietet verschiedene Modi, damit du sie perfekt an deine Bedürfnisse anpassen kannst.'
    },
    window: {
        image: 'Rotorblätter.png',
        imageAlt: 'Rotom-Lampe mit Rotorblättern',
        kicker: 'Rotorblätter',
        headline: 'Leise und effiziente Rotorblätter',
        text: 'Die Rotorblätter sorgen für einen sanften Luftstrom und optimale Leistung in jedem Modus.'
    },
    handles: {
        image: 'Laden.png',
        imageAlt: 'Rotom-Lampe beim Laden',
        kicker: 'Laden',
        headline: 'Schnelles und sicheres Laden',
        text: 'Die Ladefunktion ermöglicht eine schnelle und unkomplizierte Energieversorgung für den täglichen Einsatz.'
    }
};

if (descriptionContainer && descriptionTabs.length && descriptionImage && descriptionKicker && descriptionHeadline && descriptionText) {
    descriptionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const selectedPart = tab.dataset.part;
            const selectedContent = descriptionContent[selectedPart];

            descriptionContainer.dataset.part = selectedPart;
            descriptionImage.src = selectedContent.image;
            descriptionImage.alt = selectedContent.imageAlt;
            descriptionKicker.textContent = selectedContent.kicker;
            descriptionHeadline.textContent = selectedContent.headline;
            descriptionText.textContent = selectedContent.text;

            descriptionTabs.forEach(item => {
                const isActive = item === tab;
                item.classList.toggle('active', isActive);
                item.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });
        });
    });
}

// The zoom popup is no longer used for the description image.