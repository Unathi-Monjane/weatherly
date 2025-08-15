const apiKey = "b3eaa01071631999133de6e4b0691b80";

// Elements ...
// (keep your previous DOM selectors here)

// Load settings or defaults
const savedLocation = localStorage.getItem("defaultLocation") || "";
const savedUnit = localStorage.getItem("tempUnit") || "metric";
const savedTheme = localStorage.getItem("theme") || "light";

let units = savedUnit;

// Apply saved theme
document.body.classList.toggle("dark-mode", savedTheme === "dark");
themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";

// Fetch weather using saved location or geolocation
window.onload = () => {
  if(savedLocation) {
    fetchWeatherByCity(savedLocation);
  } else if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      fetchWeather(pos.coords.latitude, pos.coords.longitude);
    }, err => {
      locationName.textContent = "Please search your location.";
    });
  } else {
    locationName.textContent = "Geolocation not supported.";
  }

  // Auto-refresh logic here...
};

// Modify your fetchWeather & fetchWeatherByCity URLs to include units
// Example:

async function fetchWeather(lat, lon) {
  // ...
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=minutely,alerts&appid=${apiKey}`;
  // ...
}

async function fetchWeatherByCity(city) {
  // ...
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  // Same logic...
  fetchWeather(lat, lon);
}

// Theme toggle also updates localStorage
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});


// Fade-in main container
document.querySelector(".container").classList.add("fade-in");

// Set background class for weather
const mainWeather = data.current.weather[0].main.toLowerCase();
document.body.classList.remove("clear", "clouds", "rain", "snow", "thunderstorm");
if(["clear", "clouds", "rain", "snow", "thunderstorm"].includes(mainWeather)) {
  document.body.classList.add(mainWeather);
} else {
  document.body.classList.add("clear"); // fallback
}

function setLoading(isLoading) {
  document.getElementById("loading").style.display = isLoading ? "block" : "none";
}

// Call setLoading(true) before fetch calls, and setLoading(false) after data loads or errors
weatherIcon.src = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png`;
weatherIcon.alt = data.current.weather[0].description;
