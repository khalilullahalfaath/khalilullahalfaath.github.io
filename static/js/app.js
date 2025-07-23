const toggleButton = document.getElementById("theme-toggle");

function setTheme(mode) {
  document.documentElement.classList.toggle("dark", mode === "dark");
  localStorage.setItem("theme", mode);
  toggleButton.textContent = mode === "dark" ? "☀️" : "🌙";
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark ? "dark" : "light");
}

toggleButton.addEventListener("click", () => {
  const isDark = document.documentElement.classList.contains("dark");
  setTheme(isDark ? "light" : "dark");
});
