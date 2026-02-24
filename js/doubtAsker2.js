window.onload = function () {
  const savedData = localStorage.getItem("selectedItem") || localStorage.getItem("selectedSubject");
  const displayElement = document.getElementById("display-here");
  displayElement.innerText = savedData ? "Subject: " + savedData : "No Subject Selected";

  const activeDoubt = localStorage.getItem("activeDoubt");
  const questionElement = document.getElementById("active-question");
  if (activeDoubt) {
    questionElement.innerText = "Q: " + activeDoubt;
  } else {
    questionElement.innerText = "No question selected.";
  }

  loadAnswers();
};

function loadAnswers() {
  const list = document.getElementById("answers-list");
  const activeDoubt = localStorage.getItem("activeDoubt");
  let allAnswers = JSON.parse(localStorage.getItem("answers")) || {};

  let currentAnswers = allAnswers[activeDoubt] || [];

  if (currentAnswers.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.innerText = "No answers yet. Be the first to solve!";
    list.appendChild(emptyState);
  } else {
    currentAnswers.forEach((ans) => {
      const div = document.createElement("div");
      div.className = "answer-box";
      div.innerText = ans;
      list.appendChild(div);
    });
  }
}
