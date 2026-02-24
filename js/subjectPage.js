document.getElementById("subjectForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const subject = document.getElementById("subjectSelect").value;

  if (subject === "") {
    alert("Please select a subject.");
    return;
  }

  localStorage.setItem("selectedSubject", subject);
  window.location.href = "dashboard.html";
});
