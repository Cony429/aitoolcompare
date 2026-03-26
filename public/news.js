document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '2586f116541e4356a27e36c2f9541a10';
    const articlesContainer = document.getElementById('news-articles');

    async function fetchNews() {
        const query = 'AI';
        const url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&language=en&apiKey=${apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displayNews(data.articles);
        } catch (error) {
            console.error("Error fetching news:", error);
            articlesContainer.innerHTML = '<p class="error-message">뉴스를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</p>';
        }
    }

    function displayNews(articles) {
        articlesContainer.innerHTML = '';
        if (!articles || articles.length === 0) {
            articlesContainer.innerHTML = '<p>관련 뉴스가 없습니다.</p>';
            return;
        }

        const articlesToShow = articles.slice(0, 9); // 최대 9개 기사만 표시

        articlesToShow.forEach(article => {
            if (!article.urlToImage || !article.title || !article.description) return; // 필수 정보 없는 기사 건너뛰기

            const newsCard = `
                <div class="news-card">
                    <img src="${article.urlToImage}" alt="News image">
                    <div class="news-content">
                        <h2>${article.title}</h2>
                        <p>${article.description}</p>
                        <a href="${article.url}" target="_blank" class="read-more">Read More</a>
                    </div>
                </div>
            `;
            articlesContainer.innerHTML += newsCard;
        });
    }

    fetchNews();
});