// =========================================
// LOADING SCREEN
// =========================================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("loader-hide");

    }, 1700);

});

// =========================================
// SCROLL REVEAL
// =========================================

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll(){

    revealElements.forEach(element => {

        const windowHeight = window.innerHeight;
        const revealTop = element.getBoundingClientRect().top;
        const revealPoint = 120;

        if(revealTop < windowHeight - revealPoint){

            element.classList.add("active");

        }

    });

}

// =========================================
// ACTIVE NAVBAR
// =========================================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

function activeNavbar(){

    let current = "home";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 180;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

}

// =========================================
// SCROLL EVENTS
// =========================================

window.addEventListener("scroll", () => {

    revealOnScroll();
    activeNavbar();

});

// Jalankan sekali saat halaman dibuka

revealOnScroll();
activeNavbar();

// =========================================
// PREMIUM CURSOR
// =========================================

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

let mouseX = 0;
let mouseY = 0;

let outlineX = 0;
let outlineY = 0;

window.addEventListener("mousemove",(e)=>{

    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";

});

function animateCursor(){

    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    cursorOutline.style.left = outlineX + "px";
    cursorOutline.style.top = outlineY + "px";

    requestAnimationFrame(animateCursor);

}

animateCursor();

// =========================================
// CURSOR HOVER EFFECT
// =========================================

const hoverItems = document.querySelectorAll(".cursor-hover");

hoverItems.forEach(item=>{

    item.addEventListener("mouseenter",()=>{

        cursorOutline.style.width="58px";
        cursorOutline.style.height="58px";

        cursorOutline.style.borderColor="#C89B5C";

        cursorOutline.style.background="rgba(200,155,92,.08)";

    });

    item.addEventListener("mouseleave",()=>{

        cursorOutline.style.width="34px";
        cursorOutline.style.height="34px";

        cursorOutline.style.borderColor="rgba(200,155,92,.45)";

        cursorOutline.style.background="transparent";

    });

});

// =========================================
// MAGNETIC BUTTON
// =========================================

const magneticItems = document.querySelectorAll(".magnetic");

magneticItems.forEach(item => {

    item.addEventListener("mousemove", (e) => {

        const rect = item.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        item.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;

    });

    item.addEventListener("mouseleave", () => {

        item.style.transform = "translate(0,0)";

    });

});

// =========================================
// BACK TO TOP
// =========================================

const backToTop = document.getElementById("backToTop");
console.log(backToTop);

window.addEventListener("scroll", () => {

    if(window.scrollY > 350){

        backToTop.style.opacity = "1";
        backToTop.style.visibility = "visible";
        backToTop.style.transform = "translateY(0)";

    }else{

        backToTop.style.opacity = "0";
        backToTop.style.visibility = "hidden";
        backToTop.style.transform = "translateY(20px)";

    }

});

backToTop.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

// =========================================
// COUNTER ANIMATION
// =========================================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = parseInt(counter.dataset.target);
        let current = 0;

        const duration = 1800; // 1.8 detik
        const stepTime = 16;
        const increment = target / (duration / stepTime);

        function updateCounter(){

            current += increment;

            if(current < target){

                counter.textContent = Math.floor(current);

                requestAnimationFrame(updateCounter);

            }else{

                counter.textContent = target;

            }

        }

        updateCounter();

        counterObserver.unobserve(counter);

    });

},{
    threshold:0.6
});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    if(navMenu.classList.contains("active")){

        menuToggle.innerHTML = "✕";

        document.body.style.overflow = "hidden";

    }else{

        menuToggle.innerHTML = "☰";

        document.body.style.overflow = "";

    }

});


document.querySelectorAll(".nav-menu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        menuToggle.innerHTML = "☰";

        document.body.style.overflow = "";

    });

});


const slider = document.querySelector(".portfolio-slider");
const cards = document.querySelectorAll(".portfolio-card");
const dots = document.querySelectorAll(".portfolio-dots span");

slider.addEventListener("scroll", () => {

    const scrollLeft = slider.scrollLeft;

    const cardWidth = cards[0].offsetWidth + 20;

    const index = Math.round(scrollLeft / cardWidth);

    dots.forEach(dot => dot.classList.remove("active"));

    if(dots[index]){
        dots[index].classList.add("active");
    }

});