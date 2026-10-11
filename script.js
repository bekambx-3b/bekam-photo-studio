// Bekam Photo Studio — theme toggle, mobile menu, reveal animations, and booking form.

const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeMeta = document.querySelector('meta[name="theme-color"]');

const moonIcon = '<path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"/>';
const sunIcon = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>';

function applyTheme(theme) {
  const dark = theme === "dark";
  root.classList.toggle("dark", dark);
  themeIcon.innerHTML = dark ? sunIcon : moonIcon;
  themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  themeMeta.setAttribute("content", dark ? "#111110" : "#faf9f6");
  try { localStorage.setItem("bekam-photo-theme", theme); } catch (_) {}
}

let savedTheme = null;
try { savedTheme = localStorage.getItem("bekam-photo-theme"); } catch (_) {}
const preferredDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme || (preferredDark ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  applyTheme(root.classList.contains("dark") ? "light" : "dark");
});

// Responsive mobile navigation
const mobileButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileButton.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("menu-open");
  mobileMenu.classList.toggle("hidden", !isOpen);
  mobileButton.setAttribute("aria-expanded", String(isOpen));
  mobileButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
mobileMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("menu-open");
    mobileButton.setAttribute("aria-expanded", "false");
  });
});

// Gentle scroll-in animation; content remains visible if IntersectionObserver is unavailable.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// Booking enquiry: replace this with the studio's real email before publishing.
const STUDIO_EMAIL = "YOUR_EMAIL@example.com";

document.getElementById("booking-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const service = String(data.get("service") || "Photography");
  const message = String(data.get("message") || "").trim();

  if (!name || !phone) {
    alert("Please enter your name and phone number.");
    return;
  }

  if (STUDIO_EMAIL === "YOUR_EMAIL@example.com") {
    alert("Demo form ready! Before publishing, open script.js and replace YOUR_EMAIL@example.com with the studio's real email address.");
    return;
  }

  const subject = encodeURIComponent(`Booking enquiry — ${service}`);
  const body = encodeURIComponent(
    `Name: ${name}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message || "No extra details provided."}`
  );
  window.location.href = `mailto:${STUDIO_EMAIL}?subject=${subject}&body=${body}`;
});

document.getElementById("year").textContent = new Date().getFullYear();
