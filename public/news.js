
document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'pub_457311181b37941b0885f8c6e93e221b71679';
    const newsContainer = document.getElementById('news-container');

    if (newsContainer) {
        getNews();
    }

    async function getNews() {
        const apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=us,kr&language=en,ko&category=technology&image=1`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            newsContainer.innerHTML = '';

            if (data.results && data.results.length > 0) {
                data.results.forEach(article => {
                    const newsArticle = document.createElement('div');
                    newsArticle.classList.add('news-article');

                    const imageUrl = article.image_url ? article.image_url : 'https://via.placeholder.com/300x200';
                    
                    newsArticle.innerHTML = `
                        <img src="${imageUrl}" alt="News Image">
                        <div class="news-content">
                            <h2>${article.title}</h2>
                            <p>${article.description ? article.description.substring(0, 150) + '...' : ''}</p>
                            <a href="${article.link}" target="_blank" class="read-more">Read more</a>
                        </div>
                    `;
                    newsContainer.appendChild(newsArticle);
                });
            } else {
                newsContainer.innerHTML = '<p>No news articles found. Please try again later.</p>';
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = '<p>Failed to load news. Please check your internet connection or API key.</p>';
        }
    }
});
