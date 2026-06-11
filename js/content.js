/**
 * JSON content binder.
 * Each page optionally sets: window.CONTENT_SRC = "/content/some-page.json"
 * This script fetches it + /content/site.json, then fills all
 * [data-bind="dot.path"] elements with the resolved value.
 *
 * Supports:
 *   - text content  (default)
 *   - href          data-bind-attr="href"
 *   - src           data-bind-attr="src"
 *   - innerHTML     data-bind-attr="html"
 *
 * Arrays: repeat the template element for each item.
 *   Parent el: data-bind-list="path.to.array"
 *   Child template: <template data-bind-item> ... </template>
 *   Inside template use data-bind="item.key" (relative to each item)
 */

function getByPath(obj, path) {
  return path.split(".").reduce((acc, k) => (acc != null ? acc[k] : undefined), obj);
}

function applyBindings(root, data) {
  // Simple bindings
  root.querySelectorAll("[data-bind]").forEach((el) => {
    const path  = el.getAttribute("data-bind");
    const attr  = el.getAttribute("data-bind-attr") || "text";
    const value = getByPath(data, path);
    if (value == null) return;
    if (attr === "text")  el.textContent = value;
    else if (attr === "html") el.innerHTML = value;
    else el.setAttribute(attr, value);
  });

  // List bindings
  root.querySelectorAll("[data-bind-list]").forEach((listEl) => {
    const path  = listEl.getAttribute("data-bind-list");
    const items = getByPath(data, path);
    if (!Array.isArray(items)) return;
    const tmpl  = listEl.querySelector("template[data-bind-item]");
    if (!tmpl) return;
    items.forEach((item) => {
      const clone = tmpl.content.cloneNode(true);
      // bind within the clone using item keys
      clone.querySelectorAll("[data-bind]").forEach((el) => {
        const key   = el.getAttribute("data-bind");
        const attr  = el.getAttribute("data-bind-attr") || "text";
        const value = getByPath(item, key);
        if (value == null) return;
        if (attr === "text")  el.textContent = value;
        else if (attr === "html") el.innerHTML = value;
        else el.setAttribute(attr, value);
      });
      listEl.appendChild(clone);
    });
    tmpl.remove();
  });
}

async function loadContent() {
  const sources = ["/content/site.json"];
  if (window.CONTENT_SRC) sources.push(window.CONTENT_SRC);

  const results = await Promise.all(
    sources.map((src) =>
      fetch(src)
        .then((r) => (r.ok ? r.json() : {}))
        .catch(() => ({}))
    )
  );

  // Merge all sources (later sources win)
  const data = Object.assign({}, ...results);
  applyBindings(document, data);
}

document.addEventListener("DOMContentLoaded", loadContent);
