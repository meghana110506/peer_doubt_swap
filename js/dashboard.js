window.onload = function () {
  const subject = localStorage.getItem("selectedSubject");
  const subjectTitle = document.getElementById("subjectTitle");

  if (subject) {
    subjectTitle.textContent = "Subject: " + subject;
  } else {
    subjectTitle.textContent = "No Subject Selected";
  }
};

function chooseRole(role) {
  localStorage.setItem("userRole", role);

  if (role === "asker") {
    window.location.href = "doubtAsker1.html";
  } else {
    window.location.href = "doubtSolver1.html";
  }
}
