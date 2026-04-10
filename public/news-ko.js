/**
 * news-ko.js — AI Tool Compare (한국어)
 * ✅ AI 관련 뉴스만 필터링 (API 쿼리 + 클라이언트 사이드 이중 필터)
 * ✅ Fallback을 2026년 4월 최신 AI 뉴스로 업데이트
 */

const apiKey = 'pub_22d0f1b1183945bebaff43a1f9acbe04';
const newsContainer = document.getElementById('news-container') || document.getElementById('news-articles');

const FALLBACK_ARTICLES_KO = [
  {
    title: "메타, 최강 AI 모델 Muse Spark 공개 — WhatsApp·인스타그램 배포 예정",
    description: "Meta Superintelligence Labs가 개발한 Muse Spark 출시. Instant·Thinking 모드, 병렬 멀티에이전트 아키텍처, 강력한 멀티모달 인식 탑재. WhatsApp·인스타그램·페이스북에 순차 배포 예정.",
    source: "Meta AI",
    date: "2026년 4월 8일",
    link: "https://about.fb.com/news/2026/04/introducing-muse-spark-meta-superintelligence-labs/",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "GPT-5.4와 Gemini 3.1 Pro, AI 인텔리전스 지수 공동 1위",
    description: "OpenAI GPT-5.4와 구글 Gemini 3.1 Pro가 Artificial Analysis Intelligence Index에서 57점 공동 1위. Claude Opus 4.6(53점), Meta Muse Spark(52점) 순.",
    source: "Artificial Analysis",
    date: "2026년 4월 5일",
    link: "https://artificialanalysis.ai",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Claude Sonnet 4.6, 100만 토큰 컨텍스트 창 베타 지원",
    description: "Anthropic의 Claude Sonnet 4.6이 100만 토큰 컨텍스트 창을 베타 지원합니다. 전체 코드베이스와 책 분량 문서를 단일 프롬프트로 분석 가능.",
    source: "Anthropic",
    date: "2026년 4월 1일",
    link: "https://anthropic.com",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Gemini 3.1 Pro, ARC-AGI-2 추론 77.1%로 1위 달성",
    description: "구글 Gemini 3.1 Pro가 ARC-AGI-2에서 77.1% 기록. 100만 토큰당 $2/$12의 최고 가성비 프론티어 모델로 평가받고 있습니다.",
    source: "Google DeepMind",
    date: "2026년 3월 30일",
    link: "https://deepmind.google",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Windsurf Wave 13, 2026년 3월 AI 개발 도구 1위",
    description: "Codeium의 Windsurf Wave 13이 Arena Mode와 Git worktree 기반 병렬 멀티에이전트 세션을 도입, 개발자 만족도 1위를 기록했습니다.",
    source: "Codeium",
    date: "2026년 3월 28일",
    link: "https://codeium.com/windsurf",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Sora 2, 최대 60초 영화급 AI 영상으로 품질 기준 갱신",
    description: "OpenAI Sora 2가 물리적 사실성이 대폭 향상된 최대 60초 AI 영상을 선보이며 Runway Gen-4, Kling AI 2.0과의 격차를 유지했습니다.",
    source: "OpenAI",
    date: "2026년 3월 26일",
    link: "https://sora.com",
    image: "https://images.unsplash.com/photo-1536240478700-b869ad10e2eb?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Kling AI 2.0 출시 — 최대 3분 영상, 모션 사실성 대폭 향상",
    description: "쾌수(Kuaishou)의 Kling AI 2.0이 모션 사실성을 크게 개선하고 최대 3분 영상을 지원, Sora와 Runway의 강력한 경쟁자로 부상했습니다.",
    source: "Kuaishou",
    date: "2026년 3월 24일",
    link: "https://klingai.com",
    image: "https://images.unsplash.com/photo-1536240478700-b869ad10e2eb?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Perplexity Computer, 19개 AI 모델로 자율 리서치 처리",
    description: "Perplexity의 Computer 에이전트가 19개 AI 모델을 오케스트레이션해 실시간 웹 검색과 출처 명시로 복잡한 멀티스텝 리서치를 자율 처리합니다.",
    source: "Perplexity AI",
    date: "2026년 3월 22일",
    link: "https://perplexity.ai",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80"
  }
];

const fallbackImg = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80';

const AI_KEYWORDS = [
  'ai ', ' ai', '인공지능', '머신러닝', '딥러닝', '생성형 ai',
  'chatgpt', 'openai', 'claude', 'anthropic', 'gemini', 'google ai',
  'llm', '대규모 언어 모델', 'gpt', 'midjourney', 'dall-e',
  '이미지 생성', '영상 생성', 'sora', 'runway', 'copilot', 'cursor',
  'deepseek', 'meta ai', 'llama', 'muse spark', '신경망', '트랜스포머',
  'ai 모델', 'ai 도구', 'ai 에이전트', '언어 모델', '멀티모달',
  'grok', 'perplexity', 'elevenlabs', 'kling', 'heygen', 'windsurf',
  'artificial intelligence', 'machine learning', 'large language model'
];

function isAIRelated(article) {
  const text = `${article.title || ''} ${article.description || ''} ${article.content || ''}`.toLowerCase();
  return AI_KEYWORDS.some(kw => text.includes(kw));
}

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
    } catch (e) { dateStr = article.pubDate.split('T')[0]; }
  }
  const source = article.source_id || article.source || '';
  card.innerHTML = `
    <img src="${imageUrl}" alt="${article.title || 'AI 뉴스'}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackImg}';">
    <div class="news-text">
      ${source ? `<span style="font-size:0.72rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#007bff;margin-bottom:8px;display:block;">${source}</span>` : ''}
      <h2>${article.title || '제목 없음'}</h2>
      <p>${description}</p>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:auto;padding-top:4px;">
        ${dateStr ? `<span style="font-size:0.78rem;color:#aaa;">${dateStr}</span>` : '<span></span>'}
        <a href="${article.link || article.url || '#'}" target="_blank" rel="noopener noreferrer">더 읽기 →</a>
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

if (newsContainer) renderFallback();

async function getNews() {
  if (!newsContainer) return;
  try {
    const aiQuery = 'artificial+intelligence+OR+ChatGPT+OR+OpenAI+OR+Claude+OR+Gemini+OR+LLM+OR+인공지능';
    const apiUrl = `https://newsdata.io/api/1/latest?apikey=${apiKey}&language=ko&q=${aiQuery}&category=technology&image=1&removeduplicate=1`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeout);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const aiArticles = data.results.filter(isAIRelated);
      if (aiArticles.length >= 3) {
        newsContainer.innerHTML = '';
        aiArticles.forEach(a => newsContainer.appendChild(renderCard(a)));
      }
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
