document.addEventListener("DOMContentLoaded", () => {
  // Current year
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Reveal sections
  const revealElements = document.querySelectorAll(".reveal");

  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
});
