function handleLogin() {
  console.log("Button clicked!");
  const emailValue = document.getElementById("email").value;
  const passValue = document.getElementById("password").value;
  const feedback = document.getElementById("password-feedback");
  if (emailValue.trim() === "" || passValue.trim() === "") {
    feedback.style.color = "red";
    feedback.innerText = "Error: Please fill in both fields!";
  } else {
    console.log("Success! Redirecting...");
    window.location.href = "subjectPage.html";
  }
}

function SignIn() {
  window.location.href = "signin.html";
}
