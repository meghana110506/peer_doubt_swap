let currentStars = 0;

function addPoint() {
  currentStars += 10;
  document.getElementById("star-count").innerText = currentStars;
}

window.onload = function () {
  const cx = localStorage.getItem("selectedItem") || localStorage.getItem("selectedSubject");
  const displayElement = document.getElementById("display-selection");
  displayElement.innerText = cx ? "Subject: " + cx : "No Subject Selected";

  const listContainer = document.getElementById("solver-list");
  const filterSelect = document.getElementById("difficulty-filter");

  function normalizeDoubt(item) {
    if (typeof item === "string") {
      return { question: item, difficulty: "unknown" };
    }
    if (item && typeof item === "object") {
      return {
        question: item.question || item.text || "",
        difficulty: (item.difficulty || "unknown").toString().toLowerCase(),
      };
    }
    return { question: "", difficulty: "unknown" };
  }

  function renderDoubts() {
    const selected = (filterSelect.value || "all").toLowerCase();
    const doubtsRaw = JSON.parse(localStorage.getItem("allDoubts")) || [];
    const doubts = doubtsRaw.map(normalizeDoubt).filter((d) => d.question && d.question.trim().length > 0);

    listContainer.innerHTML = "";

    const filtered = selected === "all" ? doubts : doubts.filter((d) => d.difficulty === selected);

    if (filtered.length === 0) {
      const emptyState = document.createElement("div");
      emptyState.className = "empty-state";
      emptyState.innerText =
        selected === "all"
          ? "No doubts available yet. Check back later!"
          : "No doubts found for this difficulty.";
      listContainer.appendChild(emptyState);
      return;
    }

    filtered.forEach((d) => {
      const box = document.createElement("div");
      box.className = "doubt-box";
      box.innerText = d.question;
      box.onclick = function () {
        localStorage.setItem("currentQuestion", d.question);
        window.location.href = "doubtSolver2.html";
      };
      listContainer.appendChild(box);
    });
  }

  filterSelect.addEventListener("change", renderDoubts);
  renderDoubts();
};
