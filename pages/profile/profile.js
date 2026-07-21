function toggleAuth(type) {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const buttons = document.querySelectorAll(".form-toggle button");

  if (type === "login") {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    buttons[0].classList.add("active");
    buttons[1].classList.remove("active");
  } else {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    buttons[1].classList.add("active");
    buttons[0].classList.remove("active");
  }
}

// Simulation for Demo
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("auth-section").classList.add("hidden");
  document.getElementById("profile-section").classList.remove("hidden");
});

function logout() {
  document.getElementById("auth-section").classList.remove("hidden");
  document.getElementById("profile-section").classList.add("hidden");
}
