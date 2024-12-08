
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach ((el) => observer.observe(el));



document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.querySelector(".timeline");
    const sections = document.querySelectorAll("section");

    // Populate the timeline
    sections.forEach((section) => {
        const date = section.getAttribute("data-date");
        const li = document.createElement("li");
        li.textContent = date;
        timeline.appendChild(li);
    });

    const timelineItems = document.querySelectorAll(".timeline li");

    // Observer to track visible sections
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const index = Array.from(sections).indexOf(entry.target);
                if (entry.isIntersecting) {
                    timelineItems.forEach((item) => item.classList.remove("active"));
                    timelineItems[index].classList.add("active");
                }
            });
        },
        { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
});


document.getElementById("bounceSVG").addEventListener("click", function() {
    // Scroll to 200vh and 200vw with smooth behavior
    window.scrollTo({
      top: window.innerHeight * 1,  // 200vh
      left: window.innerWidth * 1,  // 200vw
      behavior: 'smooth'  // Enables smooth scrolling
    });
  });