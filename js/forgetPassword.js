function showResetFields() {
  const email = document.getElementById("reset-email").value;
  if (email.includes("@")) {
    alert("Reset link sent to " + email);
    document.getElementById("forgot-step-1").style.display = "none";
    document.getElementById("forgot-step-2").style.display = "block";
  } else {
    alert("Please enter a valid email.");
  }
}

function handleReset() {
  const newPass = document.getElementById("new-password");
  const confirmPass = document.getElementById("confirm-password");
  if (newPass.value === confirmPass.value && newPass.value.length >= 8) {
    alert("Success! Your password has been updated.");
    window.location.href = "subjectPage.html";
  } else {
    alert("Please ensure passwords match and meet requirements (8+ characters).");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const newPass = document.getElementById("new-password");
  const confirmPass = document.getElementById("confirm-password");
  const strengthMsg = document.getElementById("strength-msg");
  const matchMsg = document.getElementById("match-msg");

  if (newPass && strengthMsg) {
    newPass.addEventListener("input", function () {
      const val = newPass.value;
      const isStrong = val.length >= 8 && /[A-Z]/.test(val) && /[0-9]/.test(val);
      strengthMsg.textContent = isStrong
        ? "Strong Password"
        : "Too Weak (Need 8+ chars, Uppercase, & Number)";
      strengthMsg.style.color = isStrong ? "green" : "red";
    });
  }

  if (confirmPass && matchMsg) {
    confirmPass.addEventListener("input", function () {
      if (confirmPass.value === newPass.value) {
        matchMsg.textContent = "Passwords Match";
        matchMsg.style.color = "green";
      } else {
        matchMsg.textContent = "Passwords do not match";
        matchMsg.style.color = "red";
      }
    });
  }
});
