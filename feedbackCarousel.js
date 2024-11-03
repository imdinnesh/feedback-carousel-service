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

    // Helper function to create carousel items
    function createCarouselItem(feedback) {
        const item = document.createElement("div");
        item.className = "carousel-item";
        item.innerHTML = `
            <blockquote>${feedback.message}</blockquote>
            <p>- ${feedback.name} (${new Date(feedback.date).toDateString()})</p>
        `;
        return item;
    }

    // Initialize the carousel
    async function initializeCarousel() {
        const feedbacks = await fetchFeedbacks();
        const carouselContainer = document.querySelector("#feedback-carousel .carousel-inner");
        if (!carouselContainer) {
            console.error("Carousel container not found!");
            return;
        }

        let currentIndex = 0;

        // Populate the carousel with feedback items
        feedbacks.forEach(feedback => {
            const item = createCarouselItem(feedback);
            carouselContainer.appendChild(item);
        });

        const items = carouselContainer.querySelectorAll(".carousel-item");
        if (items.length > 0) items[currentIndex].classList.add("active");

        // Carousel controls
        const prevButton = document.querySelector("#feedback-carousel .prev");
        const nextButton = document.querySelector("#feedback-carousel .next");

        prevButton?.addEventListener("click", () => {
            items[currentIndex].classList.remove("active");
            currentIndex = (currentIndex === 0) ? items.length - 1 : currentIndex - 1;
            items[currentIndex].classList.add("active");
        });

        nextButton?.addEventListener("click", () => {
            items[currentIndex].classList.remove("active");
            currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
            items[currentIndex].classList.add("active");
        });
    }

    // Wait for the DOM to load before initializing
    document.addEventListener("DOMContentLoaded", initializeCarousel);
})();
