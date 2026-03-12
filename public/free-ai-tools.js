// 데이터를 외부에서 안 가져오고 파일 안에 직접 저장했습니다. (CORS 에러 0%)
const tools = [
    { name: "ChatGPT", description: "OpenAI의 다재다능한 AI 챗봇입니다.", link: "https://chat.openai.com" },
    { name: "Claude", description: "Anthropic의 안전하고 똑똑한 AI 조수입니다.", link: "https://claude.ai" },
    { name: "Midjourney", description: "텍스트를 고퀄리티 예술 이미지로 바꿔줍니다.", link: "https://midjourney.com" },
    { name: "Gemini", description: "구글의 최신 대규모 언어 모델입니다.", link: "https://gemini.google.com" },
    { name: "Jasper", description: "마케팅 문구와 블로그 글 작성 전문 AI입니다.", link: "https://jasper.ai" },
    { name: "Canva AI", description: "디자인 초보도 쉽게 쓰는 이미지 생성 도구입니다.", link: "https://canva.com" },
    { name: "Perplexity", description: "출처를 밝혀주는 똑똑한 AI 검색 엔진입니다.", link: "https://perplexity.ai" },
    { name: "Descript", description: "텍스트 수정하듯 쉬운 AI 영상 편집 도구입니다.", link: "https://descript.com" },
    { name: "Luma AI", description: "현실적인 3D 객체와 영상을 만들어줍니다.", link: "https://lumalabs.ai" },
    { name: "Gamma", description: "아이디어만 주면 PPT를 1분 만에 완성해줍니다.", link: "https://gamma.app" },
    { name: "Notion AI", description: "노션 문서 안에서 글쓰기를 도와주는 AI입니다.", link: "https://notion.so" },
    { name: "Leonardo.ai", description: "게임 자산이나 배경 생성에 최적화된 이미지 AI입니다.", link: "https://leonardo.ai" }
];

function displayTools() {
    const container = document.getElementById('tool-list');
    
    // 로딩 메시지 삭제
    container.innerHTML = ''; 

    tools.forEach(tool => {
        const card = document.createElement('div');
        card.className = 'tool-card';
        card.innerHTML = `
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
            <a href="${tool.link}" target="_blank" class="visit-btn" style="display:inline-block; padding:10px 20px; background:#007bff; color:white; border-radius:6px; text-decoration:none; font-weight:bold;">Visit Website</a>
        `;
        container.appendChild(card);
    });
}

// 페이지가 로드되자마자 실행
displayTools();