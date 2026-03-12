const DATA_URL = 'https://raw.githubusercontent.com/steven-tey/heavy/main/lib/ai-tools.json';

async function fetchTools() {
    const container = document.getElementById('tool-list');
    try {
        const response = await fetch(DATA_URL);
        const tools = await response.json();
        
        container.innerHTML = ''; // "불러오는 중" 메시지 삭제

        tools.slice(0, 30).forEach(tool => {
            const card = document.createElement('div');
            card.className = 'tool-card';
            card.innerHTML = `
                <h3>${tool.name}</h3>
                <p>${tool.description.substring(0, 100)}...</p>
                <a href="${tool.link}" target="_blank" class="visit-btn">Visit Website</a>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Fetch Error:', error);
        container.innerHTML = '<p style="text-align:center; grid-column:1/-1;">데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>';
    }
}

fetchTools();