// NewsAPI Key
const apikey = "d56f37fbbc664ecab5995e18aef98ea2";

// DOM Elements
const blogcontainer = document.getElementById("blog-container");
const searchField = document.getElementById("search_input");
const searchButton = document.getElementById("search_button");

/* -------- Fetch Top Headlines -------- */

async function fetchingRandomNews() {
    try {
        const targetURL =
            `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}`;

        const api_url =
            `https://api.allorigins.win/raw?url=${encodeURIComponent(targetURL)}`;

        const response = await fetch(api_url);
        const data = await response.json();

        return data.articles || [];
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
}

/* -------- Search News -------- */

async function fetchNewsQuery(query) {
    try {
        const targetURL =
            `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=${apikey}`;

        const api_url =
            `https://api.allorigins.win/raw?url=${encodeURIComponent(targetURL)}`;

        const response = await fetch(api_url);
        const data = await response.json();

        return data.articles || [];
    } catch (error) {
        console.error("Search error:", error);
        return [];
    }
}

/* -------- Button Click -------- */

searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query !== "") {
        const articles = await fetchNewsQuery(query);
        displayBlog(articles);
    }
});

/* -------- Display News -------- */

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

        const title = document.createElement("h2");
        title.textContent = article.title || "No title";

        const desc = document.createElement("p");
        desc.textContent = article.description || "No description";

        blogcard.append(title, img, desc);
        blogcard.onclick = () => window.open(article.url, "_blank");

        blogcontainer.appendChild(blogcard);
    });
}

/* -------- Initial Load -------- */

(async () => {
    const articles = await fetchingRandomNews();
    displayBlog(articles);
})();
