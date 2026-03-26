const apiKey = 'pub_22d0f1b1183945bebaff43a1f9acbe04';
const newsContainer = document.getElementById('news-container') || document.getElementById('news-articles');

async function getNews() {
    if (!newsContainer) {
        console.error('News container not found. Make sure an element with id="news-container" exists in your HTML.');
        return;
    }

    newsContainer.innerHTML = '<div class="loader" style="grid-column: 1/-1; text-align:center;">Loading...</div>';

    // 1. 언어 설정 최적화: HTML의 lang 속성을 읽어 API 언어 파라미터를 동적으로 설정
    const lang = document.documentElement.lang || 'en';
    const languageParam = lang.startsWith('ko') ? 'ko' : 'en';

    try {
        const apiUrl = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=us,kr&language=${languageParam}&category=technology,top&image=1&removeduplicate=1`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        newsContainer.innerHTML = '';

        if (data.results && data.results.length > 0) {
            data.results.forEach(article => {
                const newsArticle = document.createElement('div');
                newsArticle.classList.add('news-article', 'news-card');

                const imageUrl = article.image_url ? article.image_url : 'https://via.placeholder.com/300x200';
                const country = article.country ? article.country.join(', ').toUpperCase() : '';
                const description = article.description ? article.description.substring(0, 150) + '...' : (article.content ? article.content.substring(0, 150) + '...' : '');

                newsArticle.innerHTML = `
                    <img src="${imageUrl}" alt="News Image">
                    <div class="news-content">
                        <h2>${article.title}</h2>
                        <p>${description}</p>
                        <div class="news-meta">
                            ${country ? `<span class="news-country">${country}</span>` : ''}
                            <a href="${article.link}" target="_blank" class="read-more">Read more</a>
                        </div>
                    </div>
                `;
                newsContainer.appendChild(newsArticle);
            });
        } else {
            newsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">No news articles found. Please try again later.</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">Failed to load news. Please check your internet or API key.</p>';
    }
}

getNews();