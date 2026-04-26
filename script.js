const GOOGLE_APPS_SCRIPT_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbx8B0xEWk-KF6TVYvaAhVP0G-3yvjApVWe36u4OtIxU5oCE5C96ju0dxDxLAlTmaqdQ/exec";

const THEME_STORAGE_KEY = "exspec-theme";
const DEFAULT_THEME = "dark-technical";

const root = document.documentElement;
const themeSelect = document.getElementById("themeSelect");
const form = document.getElementById("inquiryForm");
const statusEl = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");
const ndaDownload = document.getElementById("ndaDownload");
const mouseGlow = document.querySelector(".mouse-glow");

function applyTheme(themeName) {
  root.setAttribute("data-theme", themeName);
  localStorage.setItem(THEME_STORAGE_KEY, themeName);
}

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const allowedThemes = ["dark-technical", "dark-research", "light-institutional"];
  const nextTheme = allowedThemes.includes(savedTheme) ? savedTheme : DEFAULT_THEME;
  applyTheme(nextTheme);
  if (themeSelect) {
    themeSelect.value = nextTheme;
    themeSelect.addEventListener("change", (event) => applyTheme(event.target.value));
  }
}

function initRevealAnimations() {
  const revealables = document.querySelectorAll(".reveal");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealables.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealables.forEach((el) => observer.observe(el));
}

function initCollaborationCards() {
  const cards = document.querySelectorAll(".collab-item");

  cards.forEach((card) => {
    const trigger = card.querySelector(".collab-trigger");
    const detail = card.querySelector(".collab-detail");
    let timer;

    const openCard = () => {
      window.clearTimeout(timer);
      detail.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
      timer = window.setTimeout(() => {
        detail.hidden = true;
        trigger.setAttribute("aria-expanded", "false");
      }, 3000);
    };

    const closeCard = () => {
      window.clearTimeout(timer);
      detail.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    };

    trigger.addEventListener("click", () => {
      if (trigger.getAttribute("aria-expanded") === "true") {
        closeCard();
      } else {
        openCard();
      }
    });

    card.addEventListener("mouseenter", openCard);
    card.addEventListener("mouseleave", closeCard);
    card.addEventListener("focusout", (event) => {
      if (!card.contains(event.relatedTarget)) closeCard();
    });
  });
}

async function handleSubmit(event) {
  event.preventDefault();
  statusEl.className = "status";

  if (!form.checkValidity()) {
    form.reportValidity();
    statusEl.textContent = "Please complete all required fields before submitting.";
    statusEl.classList.add("error");
    return;
  }

  const formData = new FormData(form);
  const payload = {
    firstName: formData.get("firstName")?.toString().trim(),
    lastName: formData.get("lastName")?.toString().trim(),
    institution: formData.get("institution")?.toString().trim(),
    role: formData.get("role")?.toString().trim(),
    email: formData.get("email")?.toString().trim(),
    phone: formData.get("phone")?.toString().trim(),
    department: formData.get("department")?.toString().trim(),
    areaOfInterest: formData.get("areaOfInterest")?.toString().trim(),
    message: formData.get("message")?.toString().trim(),
    consent: formData.get("consent") === "on"
  };

  submitBtn.disabled = true;
  submitBtn.setAttribute("aria-busy", "true");
  statusEl.textContent = "Submitting inquiry...";

  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_WEB_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Submission failed with status ${response.status}`);
    }

    statusEl.textContent = "Thank you. Your inquiry has been received.";
    statusEl.classList.add("success");
    form.reset();
    ndaDownload.hidden = false;
    ndaDownload.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    statusEl.textContent =
      "Submission could not be completed. Please contact research@wrekdtech.com directly.";
    statusEl.classList.add("error");
    console.error(error);
  } finally {
    submitBtn.disabled = false;
    submitBtn.removeAttribute("aria-busy");
  }
}

function initMouseGlow() {
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!mouseGlow || !isFinePointer || reducedMotion) return;

  window.addEventListener("mousemove", (event) => {
    mouseGlow.style.opacity = "1";
    mouseGlow.style.transform = `translate(${event.clientX - 160}px, ${event.clientY - 160}px)`;
  });
}

function initFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();
}

initTheme();
initRevealAnimations();
initCollaborationCards();
initMouseGlow();
initFooterYear();
if (form) form.addEventListener("submit", handleSubmit);
