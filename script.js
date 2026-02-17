// FAQ Toggle
let questions = document.querySelectorAll(".faq-question");

questions.forEach((q)=>{
    q.addEventListener("click", ()=>{

        // sab answers band
        document.querySelectorAll(".faq-answer").forEach((ans)=>{
            ans.style.display = "none";
        });

        // sirf current open
        let answer = q.nextElementSibling;
        answer.style.display = "block";

    });
});



document.addEventListener("DOMContentLoaded", function () {

    const emailInput = document.getElementById("emailInput");
    const emailError = document.getElementById("emailError");
    const getStartedBtn = document.getElementById("getStartedBtn");
    const signInBtn = document.getElementById("signInBtn");

    // Safety check
    if (!emailInput || !emailError || !getStartedBtn || !signInBtn) {
        console.error("One or more elements not found. Check your IDs.");
        return;
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    getStartedBtn.addEventListener("click", function () {
        const email = emailInput.value.trim();

        if (validateEmail(email)) {
            emailError.innerText = "";
            alert("Valid Email: " + email);
        } else {
            emailError.innerText = "Please enter a valid email address";
        }
    });

    signInBtn.addEventListener("click", function () {
        alert("Sign In Button Clicked!");
    });

});




