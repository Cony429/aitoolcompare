/**
 * news-ko.js — AI Tool Compare (한국어)
 * news.js와 동일한 구조, 한국어 fallback 콘텐츠 적용
 */

const apiKey = 'pub_22d0f1b1183945bebaff43a1f9acbe04';
const newsContainer = document.getElementById('news-container') || document.getElementById('news-articles');

const FALLBACK_ARTICLES_KO = [
  {
    title: "OpenAI, 향상된 추론과 멀티모달 기능의 GPT-4.5 출시",
    description: "OpenAI의 최신 모델은 추론, 코딩, 실시간 음성 상호작용에서 큰 발전을 이루며 2026년 범용 AI 어시스턴트의 새로운 벤치마크를 세웠습니다.",
    source: "OpenAI Blog",
    date: "2026년 4월 1일",
    link: "https://openai.com/blog",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "구글 딥마인드 Gemini 2.0 Ultra, 멀티모달 벤치마크 1위 달성",
    description: "Gemini 2.0 Ultra가 동영상 이해와 장문 문서 분석에서 최고 성능을 달성하며 주요 업계 벤치마크에서 경쟁사를 앞질렀습니다.",
    source: "Google DeepMind",
    date: "2026년 3월 30일",
    link: "https://deepmind.google/",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "메타, 1000만 토큰 컨텍스트의 오픈소스 Llama 4 Scout 공개",
    description: "메타의 신규 오픈소스 모델은 기록적인 1000만 토큰 컨텍스트 창과 혼합 전문가(MoE) 아키텍처를 탑재해 기업 자체 호스팅에서 활용 가능합니다.",
    source: "Meta AI",
    date: "2026년 3월 28일",
    link: "https://ai.meta.com/",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "마이크로소프트 Copilot Studio, 엔터프라이즈 AI 에이전트 대규모 배포 지원",
    description: "마이크로소프트의 로우코드 플랫폼이 내장 보안 제어 기능과 함께 멀티 에이전트 오케스트레이션을 지원하며 Microsoft 365 연결 자율 AI 워크플로우 배포가 가능해졌습니다.",
    source: "Microsoft",
    date: "2026년 3월 27일",
    link: "https://www.microsoft.com/",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "AI 설계 신약 후보, 2상 임상시험 진입 성공",
    description: "Insilico Medicine의 AI 설계 희귀 폐질환 신약이 2상 임상시험에 진입해 AI 신약 개발의 중요한 이정표를 세웠습니다.",
    source: "Nature Medicine",
    date: "2026년 3월 26일",
    link: "https://www.nature.com/nm/",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "AI 코딩 도구 Cursor, 개발자 100만 명 돌파",
    description: "AI 네이티브 IDE Cursor가 전체 코드베이스 컨텍스트와 에이전트 편집 기능에 힘입어 활성 개발자 100만 명을 넘어섰습니다.",
    source: "TechCrunch",
    date: "2026년 3월 25일",
    link: "https://techcrunch.com/",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Anthropic, 시리즈 E 25억 달러 투자 유치 — 기업 확장 가속",
    description: "Anthropic의 최신 투자 라운드는 회사 가치를 184억 달러로 평가하며 Claude의 엔터프라이즈 서비스 확대와 글로벌 인프라 구축에 활용됩니다.",
    source: "Bloomberg",
    date: "2026년 3월 24일",
    link: "https://www.bloomberg.com/",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "EU AI법 시행 시작: 고위험 AI 시스템 규제 준수 의무화",
    description: "유럽연합의 AI법 시행이 공식 시작되면서 채용, 신용평가, 의료 분야 고위험 AI를 배포하는 기업들은 새로운 투명성 요건을 충족해야 합니다.",
    source: "Reuters",
    date: "2026년 3월 22일",
    link: "https://www.reuters.com/",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
  }
];

const fallbackImg = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80';

function renderCard(article) {
  const card = document.createElement('div');
  card.className = 'news-item';

  const imageUrl = article.image_url || article.image || fallbackImg;
  const rawDesc = article.description || article.content || '';
  const description = rawDesc.length > 120 ? rawDesc.substring(0, 120) + '...' : rawDesc || '기사 전문을 보려면 클릭하세요.';

  let dateStr = article.date || '';
  if (article.pubDate) {
    try {
      dateStr = new Date(article.pubDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
      dateStr = article.pubDate.split('T')[0];
    }
  }

  const source = article.source_id || article.source || '';

  card.innerHTML = `
    <img
      src="${imageUrl}"
      alt="${article.title || 'AI 뉴스'}"
      loading="lazy"
      onerror="this.onerror=null; this.src='${fallbackImg}';"
    >
    <div class="news-text">
      ${source ? `<span style="font-size:0.72rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#007bff;margin-bottom:8px;display:block;">${source}</span>` : ''}
      <h2>${article.title || '제목 없음'}</h2>
      <p>${description}</p>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:auto;padding-top:4px;">
        ${dateStr ? `<span style="font-size:0.78rem;color:#aaa;">${dateStr}</span>` : '<span></span>'}
        <a href="${article.link}" target="_blank" rel="noopener noreferrer">더 읽기 →</a>
      </div>
    </div>
  `;
  return card;
}

function renderFallback() {
  if (!newsContainer) return;
  newsContainer.innerHTML = '';
  FALLBACK_ARTICLES_KO.forEach(a => newsContainer.appendChild(renderCard(a)));
}

// STEP 1: 즉시 fallback 렌더링
if (newsContainer) renderFallback();

// STEP 2: API로 최신 뉴스 교체
async function getNews() {
  if (!newsContainer) return;
  try {
    const apiUrl = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=us,kr&language=ko&category=technology,top&image=1&removeduplicate=1`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeout);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      newsContainer.innerHTML = '';
      data.results.forEach(a => newsContainer.appendChild(renderCard(a)));
    }
  } catch (e) {
    console.warn('뉴스 API 사용 불가, fallback 유지:', e.message);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', getNews);
} else {
  getNews();
}
