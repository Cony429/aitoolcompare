const DATA_URL = 'https://raw.githubusercontent.com/steven-tey/heavy/main/lib/ai-tools.json';

async function fetchTools() {
    const container = document.getElementById('tool-list'); // 스샷의 id인 tool-list로 맞췄습니다
    try {
        const response = await fetch(DATA_URL);
        const tools = await response.json();
        container.innerHTML = ''; 

        tools.slice(0, 24).forEach(tool => {
            const card = document.createElement('div');
            card.className = 'tool-card';
            card.innerHTML = `
                <h3 style="color: #333; margin-bottom: 10px;">${tool.name}</h3>
                <p style="font-size: 0.9rem; color: #666; margin-bottom: 15px;">${tool.description.substring(0, 80)}...</p>
                <a href="${tool.link}" target="_blank" style="display: inline-block; padding: 8px 15px; background: #007bff; color: white; border-radius: 5px; text-decoration: none; font-size: 0.8rem;">Visit Site</a>
            `;
            container.appendChild(card);
        });
    } catch (e) {
        container.innerHTML = '데이터를 불러오지 못했습니다.';
    }
}
fetchTools();
