document.addEventListener("DOMContentLoaded", function () {

    // ================= FAQ =================
    let questions = document.querySelectorAll(".faq-question");

    questions.forEach((q) => {
        q.addEventListener("click", () => {
            let item = q.parentElement;

            document.querySelectorAll(".faq-item").forEach(i => {
                if (i !== item) i.classList.remove("active");
            });

            item.classList.toggle("active");
        });
    });

    // ================= EMAIL =================
    const emailInput = document.getElementById("emailInput");
    const emailError = document.getElementById("emailError");
    const getStartedBtn = document.getElementById("getStartedBtn");

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    getStartedBtn.addEventListener("click", () => {

        const email = emailInput.value.trim();
        const loggedUser = localStorage.getItem("loggedInUser");

        if (!loggedUser) {
            emailError.innerText = "⚠️ Please Login First!";
            return;
        }

        if (!validateEmail(email)) {
            emailError.innerText = "Invalid Email ❌";
            return;
        }

        getStartedBtn.innerText = "Loading...";

        setTimeout(() => {
            emailError.innerText =
                "🎬 Netflix Show Started for " + loggedUser + " 🍿 Enjoy!";
            getStartedBtn.innerText = "Get Started >";
        }, 1000);

    });

    emailInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") getStartedBtn.click();
    });

    // ================= AUTH =================
    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const authPopup = document.getElementById("authPopup");

    const authTitle = document.getElementById("authTitle");
    const authBtn = document.getElementById("authBtn");
    const authEmail = document.getElementById("authEmail");
    const authPassword = document.getElementById("authPassword");
    const authName = document.getElementById("authName");
    const authMessage = document.getElementById("authMessage");
    const toggleAuth = document.getElementById("toggleAuth");

    let isLogin = true; // ✅ FIXED POSITION

    // ================= CHECK LOGIN ON LOAD =================
    const loggedUser = localStorage.getItem("loggedInUser");

    if (loggedUser) {
        logoutBtn.style.display = "inline-block";
        loginBtn.style.display = "none";
        signupBtn.style.display = "none";
    }

    // ================= TOGGLE LOGIN / SIGNUP =================
    toggleAuth.addEventListener("click", () => {

        isLogin = !isLogin;

        if (isLogin) {
            authTitle.innerText = "Login";
            authBtn.innerText = "Login";
            authName.style.display = "none";
            toggleAuth.innerText = "Don't have an account? Sign Up";
        } else {
            authTitle.innerText = "Sign Up";
            authBtn.innerText = "Sign Up";
            authName.style.display = "block";
            toggleAuth.innerText = "Already have an account? Login";
        }

        authMessage.innerText = "";
    });

    // ================= NAV BUTTONS =================
    loginBtn.addEventListener("click", () => {
        isLogin = true;

        authPopup.style.display = "flex";
        authTitle.innerText = "Login";
        authBtn.innerText = "Login";
        authName.style.display = "none";
        authMessage.innerText = "";
    });

    signupBtn.addEventListener("click", () => {
        isLogin = false;

        authPopup.style.display = "flex";
        authTitle.innerText = "Sign Up";
        authBtn.innerText = "Sign Up";
        authName.style.display = "block";
        authMessage.innerText = "";
    });

    // CLOSE POPUP
    authPopup.addEventListener("click", (e) => {
        if (e.target === authPopup) {
            authPopup.style.display = "none";
        }
    });

    // ================= LOGIN / SIGNUP =================
    authBtn.addEventListener("click", () => {

        const name = authName.value.trim();
        const email = authEmail.value.trim();
        const password = authPassword.value.trim();

        if (!email || !password || (!isLogin && !name)) {
            authMessage.innerText = "Fill all fields ❌";
            return;
        }

        if (isLogin) {
            let savedUser = JSON.parse(localStorage.getItem("user"));

            if (savedUser && savedUser.email === email && savedUser.password === password) {

                authMessage.innerText = "Welcome back " + savedUser.name + " 🎉";
                localStorage.setItem("loggedInUser", savedUser.name);

                // 👉 show logout
                logoutBtn.style.display = "inline-block";
                loginBtn.style.display = "none";
                signupBtn.style.display = "none";

                setTimeout(() => {
                    authPopup.style.display = "none";
                }, 1000);

            } else {
                authMessage.innerText = "Invalid credentials ❌";
            }

        } else {
            let user = { name, email, password };
            localStorage.setItem("user", JSON.stringify(user));

            authMessage.innerText = "Signup Successful 🎉";
        }
    });

    // ================= LOGOUT =================
    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("loggedInUser");

        alert("Logged out successfully 👋");

        logoutBtn.style.display = "none";
        loginBtn.style.display = "inline-block";
        signupBtn.style.display = "inline-block";
    });

});