// Preloader init
window.addEventListener("load", function () {
  const preloader = document.querySelector(".preloader");
  setTimeout(() => {
    preloader.classList.add("fade-out");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }, 1000);
});

function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.left = `${Math.random() * 100}%`;
    particle.style.bottom = `-${size}px`;

    const duration = Math.random() * 10 + 10;
    particle.style.animationDuration = `${duration}s`;

    particle.style.animationDelay = `${Math.random() * 5}s`;

    particlesContainer.appendChild(particle);
  }
}

function setupScrollAnimation() {
  const scrollElements = document.querySelectorAll(
    ".section-title, .gallery-item, .invitation-container, .testimony-card"
  );

  const elementInView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= window.innerHeight * 0.75;
  };

  const displayScrollElement = (element) => {
    element.classList.add("animate");
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el)) {
        displayScrollElement(el);
      }
    });
  };

  window.addEventListener("load", handleScrollAnimation);
  window.addEventListener("scroll", handleScrollAnimation);
}

function setupNavbar() {
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

function setupSocialModals() {
  const socialModal = document.getElementById("social-modal");
  const closeModalBtn = document.querySelector(".close-social-modal");
  const socialLinks = document.querySelectorAll(
    '.social-link:not(.social-link[href*="whatsapp"])'
  );

  socialLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      socialModal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  closeModalBtn.addEventListener("click", function () {
    socialModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  socialModal.addEventListener("click", function (e) {
    if (e.target === socialModal) {
      socialModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && socialModal.style.display === "flex") {
      socialModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
}

function setupMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenu = document.getElementById("close-menu");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("open");
    mobileMenu.classList.toggle("open");
  });

  closeMenu.addEventListener("click", function () {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
  });

  const mobileLinks = document.querySelectorAll(
    ".mobile-nav-link, .mobile-footer-link"
  );
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("open");
    });
  });
}

function setupCountdown() {
  const eventDate = new Date("August 16, 2025 12:00:00").getTime();

  const countdown = setInterval(function () {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
      .toString()
      .padStart(2, "0");

    if (distance < 0) {
      clearInterval(countdown);
      document.getElementById("countdown").innerHTML =
        '<div class="event-ended">The event has started!</div>';
    }
  }, 1000);
}

function setupGalleryModal() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const modal = document.getElementById("gallery-modal");
  const modalContent = modal.querySelector(".modal-content");
  const closeModal = modal.querySelector(".close-modal");
  const prevBtn = modal.querySelector(".prev-btn");
  const nextBtn = modal.querySelector(".next-btn");

  let currentIndex = 0;
  let items = [];

  galleryItems.forEach((item, index) => {
    items.push({
      type: item.dataset.type,
      src: item.dataset.src,
      caption: item.querySelector(".gallery-caption").textContent,
    });

    item.addEventListener("click", () => {
      currentIndex = index;
      openModal(currentIndex);
    });
  });

  function openModal(index) {
    const item = items[index];
    modalContent.innerHTML = `
      <img src="${item.src}" alt="${item.caption}">
      <div class="modal-caption">${item.caption}</div>
    `;
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  function closeModalFunc() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    openModal(currentIndex);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % items.length;
    openModal(currentIndex);
  }

  closeModal.addEventListener("click", closeModalFunc);
  prevBtn.addEventListener("click", showPrev);
  nextBtn.addEventListener("click", showNext);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalFunc();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "block") {
      if (e.key === "Escape") {
        closeModalFunc();
      } else if (e.key === "ArrowLeft") {
        showPrev();
      } else if (e.key === "ArrowRight") {
        showNext();
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  createParticles();
  setupScrollAnimation();
  setupNavbar();
  setupMobileMenu();
  setupCountdown();
  setupGalleryModal();
  setupSocialModals();
});