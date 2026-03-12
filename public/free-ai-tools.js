// 더 안정적인 공공 데이터 주소로 교체했습니다.
const DATA_URL = 'https://raw.githubusercontent.com/sahilvadd/ai-tools-list/main/data.json';

async function fetchTools() {
    const container = document.getElementById('tool-list');
    try {
        const response = await fetch(DATA_URL);
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const tools = await response.json();
        container.innerHTML = ''; 

        // 데이터 구조가 다를 수 있어 안전하게 처리합니다.
        const toolsArray = Array.isArray(tools) ? tools : tools.tools;

        toolsArray.slice(0, 24).forEach(tool => {
            const card = document.createElement('div');
            card.className = 'tool-card';
            card.innerHTML = `
                <h3 style="color: #333; margin-bottom: 10px;">${tool.name || tool.title}</h3>
                <p style="font-size: 0.9rem; color: #666; margin-bottom: 15px;">${(tool.description || 'No description available').substring(0, 80)}...</p>
                <a href="${tool.link || tool.url}" target="_blank" style="display: inline-block; padding: 8px 15px; background: #007bff; color: white; border-radius: 5px; text-decoration: none; font-size: 0.8rem; font-weight:bold;">Visit Site</a>
            `;
            container.appendChild(card);
        });
    } catch (e) {
        console.error('Fetch Error:', e);
        container.innerHTML = `
            <div style="text-align:center; grid-column: 1/-1;">
                <p>데이터 연결에 실패했습니다. (원인: ${e.message})</p>
                <button onclick="location.reload()" style="padding: 10px 20px; cursor:pointer;">다시 시도하기</button>
            </div>
        `;
    }
}
fetchTools();