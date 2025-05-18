document
  .getElementById("login-box")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("user-input").value.trim();
    const password = document.getElementById("pass-input").value.trim();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || "Login failed");
        return;
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      showToast("Login successful", "success");
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500); // 1.5 seconds
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  });
