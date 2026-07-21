/*==================================================
                NAVBAR SCROLL
==================================================*/

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    navbar.classList.toggle("scrolled", window.scrollY > 50);

});


/*==================================================
                MOBILE MENU
==================================================*/

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


/*==================================================
                ACTIVE MENU
==================================================*/

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.pageYOffset >= sectionTop) {

            current = section.id;

        }

    });

    navItems.forEach(link => {

        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + current
        );

    });

});


/*==================================================
                SCROLL REVEAL
==================================================*/

const reveals = document.querySelectorAll(".reveal");

function revealSection() {

    const windowHeight = window.innerHeight;

    reveals.forEach(item => {

        const revealTop = item.getBoundingClientRect().top;

        if (revealTop < windowHeight - 120) {

            item.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealSection);

revealSection();


/*==================================================
                LOADER
==================================================*/

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    if (!loader) return;

    setTimeout(() => {

        loader.classList.add("hidden");

    }, 700);

});


/*==================================================
                BACK TO TOP
==================================================*/

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {

    window.addEventListener("scroll", () => {

        backToTop.classList.toggle("active", window.scrollY > 400);

    });

    backToTop.addEventListener("click", e => {

        e.preventDefault();

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}


/*==================================================
                TYPEWRITER
==================================================*/

const typingElement = document.querySelector(".hero-text h2");

if (typingElement) {

    const words = [

        "Data Analyst",
        "Dashboard Developer",
        "Business Intelligence"

    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        typingElement.textContent = currentWord.substring(0, charIndex);

        if (isDeleting) {

            charIndex--;

        } else {

            charIndex++;

        }

        let speed = isDeleting ? 60 : 120;

        if (!isDeleting && charIndex > currentWord.length) {

            isDeleting = true;
            speed = 1800;

        }

        if (isDeleting && charIndex < 0) {

            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            charIndex = 0;

        }

        setTimeout(typeEffect, speed);

    }

    typeEffect();

}


/*==================================================
                DARK MODE
==================================================*/

const darkToggle = document.querySelector(".dark-mode");

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

}

if (darkToggle) {

    darkToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        localStorage.setItem(
            "theme",
            document.body.classList.contains("dark")
                ? "dark"
                : "light"
        );

    });

}


/*==================================================
            PROJECT / CERTIFICATE / ACHIEVEMENT LIGHTBOX
==================================================*/

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close-lightbox");

if (lightbox && lightboxImg) {

    document.addEventListener("click", e => {

        const item = e.target.closest(
            ".project-image, .certificate-image, .achievement-image"
        );

        if (!item) return;

        e.preventDefault();

        lightboxImg.src = item.href;

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

        if (typeof pauseSlider === "function") {

            pauseSlider();

        }

    });

    function closeLightbox() {

        lightbox.classList.remove("active");

        lightboxImg.src = "";

        document.body.style.overflow = "";

        if (typeof resumeSlider === "function") {

            resumeSlider();

        }

    }

    if (closeBtn) {

        closeBtn.addEventListener("click", e => {

            e.stopPropagation();

            closeLightbox();

        });

    }

    lightbox.addEventListener("click", e => {

        if (e.target === lightbox) {

            closeLightbox();

        }

    });

    document.addEventListener("keydown", e => {

        if (
            e.key === "Escape" &&
            lightbox.classList.contains("active")
        ) {

            closeLightbox();

        }

    });

}


/*==================================================
            INFINITE CERTIFICATE SLIDER
==================================================*/

const container = document.querySelector(".certification-container");
const slider = document.querySelector(".certification-slider");

if (container && slider) {

    [...slider.children].forEach(card => {

        slider.appendChild(card.cloneNode(true));

    });

    let currentX = 0;
    let sliderAnimation;

    const speed = 0.6;
    const originalWidth = slider.scrollWidth / 2;

    function animateSlider() {

        currentX -= speed;

        if (Math.abs(currentX) >= originalWidth) {

            currentX = 0;

        }

        slider.style.transform = `translateX(${currentX}px)`;

        sliderAnimation = requestAnimationFrame(animateSlider);

    }

    function pauseSlider() {

        cancelAnimationFrame(sliderAnimation);

    }

    function resumeSlider() {

        cancelAnimationFrame(sliderAnimation);

        animateSlider();

    }

    window.pauseSlider = pauseSlider;
    window.resumeSlider = resumeSlider;

    animateSlider();

    container.addEventListener("mouseenter", pauseSlider);
    container.addEventListener("mouseleave", resumeSlider);

}


/*==================================================
                PARALLAX HERO
==================================================*/

const heroImage = document.querySelector(".hero-image img");

if (heroImage) {

    window.addEventListener("scroll", () => {

        heroImage.style.transform =
            `translateY(${window.scrollY * 0.08}px)`;

    });

}


/*==================================================
                COUNTER
==================================================*/

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const target = Number(counter.dataset.target);

    function updateCounter() {

        const current = Number(counter.innerText);

        const increment = target / 80;

        if (current < target) {

            counter.innerText = Math.ceil(current + increment);

            setTimeout(updateCounter, 20);

        } else {

            counter.innerText = target;

        }

    }

    updateCounter();

});


/*==================================================
                    END
==================================================*/