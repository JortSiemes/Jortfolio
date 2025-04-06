document.addEventListener("DOMContentLoaded", function () {
  // For A articles
  const aOptions = ["A1", "A2", "A3", "A4"];
  const storageKeyA = "selectedAOption";

  let selectedAIndex = localStorage.getItem(storageKeyA);
  if (selectedAIndex === null) {
    selectedAIndex = Math.floor(Math.random() * aOptions.length);
    localStorage.setItem(storageKeyA, selectedAIndex);
  } else {
    selectedAIndex = parseInt(selectedAIndex, 10);
  }

  const selectedA = aOptions[selectedAIndex];
  document.getElementById(selectedA).classList.remove("hidden");
  document.getElementById(selectedA).classList.add("visible");

  // For B articles using unique IDs "B1" and "B2"
  const bOptions = ["B1", "B2"];
  const storageKeyB = "selectedBOption";

  let selectedBIndex = localStorage.getItem(storageKeyB);
  if (selectedBIndex === null) {
    selectedBIndex = Math.floor(Math.random() * bOptions.length);
    localStorage.setItem(storageKeyB, selectedBIndex);
  } else {
    selectedBIndex = parseInt(selectedBIndex, 10);
  }

  const selectedB = bOptions[selectedBIndex];

  // Hide both B articles first
  bOptions.forEach(bId => {
    document.getElementById(bId).classList.remove("visible");
    document.getElementById(bId).classList.add("hidden");
  });

  // Then show the selected B article
  document.getElementById(selectedB).classList.remove("hidden");
  document.getElementById(selectedB).classList.add("visible");

  // Check if the B article has been read and display score
  const articleBRead = localStorage.getItem("article_B_read");
  const articleBScore = localStorage.getItem("article_B_score");

  if (articleBRead === "true") {
    const articleB = document.getElementById(selectedB);
    if (articleB) {
      articleB.classList.add("read-article");

      const scoreCircle = document.createElement("div");
      scoreCircle.classList.add("score-circle");
      scoreCircle.textContent = articleBScore;
      articleB.appendChild(scoreCircle);
    }
  }

  // Toggle visibility logic for A articles
  const toggleLink = document.getElementById("toggle-visibility");
  let isShowingAll = false;

  toggleLink.addEventListener("click", function (e) {
    e.preventDefault();

    if (isShowingAll) {
      aOptions.forEach(optionId => {
        if (optionId !== selectedA) {
          const element = document.getElementById(optionId);
          element.classList.remove("visible");
          element.classList.add("hidden");
        }
      });
      toggleLink.innerHTML = "<h3>Show All</h3>";
    } else {
      aOptions.forEach(optionId => {
        const element = document.getElementById(optionId);
        element.classList.remove("hidden");
        element.classList.add("visible");
      });
      toggleLink.innerHTML = "<h3>Hide</h3>";
    }

    isShowingAll = !isShowingAll;
  });

  const articleElements = document.querySelectorAll(".article");

  articleElements.forEach((article) => {
    const articleId = article.id;
    const articleType = article.classList.contains("Barticle") ? 'B' : 'A';

    const articleRead = localStorage.getItem(`article_${articleId}_read`);
    const articleScore = localStorage.getItem(`article_${articleId}_score`);

    if (articleRead === "true") {
      article.classList.add("read-article");

      const scoreCircle = document.createElement("div");
      scoreCircle.classList.add("score-circle");
      scoreCircle.textContent = articleScore;
      article.appendChild(scoreCircle);
    }
  });

  // === Show Thank You Popup if both A and B articles are read ===
  const articleARead = localStorage.getItem(`article_${selectedA}_read`);
  if (articleARead === "true" && articleBRead === "true") {
    if (!localStorage.getItem("thank_you_shown")) {
      alert("Bedankt voor je deelname! Je antwoorden zijn verzonden.");
      localStorage.setItem("thank_you_shown", "true");
    }
  }
});

// Scroll progress bar logic
const scrollWatcher = document.querySelector('.scrollwatcher');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = Math.min(scrollTop / docHeight, 1);
  scrollWatcher.style.transform = `scaleX(${progress})`;
});

// Mobile menu toggle function
function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

// Auto-adjust scroll div widths
document.querySelectorAll('.scroll div').forEach(div => {
  const contentWidth = Array.from(div.children).reduce((total, child) => total + child.offsetWidth + 20, 0);
  div.style.width = `${contentWidth}px`;
});

// Back-to-top button logic
document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.getElementById("back-to-top");

  const toggleVisibility = () => {
    const isScrollable = document.body.scrollHeight > window.innerHeight;
    const isScrolled = window.scrollY > 0;

    if (isScrollable && isScrolled) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  };

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", toggleVisibility);
  window.addEventListener("resize", toggleVisibility);

  toggleVisibility();
});

// Burger menu logic
document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click', myFunction);
  }
});

const resetLink = document.getElementById("reset-experiment");
if (resetLink) {
  resetLink.addEventListener("click", function (e) {
    e.preventDefault();

    // Remove all related localStorage keys
    Object.keys(localStorage).forEach(key => {
      if (
        key.startsWith("article_") ||
        key === "selectedAOption" ||
        key === "selectedBOption" ||
        key === "thank_you_shown"
      ) {
        localStorage.removeItem(key);
      }
    });

    // Optional: show confirmation before reload
    alert("De test is opnieuw gestart.");
    location.reload(); // Refresh to apply reset state
  });
}
