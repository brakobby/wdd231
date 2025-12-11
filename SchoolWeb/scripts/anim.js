// scripts/anim.js - Pure Vanilla JS (No Libraries)
document.addEventListener("DOMContentLoaded", function () {

  // ====================== SMOOTH SCROLL ANIMATIONS ======================
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -80px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  document.querySelectorAll(`
    .features, .about-feature, .programs-main, .testimonials,
    .card, .pcard, .abt-img, .content-abt
  `).forEach(el => {
    el.classList.add("animate");
    observer.observe(el);
  });

  // Hero text animation on load
  document.querySelector(".overlay").style.opacity = "0";
  document.querySelector(".overlay").style.transform = "translateY(50px)";
  setTimeout(() => {
    document.querySelector(".overlay").style.transition = "all 1.2s ease-out";
    document.querySelector(".overlay").style.opacity = "1";
    document.querySelector(".overlay").style.transform = "translateY(0)";
  }, 300);

  // ====================== MOBILE MENU ======================
  const header = document.querySelector("header");
  const nav = document.querySelector("nav");

  const hamburger = document.createElement("div");
  hamburger.innerHTML = `<i class="fas fa-bars"></i>`;
  hamburger.className = "hamburger";
  hamburger.style.cssText = `
    display: none; cursor: pointer; font-size: 28px; padding: 12px; 
    background: #6c0d64; color: white; border-radius: 12px; 
    position: fixed; top: 20px; right: 20px; z-index: 1000;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3); transition: all 0.3s;
  `;
  document.body.appendChild(hamburger);

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("mobile-open");
    hamburger.innerHTML = nav.classList.contains("mobile-open")
      ? `<i class="fas fa-times"></i>`
      : `<i class="fas fa-bars"></i>`;
  });

  function checkMobile() {
    if (window.innerWidth <= 900) {
      hamburger.style.display = "block";
      nav.style.display = "none";
    } else {
      hamburger.style.display = "none";
      nav.style.display = "flex";
      nav.classList.remove("mobile-open");
    }
  }
  checkMobile();
  window.addEventListener("resize", checkMobile);

  // ====================== TESTIMONIAL SLIDER - FIXED & SMOOTH ======================
  const radios = document.querySelectorAll('input[name="testimonial"]');
  let current = 0;
  let autoPlay;

  function goToSlide(index) {
    radios[index].checked = true;
    current = index;
  }

  function nextSlide() {
    current = (current + 1) % radios.length;
    goToSlide(current);
  }

  function startAutoPlay() {
    autoPlay = setInterval(nextSlide, 6000);
  }

  startAutoPlay();
  const slider = document.querySelector(".testimonial-slider");
  slider.addEventListener("mouseenter", () => clearInterval(autoPlay));
  slider.addEventListener("mouseleave", startAutoPlay);

});