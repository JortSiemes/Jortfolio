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
  
    // Toggle visibility logic for A articles
    const toggleLink = document.getElementById("toggle-visibility");
    let isShowingAll = false; // Tracks whether all articles are visible
  
    toggleLink.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default anchor behavior
  
      if (isShowingAll) {
        // Hide all articles except the selected one
        aOptions.forEach(optionId => {
          if (optionId !== selectedA) {
            const element = document.getElementById(optionId);
            element.classList.remove("visible");
            element.classList.add("hidden");
          }
        });
        toggleLink.innerHTML = "<h3>Show All</h3>";
      } else {
        // Show all articles
        aOptions.forEach(optionId => {
          const element = document.getElementById(optionId);
          element.classList.remove("hidden");
          element.classList.add("visible");
        });
        toggleLink.innerHTML = "<h3>Hide</h3>";
      }
  
      isShowingAll = !isShowingAll; // Toggle state
    });
  
    // Now, handle the appearance of articles based on whether they've been read
    const articleElements = document.querySelectorAll(".article");  // Select all article elements
  
    articleElements.forEach((article) => {
      const articleId = article.id;  // Assume each article has an id like "A1", "A2", etc.
  
      // Check if the article has been read from localStorage
      const articleRead = localStorage.getItem(`article_${articleId}_read`);
      const articleScore = localStorage.getItem(`article_${articleId}_score`);
  
      if (articleRead === "true") {
        // Apply an overlay for "read" articles
        article.classList.add("read-article");
  
        // Add the green circle with the score for both A and B articles
        const scoreCircle = document.createElement("div");
        scoreCircle.classList.add("score-circle");
        scoreCircle.textContent = articleScore;
        article.appendChild(scoreCircle);
      }
    });
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

    // Initial check
    toggleVisibility();
});

function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

// Add this code to connect the burger menu
document.addEventListener("DOMContentLoaded", function() {
    const burger = document.querySelector('.burger'); // Make sure your burger element has this class
    if (burger) {
        burger.addEventListener('click', myFunction);
    }
});
