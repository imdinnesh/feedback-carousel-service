(function () {
    // Function to fetch the data-id attribute from the script tag
    function getScriptAttribute(attributeName) {
        const scripts = document.getElementsByTagName("script");
        for (let script of scripts) {
            if (script.src.includes("feedbackCarousel.js")) {
                return script.getAttribute(attributeName);
            }
        }
        return null;
    }

    // Fetch the id or category from the script tag
    const feedbackId = getScriptAttribute("data-feedback-id");

    // Replace with your API URL and use the feedbackId as a query parameter
    const apiURL = `https://api.yourdomain.com/feedbacks?id=${feedbackId}`;

    // Static feedback data array
    const staticFeedbacks = [
        {
            message: "Great service! Really enjoyed working with this team.",
            name: "John Doe",
            date: "2024-03-15"
        },
        {
            message: "Excellent product quality and customer support.",
            name: "Jane Smith",
            date: "2024-03-10"
        },
        {
            message: "Highly recommended! Will definitely use again.",
            name: "Mike Johnson",
            date: "2024-03-05"
        }
    ];

    // Replace the fetchFeedbacks function with a simpler version
    async function fetchFeedbacks() {
        return staticFeedbacks;
    }

    // Helper function to create feedback card (replacing createCarouselItem)
    function createFeedbackCard(feedback) {
        const card = document.createElement("div");
        card.className = "feedback-card";
        card.innerHTML = `
            <div class="feedback-content">
                <div class="feedback-message">
                    <i class="fas fa-quote-left quote-icon"></i>
                    <blockquote>${feedback.message}</blockquote>
                </div>
                <div class="feedback-author">
                    <p class="author-name">${feedback.name}</p>
                    <p class="feedback-date">${new Date(feedback.date).toDateString()}</p>
                </div>
            </div>
        `;
        return card;
    }

    // Initialize the feedback display (replacing initializeCarousel)
    async function initializeFeedbacks() {
        const feedbacks = await fetchFeedbacks();
        const container = document.querySelector("#feedback-carousel");
        if (!container) {
            console.error("Feedback container not found!");
            return;
        }

        // Remove carousel-specific classes and add grid container class
        container.className = "feedback-grid";

        // Clear existing content
        container.innerHTML = "";

        // Populate the container with feedback cards
        feedbacks.forEach(feedback => {
            const card = createFeedbackCard(feedback);
            container.appendChild(card);
        });
    }

    // Wait for the DOM to load before initializing
    document.addEventListener("DOMContentLoaded", initializeFeedbacks);
})();
