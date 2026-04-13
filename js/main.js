/**
 * main.js — Lumina Agency interactions
 * Bootstrap 4 Project
 */

document.addEventListener('DOMContentLoaded', function () {

  /* ========================
     Smooth Scroll
     ======================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });

        // Close mobile nav if open
        var navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
        }
      }
    });
  });

  /* ========================
     Active Nav Link on Scroll
     ======================== */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('#main-navbar .nav-link');

  function onScroll() {
    var scrollY = window.pageYOffset;
    sections.forEach(function (section) {
      var sectionTop = section.offsetTop - 100;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute('id');
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ========================
     Intersection Observer — Fade In Up
     ======================== */
  var fadeEls = document.querySelectorAll('.fade-in-up');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback for older browsers
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ========================
     Navbar Scroll Shrink
     ======================== */
  var navbar = document.getElementById('main-navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar.style.padding = '0.5rem 0';
    } else {
      navbar.style.padding = '1rem 0';
    }
  }, { passive: true });

  /* ========================
     Contact Form Validation & Submission
     ======================== */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('contact-name').value.trim();
      var email = document.getElementById('contact-email').value.trim();
      var message = document.getElementById('contact-message').value.trim();
      var alertEl = document.getElementById('form-alert');

      if (!name || !email || !message) {
        alertEl.textContent = 'Please fill in all fields.';
        alertEl.className = 'alert alert-danger mt-3';
        alertEl.style.display = 'block';
        return;
      }

      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alertEl.textContent = 'Please enter a valid email address.';
        alertEl.className = 'alert alert-danger mt-3';
        alertEl.style.display = 'block';
        return;
      }

      // Simulate success
      alertEl.textContent = '✓ Message sent! We\'ll be in touch shortly.';
      alertEl.className = 'alert alert-success mt-3';
      alertEl.style.display = 'block';
      contactForm.reset();

      setTimeout(function () { alertEl.style.display = 'none'; }, 5000);
    });
  }

  /* ========================
     Current Year in Footer
     ======================== */
  var yearEl = document.getElementById('current-year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

});
