// GNews API Key
const apikey = "2f8dbf4d5d4ef65d07c819e98d9cf370";

// DOM Elements
const blogcontainer = document.getElementById("blog-container");
const searchField = document.getElementById("search_input");
const searchButton = document.getElementById("search_button");

/* ---------------- FETCH TOP HEADLINES ---------------- */

async function fetchingRandomNews() {
    try {
        const api_url = `https://gnews.io/api/v4/top-headlines?token=${apikey}&country=in&lang=en&sortby=publishedAt`;
        const responses = await fetch(api_url);

        if (!responses.ok) {
            throw new Error(`HTTP error! Status: ${responses.status}`);
        }

        const data = await responses.json();
        return data.articles || [];
    } catch (error) {
        console.error("Error occurred while fetching random news:", error);
        return [];
    }
}

/* ---------------- SEARCH NEWS ---------------- */

async function fetchNewsQuery(query) {
    try {
        const api_url = `https://gnews.io/api/v4/search?q=${query}&token=${apikey}&country=in&lang=en`;
        const responses = await fetch(api_url);

        if (!responses.ok) {
            throw new Error(`HTTP error! Status: ${responses.status}`);
        }

        const data = await responses.json();
        return data.articles || [];
    } catch (error) {
        console.error("Error in fetching the query:", error);
        return [];
    }
}

searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query !== "") {
        const articles = await fetchNewsQuery(query);
        displayBlog(articles);
    }
});

/* ---------------- DISPLAY NEWS ---------------- */

function displayBlog(articles) {
    blogcontainer.innerHTML = "";

    if (!articles || articles.length === 0) {
        blogcontainer.innerHTML = "<p>No news available</p>";
        return;
    }

    articles.forEach((article) => {
        const blogcard = document.createElement("div");
        blogcard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.image || "fallback-image.jpg";
        img.alt = article.title || "News Image";

        const title = document.createElement("h2");
        title.textContent =
            article.title && article.title.length > 30
                ? article.title.slice(0, 30) + "..."
                : article.title;

        const description = document.createElement("p");
        description.textContent =
            article.description && article.description.length > 150
                ? article.description.slice(0, 150) + "..."
                : article.description;

        blogcard.appendChild(title);
        blogcard.appendChild(img);
        blogcard.appendChild(description);

        blogcard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });

        blogcontainer.appendChild(blogcard);
    });
}

/* ---------------- INITIAL LOAD ---------------- */

(async () => {
    const articles = await fetchingRandomNews();
    displayBlog(articles);
})();
