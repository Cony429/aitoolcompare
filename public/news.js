const apiKey = 'pub_22d0f1b1183945bebaff43a1f9acbe04';
const newsContainer = document.getElementById('news-container') || document.getElementById('news-articles');

async function getNews() {
    if (!newsContainer) {
        console.error('News container not found.');
        return;
    }

    // 로딩 표시
    newsContainer.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:60px 20px; color:#888; font-size:1rem;">
            <div style="font-size:2rem; margin-bottom:12px;">⏳</div>
            Loading latest AI news...
        </div>`;

    // HTML lang 속성으로 언어 자동 감지
    const lang = document.documentElement.lang || 'en';
    const languageParam = lang.startsWith('ko') ? 'ko' : 'en';

    try {
        const apiUrl = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=us,kr&language=${languageParam}&category=technology,top&image=1&removeduplicate=1`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        newsContainer.innerHTML = '';

        if (data.results && data.results.length > 0) {
            data.results.forEach(article => {

                // ── 이미지 처리: 없거나 깨질 경우 대체 이미지 사용 ──
                const fallbackImg = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80';
                const imageUrl = article.image_url || fallbackImg;

                // ── 설명 처리 ──
                const rawDesc = article.description || article.content || '';
                const description = rawDesc.length > 120
                    ? rawDesc.substring(0, 120) + '...'
                    : rawDesc || 'Click to read the full article.';

                // ── 날짜 처리 ──
                let dateStr = '';
                if (article.pubDate) {
                    try {
                        dateStr = new Date(article.pubDate).toLocaleDateString(
                            lang.startsWith('ko') ? 'ko-KR' : 'en-US',
                            { year: 'numeric', month: 'short', day: 'numeric' }
                        );
                    } catch (e) {
                        dateStr = article.pubDate.split('T')[0];
                    }
                }

                // ── 출처 처리 ──
                const source = article.source_id || '';

                // ── ★ CSS와 일치하는 클래스명 사용: news-item / news-text ── 
                const card = document.createElement('div');
                card.className = 'news-item';

                card.innerHTML = `
                    <img
                        src="${imageUrl}"
                        alt="${article.title || 'AI News'}"
                        loading="lazy"
                        onerror="this.onerror=null; this.src='${fallbackImg}';"
                    >
                    <div class="news-text">
                        ${source ? `<span style="font-size:0.72rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#007bff;margin-bottom:8px;display:block;">${source}</span>` : ''}
                        <h2>${article.title || 'Untitled'}</h2>
                        <p>${description}</p>
                        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:auto;padding-top:4px;">
                            ${dateStr ? `<span style="font-size:0.78rem;color:#aaa;">${dateStr}</span>` : '<span></span>'}
                            <a href="${article.link}" target="_blank" rel="noopener noreferrer">Read more →</a>
                        </div>
                    </div>
                `;

                newsContainer.appendChild(card);
            });

        } else {
            newsContainer.innerHTML = `
                <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#888;">
                    <div style="font-size:2rem;margin-bottom:12px;">📭</div>
                    No news articles found. Please try again later.
                </div>`;
        }

    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#888;">
                <div style="font-size:2rem;margin-bottom:12px;">⚠️</div>
                Failed to load news. Please check your connection or try again later.
            </div>`;
    }
}

getNews();
