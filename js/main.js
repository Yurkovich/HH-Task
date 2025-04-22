document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('.header__nav');
    const body = document.body;

    burgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !burgerMenu.contains(e.target) && nav.classList.contains('active')) {
            burgerMenu.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header__img');
    const scrolled = window.scrollY;
    header.style.transform = `translateY(${scrolled * 0.5}px)`;
});

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.benefits__item, .hero__item, .contact__form, .benefits__list, .hero__inner');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        const elementProgress = 1 - (elementTop / windowHeight);
        
        if (elementTop < windowHeight && elementBottom > 0) {
            if (elementProgress > 0.2) {
                element.classList.add('animate');
            }
            
            if (element.classList.contains('animate')) {
                const progress = Math.min(Math.max(elementProgress, 0), 1);
                element.style.setProperty('--scroll-progress', progress);
            }
        }
    });
};

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            animateOnScroll();
            ticking = false;
        });
        ticking = true;
    }
});

window.addEventListener('load', () => {
    animateOnScroll();
    document.querySelectorAll('.benefits__item, .hero__item, .contact__form, .benefits__list, .hero__inner').forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < window.innerHeight) {
            element.classList.add('animate');
        }
    });
});

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    button.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});

const heroTitle = document.querySelector('.hero__title');
const text = heroTitle.textContent;
heroTitle.textContent = '';

let i = 0;
const typeWriter = () => {
    if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
};

window.addEventListener('load', typeWriter);

const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        let formattedValue = value;
        if (element.textContent.includes('$')) {
            formattedValue = '$' + value.toLocaleString();
        } else if (element.textContent.includes('%')) {
            formattedValue = value + '%';
        }
        
        element.textContent = formattedValue;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

const stats = document.querySelectorAll('.hero__item-text span');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target.textContent;
            let value = 0;
            
            if (text.includes('$')) {
                value = parseInt(text.replace(/[^0-9]/g, ''));
            } else if (text.includes('%')) {
                value = parseInt(text.replace(/[^0-9]/g, ''));
            } else {
                value = parseInt(text);
            }
            
            if (!isNaN(value)) {
                animateValue(entry.target, 0, value, 2000);
                observer.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => observer.observe(stat));

const form = document.querySelector('.contact__form form');
const inputs = form.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.classList.add('submitted');
});

document.querySelectorAll('.benefits__item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.benefits__item').forEach(item => {
        item.classList.add('fade-in');
    });
    
    document.querySelectorAll('.hero__item').forEach(item => {
        item.classList.add('slide-in');
    });
    
    document.querySelector('.contact__form').classList.add('scale-in');
});

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
            
            img.addEventListener('error', () => {
                console.error(`Error loading image: ${img.src}`);
                img.classList.add('error');
            });
        }
    });
});

const headerTop = document.querySelector('.header__top');
const headerTopOffset = headerTop ? headerTop.offsetTop : 0;

function handleScroll() {
    if (window.scrollY > headerTopOffset) {
        headerTop.classList.add('fixed');
    } else {
        headerTop.classList.remove('fixed');
    }
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScroll);
