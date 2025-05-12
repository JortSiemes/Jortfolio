document.addEventListener("DOMContentLoaded", function () {
  // --- A ARTICLES ---
  const aOptions = ["A1", "A2", "A3", "A4"];
  const storageKeyA = "selectedAOption";
  let selectedAIndex = localStorage.getItem(storageKeyA);
  // Random selection/retrieval logic
  if (selectedAIndex === null) {
    selectedAIndex = Math.floor(Math.random() * aOptions.length);
    localStorage.setItem(storageKeyA, selectedAIndex);
  } else {
    selectedAIndex = parseInt(selectedAIndex, 10);
  }
  const selectedA = aOptions[selectedAIndex]; // ID of the A article to show

  // Hide all A articles first
  aOptions.forEach(optionId => {
       const element = document.getElementById(optionId);
       if (element) {
          element.classList.remove("visible");
          element.classList.add("hidden");
       } else {
          console.warn(`Element with ID ${optionId} not found during initial hide.`);
       }
  });
  // Then show the selected one
  const selectedAElement = document.getElementById(selectedA);
  if (selectedAElement) {
       selectedAElement.classList.remove("hidden");
       selectedAElement.classList.add("visible");
       console.log(`Showing A article: ${selectedA}`);
  } else {
       console.error("Selected A element not found:", selectedA);
  }

  // Check Generic A Article Read Status using "article_A_read"
  const genericARead = localStorage.getItem("article_A_read");
  const genericAScore = localStorage.getItem("article_A_score");
  if (genericARead === "true" && selectedAElement) { // Apply to visible A element
       selectedAElement.classList.add("read-article");
       if (!selectedAElement.querySelector('.score-circle')) {
           const scoreCircle = document.createElement("div");
           scoreCircle.classList.add("score-circle");
           scoreCircle.textContent = genericAScore || '?';
           selectedAElement.appendChild(scoreCircle);
           console.log(`Applied generic read status to visible A article: ${selectedA}`);
       }
  }

  // --- B ARTICLES ---
  const bOptions = ["B1", "B2"];
  const storageKeyB = "selectedBOption";
  let selectedBIndex = localStorage.getItem(storageKeyB);
  // Random selection/retrieval logic for B
  if (selectedBIndex === null) {
    selectedBIndex = Math.floor(Math.random() * bOptions.length);
    localStorage.setItem(storageKeyB, selectedBIndex);
  } else {
    selectedBIndex = parseInt(selectedBIndex, 10);
  }
  const selectedB = bOptions[selectedBIndex]; // ID of the B article to show

  // Hide both B articles first
  bOptions.forEach(bId => {
      const element = document.getElementById(bId);
      if (element) {
          element.classList.remove("visible");
          element.classList.add("hidden");
      } else {
           console.warn(`Element with ID ${bId} not found during initial hide.`);
      }
  });
  // Then show the selected B article
  const selectedBElement = document.getElementById(selectedB);
   if (selectedBElement) {
      selectedBElement.classList.remove("hidden");
      selectedBElement.classList.add("visible");
      console.log(`Showing B article: ${selectedB}`);
  } else {
       console.error("Selected B element not found:", selectedB);
  }

  // Check Generic B Article Read Status using "article_B_read"
  const genericBRead = localStorage.getItem("article_B_read");
  const genericBScore = localStorage.getItem("article_B_score");
  if (genericBRead === "true" && selectedBElement) { // Apply to visible B element
      selectedBElement.classList.add("read-article");
      if (!selectedBElement.querySelector('.score-circle')) {
          const scoreCircle = document.createElement("div");
          scoreCircle.classList.add("score-circle");
          scoreCircle.textContent = genericBScore || '?';
          selectedBElement.appendChild(scoreCircle);
          console.log(`Applied generic read status to visible B article: ${selectedB}`);
      }
  }

  // --- REMOVED specific article checks ---
  // The loops that previously checked for article_A1_read, article_B1_read etc.
  // are no longer needed with the generic approach and have been removed.

  // --- Toggle visibility logic for A articles ---
  const toggleLink = document.getElementById("toggle-visibility");
  let isShowingAll = false; // Initial state

  if (toggleLink) { // Check if the toggle link exists
      // Set initial text
      toggleLink.innerHTML = "<h3>Show All</h3>";

      toggleLink.addEventListener("click", function (e) {
          e.preventDefault(); // Prevent default link behavior

          // Find all A article elements again inside the handler
          const allAElements = aOptions.map(id => document.getElementById(id)).filter(el => el !== null);

          if (isShowingAll) {
              // Hide all A articles EXCEPT the selected one
              allAElements.forEach(element => {
                  if (element.id !== selectedA) {
                      element.classList.remove("visible");
                      element.classList.add("hidden");
                  }
              });
              toggleLink.innerHTML = "<h3>Show All</h3>"; // Set text to "Show All"
          } else {
              // Show all A articles
              allAElements.forEach(element => {
                  element.classList.remove("hidden");
                  element.classList.add("visible");
              });
              toggleLink.innerHTML = "<h3>Hide</h3>"; // Set text to "Hide"
          }

          isShowingAll = !isShowingAll; // Toggle the state
      });
  } else {
      console.warn("Element with ID 'toggle-visibility' not found.");
  }


  // === Show Thank You Popup using BOTH generic keys ===
  const checkArticleARead = localStorage.getItem('article_A_read');
  const checkArticleBRead = localStorage.getItem('article_B_read');

  if (checkArticleARead === "true" && checkArticleBRead === "true") {
    // Check if the popup hasn't been shown yet in this session/storage lifetime
    if (!localStorage.getItem("thank_you_shown")) {
      alert("Bedankt voor je deelname aan mijn onderzoek! De antwoorden zijn opgeslagen. -Jort, voor surveycircle: Redeem Survey Code with one click: https://www.surveycircle.com/FZYW-GF9J-X66U-PTZ6/");
      // Mark the popup as shown to prevent it from appearing again on refresh
      localStorage.setItem("thank_you_shown", "true");
    }
  }
}); // End of main DOMContentLoaded listener

// --- Other Page Functionality (Outside main DOMContentLoaded) ---

// Scroll progress bar logic
const scrollWatcher = document.querySelector('.scrollwatcher');
if (scrollWatcher) { // Check if element exists
  window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      // Ensure calculation doesn't result in division by zero or negative heights
      const docHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - window.innerHeight;
      if (docHeight > 0) {
          const progress = Math.min(scrollTop / docHeight, 1);
          scrollWatcher.style.transform = `scaleX(${progress})`;
      } else {
          scrollWatcher.style.transform = `scaleX(0)`; // Handle non-scrollable pages
      }
  });
} else {
  console.warn("Element with class 'scrollwatcher' not found.");
}


// Mobile menu toggle function
function myFunction() {
var x = document.getElementById("myLinks");
if (x) { // Check if element exists
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
} else {
    console.warn("Element with ID 'myLinks' not found for menu toggle.");
}
}

// Auto-adjust scroll div widths (Run once on load likely sufficient unless content changes dynamically)
document.addEventListener("DOMContentLoaded", function() { // Can be in its own listener or moved inside the main one
  document.querySelectorAll('.scroll div').forEach(div => {
      // Ensure children exist and are HTMLElement before getting offsetWidth
      const contentWidth = Array.from(div.children)
                                .filter(child => child instanceof HTMLElement)
                                .reduce((total, child) => total + child.offsetWidth + 20, 0); // Added filter
      div.style.width = `${contentWidth}px`;
  });
});


// Back-to-top button logic (Needs DOMContentLoaded)
document.addEventListener("DOMContentLoaded", function () {
const backToTopButton = document.getElementById("back-to-top");

if (backToTopButton) { // Check if button exists
    const toggleVisibility = () => {
      // Check if the page is actually scrollable vertically
      const isScrollable = document.documentElement.scrollHeight > window.innerHeight;
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

    // Listeners to check visibility
    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("resize", toggleVisibility); // Re-check on resize

    // Initial check in case the page loads already scrolled down
    toggleVisibility();
} else {
    console.warn("Element with ID 'back-to-top' not found.");
}
});

// Burger menu logic (Needs DOMContentLoaded)
document.addEventListener("DOMContentLoaded", function () {
// Assuming the burger button itself calls myFunction,
// but if you have a dedicated element with class 'burger':
const burger = document.querySelector('.burger'); // Or '.burger-menu' from header?
if (burger) {
  // Make sure myFunction is globally accessible or defined before this
  burger.addEventListener('click', myFunction);
}
// If the button in the header already has onclick="myFunction()", this listener might be redundant
});


// Reset Experiment Link Logic
const resetLink = document.getElementById("reset-experiment");
if (resetLink) { // Check if element exists before adding listener
resetLink.addEventListener("click", function (e) {
  e.preventDefault(); // Prevent default link action

  // Confirmation dialog
  const confirmReset = confirm("Weet je zeker dat je de test opnieuw wilt starten? Alle voortgang gaat verloren.");
  if (confirmReset) {
      // Remove all related localStorage keys
      Object.keys(localStorage).forEach(key => {
        if (
          key.startsWith("article_") || // Catches article_A_read, article_B_read, article_A_score, etc.
          key === "selectedAOption" ||
          key === "selectedBOption" ||
          key === "thank_you_shown" ||
          key === "masterResearchPopupShown" || // Also reset popup shown status? Optional.
          key === "userId" // Also reset user ID? Optional. Decide if needed.
        ) {
          console.log("Removing localStorage key:", key);
          localStorage.removeItem(key);
        }
      });

      // Optional: show confirmation before reload
      alert("De test is opnieuw gestart.");
      location.reload(); // Refresh page to apply reset state
  }
});
} else {
  console.warn("Element with ID 'reset-experiment' not found.");
}


// Welcome Popup Logic
const popupOverlay = document.getElementById('welcome-overlay');
const popupBox = document.getElementById('welcome-popup');
const closeBtn = document.getElementById('close-popup-btn');
const okBtn = document.getElementById('ok-popup-btn');
const popupShownKey = 'masterResearchPopupShown';

// Function to hide the popup and set the flag
const hidePopup = () => {
  if (popupOverlay) {
      popupOverlay.classList.add('is-hidden');
  }
  localStorage.setItem(popupShownKey, 'true'); // Mark as shown
  console.log("Welcome popup hidden and flagged as shown.");
};

// Check if elements exist before proceeding
if (popupOverlay && popupBox && closeBtn && okBtn) {

  // Check if the popup has been shown before in this browser
  if (localStorage.getItem(popupShownKey) !== 'true') {
      // If not shown, display the popup
      console.log("First visit detected or popup reset. Showing welcome popup.");
      popupOverlay.classList.remove('is-hidden'); // Make overlay visible

      // Add event listeners to close buttons
      closeBtn.addEventListener('click', hidePopup);
      okBtn.addEventListener('click', hidePopup);

      // Optional: Close if clicking outside the box (on the overlay)
      popupOverlay.addEventListener('click', (event) => {
           // Only close if the direct click target is the overlay itself
           if (event.target === popupOverlay) {
               hidePopup();
           }
      });

  } else {
      console.log("Popup already shown previously.");
      // Ensure it's hidden if already shown (belt and braces)
      if (popupOverlay) { // Check again just in case
           popupOverlay.classList.add('is-hidden');
      }
  }
} else {
  console.warn("One or more welcome popup elements not found. Popup functionality disabled.");
}
