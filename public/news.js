// NewsData.io API Key (사용자님이 주신 키)
const apiKey = 'pub_22d0f1b1183945bebaff43a1f9acbe04';

// news.html의 ID인 'news-articles'와 정확히 일치시킴
const newsContainer = document.getElementById('news-articles');

async function getNews() {
    if (!newsContainer) return;
    
    // 로딩 표시
    newsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">Loading latest AI news...</p>';
    
    try {
        // API URL (NewsData.io 방식)
        const apiUrl = `https://newsdata.io/api/1/latest?apikey=${apiKey}&q=AI&language=en&category=technology`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        newsContainer.innerHTML = '';

        if (data.results && data.results.length > 0) {
            data.results.forEach(article => {
                const newsCard = document.createElement('div');
                newsCard.classList.add('news-card'); // news.css의 카드 스타일 적용

                // 이미지가 없을 경우 기본 이미지 처리
                const imageUrl = article.image_url ? article.image_url : 'https://via.placeholder.com/400x250?text=AI+News';

                newsCard.innerHTML = `
                    <img src="${imageUrl}" alt="News Image">
                    <div class="news-content">
                        <h2>${article.title}</h2>
                        <p>${article.description ? article.description.substring(0, 120) + '...' : 'Click read more to see the full story.'}</p>
                        <div class="news-meta">
                            <a href="${article.link}" target="_blank" class="read-more">Read more</a>
                        </div>
                    </div>
                `;
                newsContainer.appendChild(newsCard);
            });
        } else {
             newsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">No news articles found at the moment.</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">Failed to load news. Please check back later.</p>';
    }
}

// 실행
getNews();