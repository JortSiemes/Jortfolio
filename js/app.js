
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

  function toggleText(spanElement, text) {
    const targetId = spanElement.getAttribute('data-target');
    const target = document.getElementById(targetId);
  
    // Clear text if it is already displayed
    if (target.textContent.length > 0) {
      target.textContent = '';
      return;
    }
  
    let index = 0;
  
    function type() {
      if (index < text.length) {
        target.textContent += text[index];
        index++;
        setTimeout(type, 10); // Adjust the speed by changing the timeout value
      }
    }
  
    type();
  }
  
  window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
        t._e.push(f);
    };

    return t;
}(document, "script", "twitter-wjs"));

