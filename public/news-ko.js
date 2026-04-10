/**
 * news-ko.js — AI Tool Compare (한국어)
 * ✅ 한국 AI 전문 매체 RSS 파싱
 *    - AI타임스 (aitimes.com)
 *    - 인공지능신문 (aitimes.kr)
 *    - ZDNet Korea IT
 * ✅ rss2json.com 프록시 사용 (CORS 없음, 무료)
 * ✅ AI 키워드 필터로 관련 기사만 표시
 * ✅ RSS 실패 시 한국어 fallback 유지
 */

const newsContainer = document.getElementById('news-container') || document.getElementById('news-articles');
const fallbackImg = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80';

// ──────────────────────────────────────────────
// 한국 AI 뉴스 RSS 소스
// ──────────────────────────────────────────────
const RSS_SOURCES = [
  { name: 'AI타임스', rss: 'https://www.aitimes.com/rss/allArticle.xml' },
  { name: '인공지능신문', rss: 'https://www.aitimes.kr/rss/allArticle.xml' },
  { name: 'ZDNet Korea', rss: 'https://zdnet.co.kr/rss/feed.aspx?cate=IT' }
];

function getRssApiUrl(rssUrl) {
  return `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&count=10`;
}

// ──────────────────────────────────────────────
// AI 관련 키워드 필터
// ──────────────────────────────────────────────
const AI_KEYWORDS = [
  '인공지능', ' ai ', 'ai,', 'ai.', 'ai가', 'ai를', 'ai의', 'ai는', 'ai로',
  '머신러닝', '딥러닝', '생성형', '챗gpt', 'chatgpt', '오픈ai', 'openai',
  '클로드', 'claude', 'anthropic', '앤트로픽', '제미나이', 'gemini',
  'gpt', 'llm', '거대언어모델', '이미지 생성', '영상 생성', '소라', 'sora',
  '런웨이', 'runway', '코파일럿', 'copilot', '커서', 'cursor',
  '딥시크', 'deepseek', '메타 ai', 'llama', '뮤즈 스파크', 'muse spark',
  '신경망', '트랜스포머', '챗봇', '자율주행', '로봇공학', '음성인식',
  '엔비디아', 'nvidia', '자연어처리', '엔트로픽', '미드저니', 'midjourney',
  '클링', 'kling', 'ai 스타트업', 'ai 모델', 'ai 에이전트', '언어 모델',
  '멀티모달', 'grok', '그록', '퍼플렉시티', 'windsurf', '윈드서프'
];

function isAIRelated(title, description) {
  const text = `${title || ''} ${description || ''}`.toLowerCase();
  return AI_KEYWORDS.some(kw => text.includes(kw.toLowerCase()));
}

// ──────────────────────────────────────────────
// 📌 한국어 FALLBACK (RSS 실패 시 표시)
// ──────────────────────────────────────────────
const FALLBACK_ARTICLES = [
  {
    title: "메타, 최강 AI 모델 Muse Spark 공개 — WhatsApp·인스타그램 배포 예정",
    description: "Meta Superintelligence Labs가 개발한 Muse Spark 출시. Instant·Thinking 모드, 병렬 멀티에이전트 아키텍처, 강력한 멀티모달 인식 탑재. WhatsApp·인스타그램·페이스북에 순차 배포 예정.",
    source: "AI타임스", date: "2026년 4월 8일",
    link: "https://www.aitimes.com",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "GPT-5.4와 Gemini 3.1 Pro, AI 인텔리전스 지수 공동 1위",
    description: "OpenAI GPT-5.4와 구글 Gemini 3.1 Pro가 57점 공동 1위. Claude Opus 4.6(53점), Meta Muse Spark(52점) 순서로 뒤를 이었습니다.",
    source: "인공지능신문", date: "2026년 4월 5일",
    link: "https://www.aitimes.kr",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Claude Sonnet 4.6, 100만 토큰 컨텍스트 창 베타 지원 시작",
    description: "Anthropic의 Claude Sonnet 4.6이 100만 토큰 컨텍스트 창을 베타 지원. 전체 코드베이스와 책 분량 문서를 단일 프롬프트로 분석 가능해졌습니다.",
    source: "AI타임스", date: "2026년 4월 1일",
    link: "https://www.aitimes.com",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Gemini 3.1 Pro, ARC-AGI-2 추론 벤치마크 77.1%로 1위",
    description: "구글 Gemini 3.1 Pro가 ARC-AGI-2에서 77.1% 기록. 100만 토큰당 $2/$12의 최고 가성비 프론티어 모델로 평가받습니다.",
    source: "ZDNet Korea", date: "2026년 3월 30일",
    link: "https://zdnet.co.kr",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Windsurf Wave 13, 2026년 3월 AI 개발 도구 1위 등극",
    description: "Codeium의 Windsurf Wave 13이 Arena Mode와 Git worktree 기반 병렬 세션을 도입, 개발자 만족도 1위를 차지했습니다.",
    source: "AI타임스", date: "2026년 3월 28일",
    link: "https://www.aitimes.com",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Sora 2, 최대 60초 영화급 AI 영상으로 품질 기준 갱신",
    description: "OpenAI Sora 2가 물리적 사실성이 대폭 향상된 최대 60초 AI 영상을 선보이며 Runway Gen-4, Kling AI 2.0과의 격차를 유지했습니다.",
    source: "인공지능신문", date: "2026년 3월 26일",
    link: "https://www.aitimes.kr",
    image: "https://images.unsplash.com/photo-1536240478700-b869ad10e2eb?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Kling AI 2.0 출시 — 최대 3분 영상 생성, 모션 사실성 대폭 향상",
    description: "쾌수(Kuaishou)의 Kling AI 2.0이 모션 사실성을 크게 개선, 최대 3분 영상 생성 지원으로 Sora와 Runway의 강력한 경쟁자로 부상했습니다.",
    source: "ZDNet Korea", date: "2026년 3월 24일",
    link: "https://zdnet.co.kr",
    image: "https://images.unsplash.com/photo-1536240478700-b869ad10e2eb?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Perplexity Computer, 19개 AI 모델로 자율 리서치 처리",
    description: "Perplexity의 Computer 에이전트가 19개 AI 모델을 오케스트레이션해 실시간 웹 검색과 출처 명시로 복잡한 멀티스텝 리서치를 자율 처리합니다.",
    source: "AI타임스", date: "2026년 3월 22일",
    link: "https://www.aitimes.com",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80"
  }
];

// ──────────────────────────────────────────────
// 카드 렌더링
// ──────────────────────────────────────────────
function renderCard(article) {
  const card = document.createElement('div');
  card.className = 'news-item';
  const imageUrl = article.thumbnail || article.image || fallbackImg;
  const rawDesc = (article.description || article.content || '').replace(/<[^>]*>/g, '');
  const description = rawDesc.length > 120 ? rawDesc.substring(0, 120) + '...' : rawDesc || '기사 전문을 보려면 클릭하세요.';
  let dateStr = article.date || '';
  if (article.pubDate) {
    try {
      dateStr = new Date(article.pubDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) { dateStr = article.pubDate.split('T')[0]; }
  }
  const source = article.source || '';
  card.innerHTML = `
    <img src="${imageUrl}" alt="${article.title || 'AI 뉴스'}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImg}';">
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
  FALLBACK_ARTICLES.forEach(a => newsContainer.appendChild(renderCard(a)));
}

// 즉시 fallback 렌더링
if (newsContainer) renderFallback();

// ──────────────────────────────────────────────
// RSS 파싱 + 렌더링
// ──────────────────────────────────────────────
async function fetchRSS(source) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch(getRssApiUrl(source.rss), { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) return [];
    const data = await res.json();
    if (data.status !== 'ok' || !data.items) return [];
    return data.items
      .filter(item => isAIRelated(item.title, item.description))
      .map(item => ({ ...item, source: source.name }));
  } catch (e) {
    clearTimeout(timeout);
    return [];
  }
}

async function getNews() {
  if (!newsContainer) return;
  try {
    const results = await Promise.allSettled(RSS_SOURCES.map(s => fetchRSS(s)));
    let all = [];
    results.forEach(r => { if (r.status === 'fulfilled') all = all.concat(r.value); });

    // 최신순 정렬
    all.sort((a, b) => new Date(b.pubDate || 0) - new Date(a.pubDate || 0));

    // 중복 제거
    const seen = new Set();
    const unique = all.filter(a => {
      const key = (a.title || '').substring(0, 25);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    if (unique.length >= 3) {
      newsContainer.innerHTML = '';
      unique.slice(0, 12).forEach(a => newsContainer.appendChild(renderCard(a)));
    }
    // 3개 미만이면 fallback 유지
  } catch (e) {
    console.warn('뉴스 로딩 실패, fallback 유지:', e.message);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', getNews);
} else {
  getNews();
}
