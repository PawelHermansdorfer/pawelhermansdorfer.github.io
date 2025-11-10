let logged_in = false;

document.getElementById("login-button").addEventListener("click", () => {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();
    const error = document.getElementById("login-error");

    if (user === "Admin" && pass === "Admin1234") {
        document.getElementById("login-overlay").style.display = "none";
        logged_in = true;
    } else {
        error.textContent = "Invalid username or password.";
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        document.getElementById("login-button").click();
    }
});
