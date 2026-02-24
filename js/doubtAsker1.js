let currentStars = 0;

window.onload = function () {
  const subject = localStorage.getItem("selectedSubject");
  const displayElement = document.getElementById("display-here");
  if (subject) {
    displayElement.innerText = "Subject: " + subject;
  } else {
    displayElement.innerText = "No Subject Selected";
  }
};

function validateQuestion(question) {
  const trimmedQuestion = question.trim();

  if (trimmedQuestion === "") {
    return { valid: false, message: "Please type a question before posting." };
  }

  if (trimmedQuestion.length < 10) {
    return { valid: false, message: "Question must be at least 10 characters long." };
  }

  if (trimmedQuestion.length > 1000) {
    return { valid: false, message: "Question is too long. Please keep it under 1000 characters." };
  }

  const hasLetters = /[a-zA-Z]/.test(trimmedQuestion);
  if (!hasLetters) {
    return { valid: false, message: "Question must contain at least some text." };
  }

  const letterCount = (trimmedQuestion.match(/[a-zA-Z]/g) || []).length;
  const totalChars = trimmedQuestion.length;
  if (letterCount < totalChars * 0.3) {
    return { valid: false, message: "Question must contain meaningful text, not just numbers or symbols." };
  }

  return { valid: true, message: "" };
}

function postDoubt() {
  const questionInput = document.getElementById("user-input");
  const questionValue = questionInput.value;
  const difficultySelect = document.getElementById("difficulty-select");
  const difficultyValue = difficultySelect.value;
  const listContainer = document.getElementById("posted-doubts-list");

  const validation = validateQuestion(questionValue);
  if (!validation.valid) {
    alert(validation.message);
    return;
  }

  if (difficultyValue === "") {
    alert("Please select a difficulty level.");
    return;
  }

  localStorage.setItem("selectedDifficulty", difficultyValue);

  let doubts = JSON.parse(localStorage.getItem("allDoubts")) || [];
  doubts.push({
    question: questionValue,
    difficulty: difficultyValue,
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem("allDoubts", JSON.stringify(doubts));

  const newDoubt = document.createElement("div");
  newDoubt.className = "doubt-box";
  newDoubt.innerText = questionValue;

  newDoubt.onclick = function () {
    localStorage.setItem("activeDoubt", questionValue);
    window.location.href = "doubtAsker2.html";
  };

  listContainer.prepend(newDoubt);
  currentStars += 10;
  document.getElementById("star-count").innerText = currentStars;
  questionInput.value = "";
  difficultySelect.value = "";
}
