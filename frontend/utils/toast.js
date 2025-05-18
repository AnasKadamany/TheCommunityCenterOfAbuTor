function showToast(message, type = "info") {
  // Remove any existing toast to prevent stacking
  const existingToast = document.querySelector(".notification");
  if (existingToast) existingToast.remove();

  // Create toast element
  const toast = document.createElement("div");
  toast.textContent = message;

  // Inline styles with conditional background based on type
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 10000;
    min-width: 300px;
    background: ${
      type === "success" ? "#2ecc71" : type === "error" ? "#e74c3c" : "#3498db"
    };
    color: #fff;
    padding: 10px 15px;
    border-radius: 5px;
    font-family: sans-serif;
    font-size: 14px;
    animation: slideIn 0.3s ease;
  `;

  // Add keyframes for slideIn and slideOut only once
  if (!document.getElementById("toast-animations")) {
    const style = document.createElement("style");
    style.id = "toast-animations";
    style.innerHTML = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);

  // Animate slideOut after 4s
  setTimeout(() => {
    toast.style.animation = "slideOut 0.5s ease forwards";
    setTimeout(() => toast.remove(), 500); // remove after animation
  }, 4000);
}

window.showToast = showToast;
