const apiKey = '2586f116541e4356a27e36c2f9541a10';
// HTML에 있는 ID와 똑같아야 합니다! (대소문자 주의)
const newsContainer = document.getElementById('news-articles'); 

async function fetchNews(query) {
    if (!newsContainer) {
        console.error("뉴스 컨테이너(ID: news-articles)를 찾을 수 없습니다.");
        return;
    }
    newsContainer.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">뉴스를 불러오는 중입니다...</p>';
    
    // API 호출 (AI 관련 뉴스)
    let url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&language=en&apiKey=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.status === "error") {
            throw new Error(data.message);
        }
        displayNews(data.articles);
    } catch (error) {
        console.error('뉴스 로딩 실패:', error);
        newsContainer.innerHTML = `<p style="text-align:center; grid-column: 1/-1;">뉴스를 불러오지 못했습니다. (사유: ${error.message})</p>`;
    }
}

function displayNews(articles) {
    newsContainer.innerHTML = '';
    if (!articles || articles.length === 0) {
        newsContainer.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">표시할 뉴스가 없습니다.</p>';
        return;
    }

    articles.slice(0, 12).forEach(article => {
        const newsCard = `
            <div class="news-card">
                ${article.urlToImage ? `<img src="${article.urlToImage}" alt="뉴스 이미지">` : ''}
                <div class="news-content">
                    <h2>${article.title}</h2>
                    <p>${article.description || ''}</p>
                    <a href="${article.url}" target="_blank" class="read-more">기사 읽기</a>
                </div>
            </div>
        `;
        newsContainer.insertAdjacentHTML('beforeend', newsCard);
    });
}

// 페이지 로드 시 'AI' 키워드로 뉴스 가져오기
fetchNews('Artificial Intelligence');