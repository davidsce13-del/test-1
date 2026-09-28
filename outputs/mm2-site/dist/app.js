document.querySelector(".header-play").addEventListener("click", () => {
  location.hash = "servers";
});
document.querySelector(".theme-toggle").addEventListener("click", (e) => {
  const light = document.documentElement.classList.toggle("light");
  e.currentTarget.setAttribute(
    "aria-label",
    `Switch to ${light ? "dark" : "light"} theme`,
  );
  e.currentTarget.setAttribute("aria-pressed", String(light));
});
document.querySelectorAll(".faq-trigger").forEach((button) => {
  const panel = button.closest(".faq-item").querySelector('[role="region"]');
  button.setAttribute("aria-controls", panel.id);
  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(open));
    button.dataset.state = open ? "open" : "closed";
    panel.hidden = !open;
  });
});
