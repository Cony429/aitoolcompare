const apiKey = 'pub_22d0f1b1183945bebaff43a1f9acbe04';
const newsContainer = document.getElementById('news-container');

async function getNews() {
    newsContainer.innerHTML = '<div class="loader"></div>';
    try {
        const response = await fetch(`https://newsdata.io/api/1/latest?apikey=${apiKey}&language=en`);
        const data = await response.json();
        newsContainer.innerHTML = '';

        if (data.results) {
            data.results.forEach(article => {
                const newsArticle = document.createElement('div');
                newsArticle.classList.add('news-article');

                const imageUrl = article.image_url ? article.image_url : 'https://via.placeholder.com/300x200';

                newsArticle.innerHTML = `
                    <img src="${imageUrl}" alt="News Image">
                    <div class="news-content">
                        <h2>${article.title}</h2>
                        <p>${article.description ? article.description : ''}</p>
                        <a href="${article.link}" target="_blank">Read more</a>
                    </div>
                `;
                newsContainer.appendChild(newsArticle);
            });
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>';
    }
}

getNews();
