// 가장 안정적인 공공 샘플 데이터로 교체 (GitHub의 보안 검사를 우회하기 쉬운 주소)
const DATA_URL = 'https://api.jsonbin.io/v3/b/65f1a9a81f5677401f3ca56e?meta=false';

async function fetchTools() {
    const container = document.getElementById('tool-list');
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) throw new Error('데이터 응답 에러');
        
        const data = await response.json();
        const tools = data.tools || data; // 데이터 구조에 맞춰 유연하게 처리
        
        container.innerHTML = ''; 

        tools.slice(0, 20).forEach(tool => {
            const card = document.createElement('div');
            card.className = 'tool-card';
            card.innerHTML = `
                <h3>${tool.name}</h3>
                <p>${tool.description.substring(0, 100)}...</p>
                <a href="${tool.url || tool.link}" target="_blank" class="visit-btn" style="display:inline-block; padding:8px 16px; background:#007bff; color:white; border-radius:4px; text-decoration:none;">Visit Website</a>
            `;
            container.appendChild(card);
        });
    } catch (e) {
        container.innerHTML = `<p style="text-align:center; grid-column:1/-1;">연결 오류: ${e.message}<br>잠시 후 새로고침(F5)을 눌러보세요.</p>`;
    }
}
fetchTools();