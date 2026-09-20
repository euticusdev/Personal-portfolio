document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     EUTICUS DEV PORTFOLIO
     Main JavaScript
     ========================================================= */

  // ---------------------------------------------------------
  // Current year
  // ---------------------------------------------------------
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ---------------------------------------------------------
  // Reveal sections
  // ---------------------------------------------------------
  const revealElements = document.querySelectorAll(".reveal");

  revealElements.forEach((element) => {
    element.classList.add("visible");
  });

  // ---------------------------------------------------------
  // Mobile navigation
  // ---------------------------------------------------------
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    const openMenu = () => {
      navMenu.classList.add("open");
      menuToggle.classList.add("open");
      menuToggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-open");
    };

    const closeMenu = () => {
      navMenu.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    };

    menuToggle.addEventListener("click", () => {
      if (navMenu.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when a navigation link is clicked
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    // Close menu with Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    // Close menu when clicking outside it
    document.addEventListener("click", (event) => {
      if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    // Close mobile menu if window becomes desktop-sized
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }

  // ---------------------------------------------------------
  // Header scroll effect
  // ---------------------------------------------------------
  const header = document.querySelector(".site-header");

  if (header) {
    const updateHeader = () => {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", updateHeader);
    updateHeader();
  }
});
