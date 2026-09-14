const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const navLinks = navMenu.querySelectorAll("a");

// Mobile menu
menuBtn.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");

  menuBtn.setAttribute(
    "aria-expanded",
    open ? "true" : "false"
  );
});

// Close mobile menu after clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// Demo delivery order form
const form = document.getElementById("orderForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  formMessage.textContent =
    "Delivery request created successfully! (Demo only)";

  form.reset();
});

// Automatically display current year in footer
document.getElementById("year").textContent =
  new Date().getFullYear();