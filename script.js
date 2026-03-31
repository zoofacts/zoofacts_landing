const themeCheckbox = document.getElementById('theme-checkbox');
const htmlElement = document.documentElement;

function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateImages(theme);
    updateFavicon(theme);
    themeCheckbox.checked = (theme === 'dark');
}

themeCheckbox.addEventListener('change', () => {
    const newTheme = themeCheckbox.checked ? 'dark' : 'light';
    setTheme(newTheme);
})

function updateFavicon(theme) {
    const favicon = document.getElementById('favicon');
    if (!favicon) return;
    if (theme == 'dark') {
        favicon.href = 'img/logo_dark.svg';
    } else {
        favicon.href = 'img/logo_light.svg';
    }
}

function updateImages(theme) {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        let src = img.getAttribute('src');
        if (!src) return;

        if (theme === 'dark') {
            if (src.includes('_light.svg')) {
                img.setAttribute('src', src.replace('_light.svg', '_dark.svg'));
            }
        } else {
            if (src.includes('_dark.svg')) {
                img.setAttribute('src', src.replace('_dark.svg', '_light.svg'));
            }
        }
    });
}

const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target)
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const blockToAnimate = document.querySelectorAll('.hero-container, .hero-image, .about-item, .about-main-title');

    blockToAnimate.forEach(block => {
        block.classList.add('reveal');
        observer.observe(block);
    });
});