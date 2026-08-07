const form = document.getElementById("salaryForm");
const button = document.getElementById("predictBtn");
const loading = document.getElementById("loading");
const resultBox = document.getElementById("predictionResult");
const resultText = document.getElementById("salaryResult");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    // Disable button
    button.disabled = true;
    button.innerHTML = "Predicting...";

    // Show loading
    loading.style.display = "block";

    // Hide previous result
    resultBox.style.display = "none";

    const formData = new FormData(form);

    try {

        const response = await fetch("/predict", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Prediction failed");
        }

        const data = await response.json();
        resultText.innerHTML = data.salary;
        resultBox.style.display = "block";
        resultBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    } catch (error) {
        alert("Something went wrong while predicting the salary.");
        console.error(error);

    } finally {
        loading.style.display = "none";
        button.disabled = false;
        button.innerHTML = "Predict Salary";
    }
});

/* ==========================================================
   MOBILE NAVIGATION
========================================================== */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    }
    else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});

/* ==========================================================
   ACTIVE NAVIGATION LINK
========================================================== */

const sections = document.querySelectorAll("section");
const navLinksList = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if(window.scrollY >= sectionTop){
            current = section.getAttribute("id");
        }
    });
    navLinksList.forEach(link => {
        link.classList.remove("active");
        if(link.getAttribute("href") === "#" + current){
            link.classList.add("active");
        }
    });
});


const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});