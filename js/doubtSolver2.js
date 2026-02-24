let currentStars = 0;

function updateEmptyState() {
  const commentList = document.getElementById("comment-list");
  let emptyMsg = document.getElementById("empty-msg");
  if (commentList.children.length === 0) {
    if (!emptyMsg) {
      emptyMsg = document.createElement("p");
      emptyMsg.id = "empty-msg";
      emptyMsg.className = "empty-msg";
      emptyMsg.innerText = "Still looking for solutions...";
      commentList.parentNode.appendChild(emptyMsg);
    }
  } else {
    if (emptyMsg) {
      emptyMsg.remove();
    }
  }
}

function addComment() {
  const commentInput = document.getElementById("new-comment");
  const commentList = document.getElementById("comment-list");
  if (commentInput.value.trim() !== "") {
    const newEntry = document.createElement("li");
    newEntry.className = "comment-item";
    newEntry.innerText = commentInput.value;
    commentList.appendChild(newEntry);
    commentInput.value = "";
    addPoint();
    updateEmptyState();
  } else {
    alert("Please write something before posting.");
  }
}

function addPoint() {
  currentStars += 10;
  document.getElementById("star-count").innerText = currentStars;
}

window.onload = function () {
  const savedData = localStorage.getItem("selectedItem") || localStorage.getItem("selectedSubject");
  const displayElement = document.getElementById("display-here");
  displayElement.innerText = savedData ? "Subject: " + savedData : "No Subject Selected";

  const savedQuestion = localStorage.getItem("currentQuestion");
  const questionElement = document.getElementById("display-question");
  questionElement.innerText = savedQuestion ? savedQuestion : "No question was found.";

  updateEmptyState();
};
