const apiKey = 'pub_22d0f1b1183945bebaff43a1f9acbe04';
const newsContainer = document.getElementById('news-container');

async function getNews() {
    newsContainer.innerHTML = '<div class="loader"></div>';
    try {
        const apiUrl = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=us,kr,ru,jp,cn&language=en&category=breaking,business,world&image=1&removeduplicate=1`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        newsContainer.innerHTML = '';

        if (data.results && data.results.length > 0) {
            data.results.forEach(article => {
                const newsArticle = document.createElement('div');
                newsArticle.classList.add('news-article');

                const imageUrl = article.image_url ? article.image_url : 'https://via.placeholder.com/300x200';
                const country = article.country ? article.country.join(', ').toUpperCase() : '';

                newsArticle.innerHTML = `
                    <img src="${imageUrl}" alt="News Image">
                    <div class="news-content">
                        <h2>${article.title}</h2>
                        <p>${article.description ? article.description : ''}</p>
                        <div class="news-meta">
                            ${country ? `<span class="news-country">${country}</span>` : ''}
                            <a href="${article.link}" target="_blank">Read more</a>
                        </div>
                    </div>
                `;
                newsContainer.appendChild(newsArticle);
            });
        } else {
             newsContainer.innerHTML = '<p>No news articles found. Please try again later.</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>';
    }
}

getNews();
