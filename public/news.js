
async function getNews() {
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual News API key
    const newsContainer = document.getElementById('news-articles');
    if (!newsContainer) return;

    const lang = document.documentElement.lang || 'en';
    const query = lang === 'ko' ? '인공지능' : 'AI';
    const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=${lang}&sortBy=publishedAt&apiKey=${apiKey}`;

    newsContainer.innerHTML = '<p>Loading news...</p>';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.status === 'error') {
            throw new Error(data.message);
        }

        newsContainer.innerHTML = ''; 

        if (data.articles.length === 0) {
            newsContainer.innerHTML = '<p>No news articles found.</p>';
            return;
        }

        data.articles.slice(0, 10).forEach(article => {
            const articleElement = document.createElement('article');
            articleElement.classList.add('news-article');

            const title = article.title;
            const url = article.url;
            const date = new Date(article.publishedAt).toLocaleDateString(lang === 'ko' ? 'ko-KR' : 'en-US');
            const summary = article.description || 'No summary available.';

            articleElement.innerHTML = `
                <h2><a href="${url}" target="_blank">${title}</a></h2>
                <p class="article-meta">Published on ${date}</p>
                <p>${summary}</p>
                <a href="${url}" target="_blank" class="read-more">Read More &rarr;</a>
            `;
            newsContainer.appendChild(articleElement);
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        if (error.message.includes('apiKey')) {
            newsContainer.innerHTML = '<p><strong>Error:</strong> Invalid API key. Please check your API key in news.js.</p>';
        } else {
            newsContainer.innerHTML = '<p>Could not load news articles. Please try again later.</p>';
        }
    }
}

document.addEventListener('DOMContentLoaded', getNews);
