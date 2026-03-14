// Scroll Reveal Logic
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    },
    { threshold: 0.1 },
);

revealElements.forEach((el) => revealObserver.observe(el));

// Scroll Progress Bar
window.onscroll = function () {
    let winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
    let height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
};

// Form
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(form);
    status.textContent = "Sending...";

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                Accept: "application/json",
            },
        });

        if (response.ok) {
            form.innerHTML = `
          <div class="py-20 text-center">
            <i class="ri-checkbox-circle-fill text-6xl text-neo-green mb-4 block"></i>
            <h3 class="text-2xl font-black uppercase">Email Received</h3>
            <p class="font-mono text-sm mt-2">I will reach out shortly.</p>
          </div>
        `;
        } else {
            status.textContent = "Something went wrong. Please try again.";
        }
    } catch (error) {
        status.textContent = "Network error. Please try again.";
    }
}

form.addEventListener("submit", handleSubmit);
