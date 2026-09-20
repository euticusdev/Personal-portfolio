
/* =========================================================
   EUTICUS DEV PORTFOLIO
   JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     ELEMENTS
     ======================================================= */

  const header = document.querySelector(".site-header");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const revealElements = document.querySelectorAll(".reveal");
  const sections = document.querySelectorAll("main section[id]");
  const yearElement = document.getElementById("year");

  /* =======================================================
     CURRENT YEAR
     ======================================================= */

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  const openMenu = () => {
    if (!menuToggle || !navMenu) return;

    menuToggle.classList.add("open");
    navMenu.classList.add("open");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");

    document.body.classList.add("menu-open");
  };

  const closeMenu = () => {
    if (!menuToggle || !navMenu) return;

    menuToggle.classList.remove("open");
    navMenu.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    document.body.classList.remove("menu-open");
  };

  const toggleMenu = () => {
    if (!menuToggle || !navMenu) return;

    const isOpen = navMenu.classList.contains("open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
  }

  /* Close mobile menu after clicking a navigation link */

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  /* Close mobile menu when Escape is pressed */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  /* Close mobile menu when clicking outside the menu */

  document.addEventListener("click", (event) => {
    if (!menuToggle || !navMenu) return;

    const isMenuOpen = navMenu.classList.contains("open");

    if (!isMenuOpen) return;

    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeMenu();
    }
  });

  /* =======================================================
     HEADER SCROLL EFFECT
     ======================================================= */

  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();

  /* =======================================================
     SCROLL REVEAL ANIMATION
     ======================================================= */

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  /* =======================================================
     ACTIVE NAVIGATION LINK
     ======================================================= */

  const updateActiveNav = () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionBottom
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");

      if (href === `#${currentSection}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  window.addEventListener("scroll", updateActiveNav, {
    passive: true
  });

  updateActiveNav();

  /* =======================================================
     SMOOTH INTERNAL NAVIGATION
     ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const headerHeight = header
        ? header.offsetHeight
        : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

      closeMenu();
    });
  });

  /* =======================================================
     TERMINAL CARD INTERACTION
     ======================================================= */

  const heroCard = document.querySelector(".hero-card");
  const terminalWindow = document.querySelector(".terminal-window");

  if (heroCard && terminalWindow) {
    heroCard.addEventListener("mousemove", (event) => {
      if (window.innerWidth <= 950) return;

      const rect = heroCard.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 8;
      const rotateX = ((y / rect.height) - 0.5) * -6;

      terminalWindow.style.transform =
        `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });

    heroCard.addEventListener("mouseleave", () => {
      terminalWindow.style.transform =
        "rotateY(-5deg) rotateX(2deg)";
    });
  }

  /* =======================================================
     RESIZE SAFETY
     ======================================================= */

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }

    if (window.innerWidth <= 950 && terminalWindow) {
      terminalWindow.style.transform = "";
    }
  });

  /* =======================================================
     INITIAL STATE
     ======================================================= */

  document.body.classList.remove("menu-open");
});

