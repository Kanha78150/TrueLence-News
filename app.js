const blogContainer = document.getElementById("blog-container");

// Function to fetch news
async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsdata.io/api/1/latest?apikey=pub_50957a632ccc4bf07bd22cf24bd5c1efec223&category=politics&country=bd`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results; // Use `results` based on the API structure.
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

// Function to display the blogs
function displayBlogs(articles) {
    blogContainer.innerHTML = ""; // Clear previous content
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.image_url || "https://placehold.co/600x400"; // Use `image_url` for this API
        img.alt = article.title;

        const title = document.createElement("h2");
        title.textContent = article.title;

        const description = document.createElement("p");
        description.textContent = article.description || "No description available.";

        const link = document.createElement("a");
        link.href = article.link;
        link.textContent = "Read more";
        link.target = "_blank";

        // Append elements to blog card
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.appendChild(link);
        blogContainer.appendChild(blogCard);
    });
}

// Fetch and display the news when the page loads
(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error displaying news", error);
    }
})();
