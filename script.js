document.addEventListener("DOMContentLoaded", () => {
  // --- Theme Toggler ---
  const toggleBtn = document.getElementById("mode-toggle");
  const body = document.body;
  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  toggleBtn.innerHTML = moonIcon;
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    toggleBtn.innerHTML = body.classList.contains("light-mode")
      ? sunIcon
      : moonIcon;
  });

  // --- Dynamic Section Loader ---
  const loadSection = async (sectionId) => {
    const container = document.getElementById(sectionId);
    if (!container) return;
    const fileName = sectionId === "education" ? "education" : sectionId;
    try {
      const response = await fetch(`sections/${fileName}.html`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const content = await response.text();
      container.innerHTML = content;
    } catch (error) {
      console.error(`Could not load section "${sectionId}":`, error);
      container.innerHTML = `<p style="color:red; text-align:center;">Failed to load ${sectionId} content.</p>`;
    }
  };
  const sectionsToLoad = [
    "about",
    "skills",
    "projects",
    "experience",
    "education",
    "contact",
  ];
  sectionsToLoad.forEach(loadSection);

  // --- Auto-Hiding Navbar Logic ---
  const header = document.querySelector("header");
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    if (lastScrollY < window.scrollY && window.scrollY > 100) {
      // Added a small threshold
      header.classList.add("header-hidden");
    } else {
      header.classList.remove("header-hidden");
    }
    lastScrollY = window.scrollY;
  });

  // --- Mobile Hamburger Menu Logic ---
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("nav-open");
      const icon = mobileMenuToggle.querySelector("i");
      if (navLinks.classList.contains("nav-open")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
    navLinks.addEventListener("click", (event) => {
      if (
        event.target.tagName === "A" &&
        navLinks.classList.contains("nav-open")
      ) {
        navLinks.classList.remove("nav-open");
        const icon = mobileMenuToggle.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  }

  // --- Typing Animation Logic ---
  // We need to wait for the sections to be loaded before starting the animation
  const initTypingAnimation = () => {
    const typedElement = document.querySelector("#typed-text");
    if (typedElement) {
      const typedOptions = {
        strings: [
          "  MERN Stack Developer",
          "  Web Developer",
          "  Problem Solver",
        ],
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 2000,
        loop: true,
      };
      const typed = new Typed("#typed-text", typedOptions);
    }
  };
  // A simple way to check if the section is loaded is to wait a bit
  setTimeout(initTypingAnimation, 500);

  // --- Projects Horizontal Scroller Logic ---
  const initProjectScroller = () => {
    const projectsGrid = document.querySelector(".projects-grid");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");

    if (projectsGrid && leftArrow && rightArrow) {
      const scrollAmount = 368; // Width of a card (340) + gap (28)

      rightArrow.addEventListener("click", () => {
        projectsGrid.scrollLeft += scrollAmount;
      });

      leftArrow.addEventListener("click", () => {
        projectsGrid.scrollLeft -= scrollAmount;
      });
    }
  };
  // Also wait a bit for the projects section to load
  setTimeout(initProjectScroller, 500);
});
