import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://rgoydwojepkjbqzdldft.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnb3lkd29qZXBramJxemRsZGZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3MTMyMTYsImV4cCI6MjA1NTI4OTIxNn0.gjk1wM4DUaxAQV9H3zK3hzktav-Pjo40fEIDHR7DTWQ'
const supabase = createClient(supabaseUrl, supabaseKey)


document.addEventListener("DOMContentLoaded", function () {
    const options = ["A1", "A2", "A3", "A4"];
    const storageKey = "selectedAOption";

    let selectedOptionIndex = localStorage.getItem(storageKey);

    if (!selectedOptionIndex) {
        selectedOptionIndex = Math.floor(Math.random() * options.length);
        localStorage.setItem(storageKey, selectedOptionIndex);
    }

    const selectedOption = options[selectedOptionIndex];

    document.getElementById(selectedOption).classList.remove("hidden");
    document.getElementById(selectedOption).classList.add("visible");

    // Add event listener to the "Show All/Hide All" link
    const toggleLink = document.getElementById("toggle-visibility");
    let isShowingAll = false; // Tracks whether all articles are visible

    toggleLink.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent default anchor behavior

        if (isShowingAll) {
            // Hide all articles except the selected one
            options.forEach(optionId => {
                if (optionId !== selectedOption) {
                    const element = document.getElementById(optionId);
                    element.classList.remove("visible");
                    element.classList.add("hidden");
                }
            });
            toggleLink.innerHTML = "<h3>Show All</h3>";
        } else {
            // Show all articles
            options.forEach(optionId => {
                const element = document.getElementById(optionId);
                element.classList.remove("hidden");
                element.classList.add("visible");
            });
            toggleLink.innerHTML = "<h3>Hide</h3>";
        }

        isShowingAll = !isShowingAll; // Toggle state
    });

    // Add event listener to the submit button
    document.getElementById('submitButton').addEventListener('click', async function() {
        const sliderValue = document.getElementById('rangeSlider').value;

        // Use the selected article from localStorage
        const selectedArticle = options[localStorage.getItem(storageKey)];

        const { data, error } = await supabase
            .from('slider_values')
            .insert([{ value: sliderValue, article: selectedArticle }]);

        if (error) {
            console.error('Error inserting value:', error);
        } else {
            console.log('Value inserted successfully:', data);
        }
    });
});

    const scrollWatcher = document.querySelector('.scrollwatcher');

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      scrollWatcher.style.transform = `scaleX(${progress})`;
    });


    function myFunction() {
var x = document.getElementById("myLinks");
if (x.style.display === "block") {
    x.style.display = "none";
} else {
    x.style.display = "block";
}
}

document.querySelectorAll('.scroll div').forEach(div => {
const contentWidth = Array.from(div.children).reduce((total, child) => total + child.offsetWidth + 20, 0); 
div.style.width = `${contentWidth}px`;
});

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