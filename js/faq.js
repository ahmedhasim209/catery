/**
 * FAQ accordion — works for any page after DOM is ready.
 * Clicking a .faq-question toggles .open on its parent .faq-item.
 */
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".faq-question");
  if (!btn) return;
  const item = btn.closest(".faq-item");
  if (!item) return;
  const isOpen = item.classList.contains("open");
  // Close all siblings in the same group
  item.closest(".faq-group")
    ?.querySelectorAll(".faq-item.open")
    .forEach((el) => el.classList.remove("open"));
  if (!isOpen) item.classList.add("open");
});
