// NewsAPI Key
const apikey = "d56f37fbbc664ecab5995e18aef98ea2";

// DOM Elements
const blogcontainer = document.getElementById("blog-container");
const searchField = document.getElementById("search_input");
const searchButton = document.getElementById("search_button");

/* ---------------- FETCH TOP HEADLINES ---------------- */

async function fetchingRandomNews() {
    try {
        const targetURL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}`;
        const api_url = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetURL)}`;

        const response = await fetch(api_url);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        return data.articles || [];
    } catch (error) {
        console.error("Error fetching top headlines:", error);
        return [];
    }
}

/* ---------------- SEARCH NEWS ---------------- */

async function fetchNewsQuery(query) {
    try {
        const targetURL = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=${apikey}`;
        const api_url = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetURL)}`;

        const response = await fetch(api_url);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        return data.articles || [];
    } catch (error) {
        console.error("Error fetching search results:", error);
        return [];
    }
}

/* ---------------- SEARCH BUTTON ---------------- */

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
        blogcontainer.innerHTML = "<p>No news found</p>";
        return;
    }

    articles.forEach(article => {
        const blogcard = document.createElement("div");
        blogcard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage || "fallback-image.jpg";
        img.alt = article.title || "News Image";

        const title = document.createElement("h2");
        title.textContent =
            article.title && article.title.length > 40
                ? article.title.slice(0, 40) + "..."
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
