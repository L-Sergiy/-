document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('section, .card, header, h1, h2');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        setTimeout(() => {
            el.classList.add('initial-animate', 'fade-in-up', `delay-${(index % 5 + 1) * 100}`);
        }, 100);
    });

    // Ініціалізація подій для кнопок
    const themeToggle = document.getElementById('themeToggle');
    const uaLang = document.getElementById('uaLang');
    const enLang = document.getElementById('enLang');

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (uaLang) uaLang.addEventListener('click', () => changeLang('ua'));
    if (enLang) enLang.addEventListener('click', () => changeLang('en'));

    // Застосувати збережену мову та тему
    const savedLang = localStorage.getItem('language') || 'ua';
    changeLang(savedLang);

    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') toggleTheme();
});

ScrollReveal().reveal('[data-sr-id]', {
    distance: '80px',
    duration: 1500,
    easing: 'ease-in-out',
    origin: 'bottom',
    interval: 300,
    reset: true
});

function toggleTheme() {
    const x = event.clientX;
    const y = event.clientY;
    const transition = document.createElement('div');
    
    transition.className = 'theme-transition';
    transition.style.setProperty('--x', x + 'px');
    transition.style.setProperty('--y', y + 'px');
    transition.style.background = 
        document.body.classList.contains('dark-theme') 
            ? 'radial-gradient(circle, #ffffff, #f3f4f6)'
            : 'radial-gradient(circle, #1a1a1a, #000000)';
    
    document.body.appendChild(transition);
    requestAnimationFrame(() => transition.classList.add('active'));
    
    setTimeout(() => {
        const body = document.body;
        const isDark = body.classList.toggle('dark-theme');
        body.classList.toggle('light-theme', !isDark);

        document.querySelectorAll('.card, .shine, .video-placeholder').forEach(el => {
            el.classList.toggle('dark-theme', isDark);
            el.classList.toggle('light-theme', !isDark);
        });

        document.querySelectorAll('p, h1, h2, h3, span').forEach(el => {
            el.style.color = isDark ? '#e0e0e0' : '#000000';
        });

        const header = document.getElementById('site-header');
        header.style.background = isDark ? '#121212' : '#ffffff';
        header.style.borderBottom = isDark ? '1px solid #2c2c2c' : '1px solid rgba(0, 0, 0, 0.1)';
        header.style.boxShadow = isDark ? '0 4px 6px rgba(0, 0, 0, 0.5)' : '';

        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        transition.remove();

        // Повторно застосувати мову після зміни теми
        const savedLang = localStorage.getItem('language') || 'ua';
        changeLang(savedLang);
    }, 1000);
}

// Enhanced scroll handling for header
let lastScrollY = 0;
let ticking = false;
const header = document.getElementById('site-header');

function updateHeader() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
        header.classList.add('hidden');
    } else if (currentScrollY < lastScrollY) {
        header.classList.remove('hidden');
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateHeader();
            ticking = false;
        });
        ticking = true;
    }
});

document.querySelectorAll('.card').forEach(card => {
    card.classList.add('glow-effect');
});

document.querySelectorAll('h2').forEach(h2 => {
    h2.classList.add('gradient-text');
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.parallax').forEach(elem => {
        const speed = 0.5;
        elem.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

ScrollReveal().reveal('.card', {
    distance: '50px',
    duration: 1500,
    origin: 'bottom',
    interval: 200,
    scale: 0.3,
    cleanup: true,
    reset: true
});

document.querySelectorAll('section').forEach(section => {
    if (!section.classList.contains('parallax')) {
        section.classList.add('hover-glow');
    }
});

document.querySelectorAll('h2, h3').forEach(heading => {
    heading.classList.add('hover-scale');
});

document.querySelectorAll('img').forEach(img => {
    img.classList.add('hover-bright');
});

document.querySelectorAll('.card').forEach(card => {
    card.classList.add('hover-glow');
});

const parallaxElements = document.querySelectorAll('.parallax-item');
let parallaxTicking = false;

window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
        window.requestAnimationFrame(() => {
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const rect = element.getBoundingClientRect();
                const scrolled = window.pageYOffset;
                
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const yPos = -(scrolled * speed);
                    element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                }
            });
            parallaxTicking = false;
        });
        parallaxTicking = true;
    }
});

function checkMobile() {
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.parallax').forEach(el => {
            el.style.backgroundAttachment = 'scroll';
        });
    }
}

window.addEventListener('resize', checkMobile);
checkMobile();

const translations = {
    ua: {
        title: "Збережімо первоцвіти",
        mainHeading: "Збережімо первоцвіти!",
        subHeading: "Кожна квітка — це дотик до творіння Божого 🌸",
        saveMessage: "Не зривай — збережи!",
        whyImportant: "Чому важливо берегти первоцвіти?",
        mainText1: "Первоцвіти — це не просто гарні квіти, це унікальні творіння Божі, які з'являються першими після довгої зими. Вони очищають повітря, підтримують екосистему і радують наш зір. Та через жадібність і байдужість людей ці квіти опинились на межі зникнення.",
        mainText2: "Якщо ми не будемо діяти зараз, ці ніжні символи весни залишаться лише на фото. Не купуй і не зривай первоцвіти — краще помилуйся ними в природі. Збережімо Божу красу разом!",
        benefits: "Яка користь від первоцвітів?",
        forEcosystem: "Для екосистеми 🌿",
        ecosystemText: "Первоцвіти є важливим джерелом нектару для перших весняних комах, особливо бджіл. Вони допомагають підтримувати баланс екосистеми після зими.",
        forHealth: "Для здоров'я 🌱",
        healthText: "Багато первоцвітів мають лікувальні властивості. Наприклад, підсніжники містять речовини, які використовують у медицині.",
        forSoil: "Для ґрунту 🌍",
        soilText: "Первоцвіти допомагають утримувати вологу в ґрунті та захищають його від ерозії після танення снігу.",
        forSoul: "Для душі 💚",
        soulText: "Ці квіти дарують нам першу весняну красу, піднімають настрій та нагадують про відродження природи.",
        snowdrop: "Підсніжник",
        snowdropText: "Символ чистоти й надії. Один із перших вісників весни.",
        winterAconite: "Зимовик",
        winterAconiteText: "Рідкісний жовтий первоцвіт, який розцвітає ще в снігу.",
        liverleaf: "Печіночниця",
        liverleafText: "Ніжна лісова квітка, яка потребує нашого захисту.",
        video: "Відео про красу первоцвітів",
        videoPlaceholder: "Тут буде відео, яке вставить Сергійко 🎥",
        changeTheme: "🌗 Змінити тему",
        footer: "© 2025 Збережімо первоцвіти 🌷 З любов'ю до природи і Бога 💚",
        poem: {
            title: "Первоцвіти",
            text: [
                "Первоцвіти — красиві квіти,",
                "Але ти їх не зривай!",
                "Бо занесені до книги,",
                "В якій природний скарб.",
                "Краще збережи природу —",
                "Первоцвіти ти не рви,",
                "І не наступай ногою,",
                "Бо лишилось мало їх.",
                "Первоцвіти збережи!"
            ]
        }
    },
    en: {
        title: "Save Primroses",
        mainHeading: "Save Primroses!",
        subHeading: "Each flower is a touch of God's creation 🌸",
        saveMessage: "Don't pick — preserve!",
        whyImportant: "Why is it important to protect primroses?",
        mainText1: "Primroses are not just beautiful flowers, they are unique God's creations that appear first after the long winter. They purify the air, support the ecosystem and please our eyes. But due to human greed and indifference, these flowers are on the verge of extinction.",
        mainText2: "If we don't act now, these delicate symbols of spring will remain only in photos. Don't buy or pick primroses — better admire them in nature. Let's preserve God's beauty together!",
        benefits: "What are the benefits of primroses?",
        forEcosystem: "For ecosystem 🌿",
        ecosystemText: "Primroses are an important source of nectar for the first spring insects, especially bees. They help maintain ecosystem balance after winter.",
        forHealth: "For health 🌱",
        healthText: "Many primroses have medicinal properties. For example, snowdrops contain substances used in medicine.",
        forSoil: "For soil 🌍",
        soilText: "Primroses help retain moisture in the soil and protect it from erosion after snow melts.",
        forSoul: "For soul 💚",
        soulText: "These flowers give us the first spring beauty, lift our spirits and remind us of nature's revival.",
        snowdrop: "Snowdrop",
        snowdropText: "A symbol of purity and hope. One of the first heralds of spring.",
        winterAconite: "Winter Aconite",
        winterAconiteText: "A rare yellow primrose that blooms even in snow.",
        liverleaf: "Liverleaf",
        liverleafText: "A delicate forest flower that needs our protection.",
        video: "Video about primrose beauty",
        videoPlaceholder: "Here will be a video added by Serhii 🎥",
        changeTheme: "🌗 Change theme",
        footer: "© 2025 Save Primroses 🌷 With love for nature and God 💚",
        poem: {
            title: "Primroses",
            text: [
                "Primroses are beautiful flowers,",
                "But please do not pick them!",
                "They're listed in the book",
                "Of natural treasures pure.",
                "Better preserve nature —",
                "Leave primroses to grow,",
                "And watch your step with care,",
                "For few of them remain.",
                "Save primroses today!"
            ]
        }
    }
};

function changeLang(lang) {
    const t = translations[lang];
    if (!t) return;

    // Оновлення активності кнопок
    const uaLangBtn = document.getElementById('uaLang');
    const enLangBtn = document.getElementById('enLang');
    if (uaLangBtn) uaLangBtn.classList.toggle('active', lang === 'ua');
    if (enLangBtn) enLangBtn.classList.toggle('active', lang === 'en');

    const isDark = document.body.classList.contains('dark-theme');

    // Оновлення тексту елементів
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) headerTitle.textContent = t.title;

    const mainHeading = document.querySelector('.gradient-text span');
    if (mainHeading) mainHeading.textContent = t.mainHeading;

    const subHeading = document.querySelector('.text-2xl');
    if (subHeading) subHeading.textContent = t.subHeading;

    const saveMessage = document.querySelector('.parallax h2');
    if (saveMessage) saveMessage.textContent = t.saveMessage;

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) themeToggle.textContent = t.changeTheme;

    const whySection = document.querySelector('main section:first-child h2');
    if (whySection) whySection.textContent = t.whyImportant;

    const benefitsSection = document.querySelector('main section:nth-child(2) h2');
    if (benefitsSection) benefitsSection.textContent = t.benefits;

    const videoSection = document.querySelector('main section:last-child h2');
    if (videoSection) videoSection.textContent = t.video;

    const footerText = document.querySelector('footer p');
    if (footerText) footerText.textContent = t.footer;

    // Оновлення секції "Яка користь від первоцвітів?"
    const benefitTitles = document.querySelectorAll('.benefit-card h3');
    const benefitTexts = document.querySelectorAll('.benefit-card p');
    if (benefitTitles.length >= 4 && benefitTexts.length >= 4) {
        benefitTitles[0].textContent = t.forEcosystem;
        benefitTitles[1].textContent = t.forHealth;
        benefitTitles[2].textContent = t.forSoil;
        benefitTitles[3].textContent = t.forSoul;
        benefitTexts[0].textContent = t.ecosystemText;
        benefitTexts[1].textContent = t.healthText;
        benefitTexts[2].textContent = t.soilText;
        benefitTexts[3].textContent = t.soulText;
    }

    // Оновлення тексту "Чому важливо берегти первоцвіти?"
    const mainTexts = document.querySelectorAll('main section:first-child p');
    if (mainTexts.length >= 2) {
        mainTexts[0].textContent = t.mainText1;
        mainTexts[1].textContent = t.mainText2;
    }

    // Оновлення карток квітів
    const flowerCards = document.querySelectorAll('.card');
    if (flowerCards.length >= 4) {
        flowerCards[0].querySelector('h2').textContent = t.snowdrop;
        flowerCards[0].querySelector('p').textContent = t.snowdropText;
        flowerCards[1].querySelector('h2').textContent = t.winterAconite;
        flowerCards[1].querySelector('p').textContent = t.winterAconiteText;
        flowerCards[2].querySelector('h2').textContent = t.liverleaf;
        flowerCards[2].querySelector('p').textContent = t.liverleafText;
    }

    // Оновлення вірша
    const poemTitle = document.querySelector('.benefit-card h2');
    const poemText = document.querySelector('.benefit-card .text-black');
    if (poemTitle && poemText && t.poem) {
        poemTitle.textContent = t.poem.title;
        poemText.innerHTML = t.poem.text.join('<br>');
    }

    // Оновлення кольорів для теми
    if (isDark) {
        document.querySelectorAll('p, h1, h2, h3, span').forEach(el => {
            el.style.color = '#e0e0e0';
        });
    } else {
        document.querySelectorAll('*').forEach(el => {
            if (el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE') {
                el.style.setProperty('color', 'rgba(34, 197, 94, 0.9)', 'important');
            }
        });
    }

    localStorage.setItem('language', lang);
}

// Initialize Particles
tsParticles.load("tsparticles", {
    particles: {
        number: { value: 80 },
        color: { value: "#22c55e" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            outModes: { default: "bounce" }
        },
        links: {
            enable: true,
            color: "#22c55e",
            opacity: 0.3
        }
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "grab"
            }
        },
        modes: {
            grab: {
                distance: 140,
                links: { opacity: 1 }
            }
        }
    }
});