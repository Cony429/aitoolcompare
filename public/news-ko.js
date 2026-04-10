/**
 * news-ko.js — AI Tool Compare (한국어)
 * ✅ 한국 AI 전문 매체 RSS 파싱 (AI타임스, 인공지능신문, ZDNet Korea)
 * ✅ 기사 제목 키워드 기반 이미지 자동 매핑
 * ✅ AI 키워드 필터링
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
// 🖼️ 키워드별 주제 이미지 매핑
// ──────────────────────────────────────────────
function getTopicImage(title) {
  const t = (title || '').toLowerCase();

  // 영상 생성
  if (t.includes('영상') || t.includes('비디오') || t.includes('sora') || t.includes('소라') ||
      t.includes('runway') || t.includes('런웨이') || t.includes('kling') || t.includes('클링') ||
      t.includes('heygen') || t.includes('pika') || t.includes('동영상'))
    return 'https://images.unsplash.com/photo-1536240478700-b869ad10e2eb?auto=format&fit=crop&w=600&q=80';

  // 이미지 생성
  if (t.includes('이미지') || t.includes('midjourney') || t.includes('미드저니') ||
      t.includes('달리') || t.includes('dall-e') || t.includes('그림') || t.includes('디자인') ||
      t.includes('stable diffusion') || t.includes('스테이블'))
    return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80';

  // 코딩 / 개발
  if (t.includes('코딩') || t.includes('개발') || t.includes('cursor') || t.includes('커서') ||
      t.includes('copilot') || t.includes('코파일럿') || t.includes('깃허브') || t.includes('github') ||
      t.includes('windsurf') || t.includes('윈드서프') || t.includes('프로그래밍') || t.includes('코드'))
    return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80';

  // 음성 / 오디오 / 음악
  if (t.includes('음성') || t.includes('오디오') || t.includes('음악') ||
      t.includes('elevenlabs') || t.includes('일레븐') || t.includes('suno') || t.includes('수노') ||
      t.includes('목소리') || t.includes('tts') || t.includes('보이스'))
    return 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=600&q=80';

  // 의료 / 헬스케어
  if (t.includes('의료') || t.includes('헬스') || t.includes('병원') || t.includes('신약') ||
      t.includes('의학') || t.includes('건강') || t.includes('임상') || t.includes('진단'))
    return 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80';

  // 로봇 / 자율주행
  if (t.includes('로봇') || t.includes('자율주행') || t.includes('드론') ||
      t.includes('자동화') || t.includes('물리 ai') || t.includes('휴머노이드'))
    return 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80';

  // 규제 / 정책 / 법
  if (t.includes('규제') || t.includes('법안') || t.includes('정책') || t.includes('법률') ||
      t.includes('eu') || t.includes('정부') || t.includes('국회') || t.includes('윤리'))
    return 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80';

  // OpenAI / ChatGPT / GPT
  if (t.includes('오픈ai') || t.includes('openai') || t.includes('gpt') ||
      t.includes('chatgpt') || t.includes('챗gpt') || t.includes('o1') || t.includes('o3'))
    return 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80';

  // Google / Gemini / DeepMind
  if (t.includes('구글') || t.includes('google') || t.includes('gemini') ||
      t.includes('제미나이') || t.includes('deepmind') || t.includes('딥마인드') ||
      t.includes('바드') || t.includes('notebooklm'))
    return 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80';

  // Meta / Llama / Muse Spark
  if (t.includes('메타') || t.includes('meta') || t.includes('llama') ||
      t.includes('라마') || t.includes('muse spark') || t.includes('뮤즈'))
    return 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80';

  // Anthropic / Claude
  if (t.includes('앤트로픽') || t.includes('anthropic') || t.includes('claude') || t.includes('클로드'))
    return 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80';

  // 스타트업 / 투자 / 펀딩
  if (t.includes('스타트업') || t.includes('투자') || t.includes('펀딩') ||
      t.includes('억') || t.includes('유니콘') || t.includes('ipo') || t.includes('상장'))
    return 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=600&q=80';

  // 에이전트 / 자동화
  if (t.includes('에이전트') || t.includes('agent') || t.includes('자동화') ||
      t.includes('manus') || t.includes('마누스') || t.includes('워크플로우'))
    return 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80';

  // 검색 / 리서치
  if (t.includes('검색') || t.includes('퍼플렉시티') || t.includes('perplexity') ||
      t.includes('리서치') || t.includes('research'))
    return 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&q=80';

  // 기본 fallback (AI 일반)
  return 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80';
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
  '신경망', '트랜스포머', '챗봇', '자율주행', '음성인식',
  '엔비디아', 'nvidia', '자연어처리', '미드저니', 'midjourney',
  '클링', 'kling', 'ai 스타트업', 'ai 모델', 'ai 에이전트', '언어 모델',
  '멀티모달', 'grok', '그록', '퍼플렉시티', 'windsurf', '윈드서프',
  '생성ai', '생성 ai', 'llm', '파운데이션 모델'
];

function isAIRelated(title, description) {
  const text = `${title || ''} ${description || ''}`.toLowerCase();
  return AI_KEYWORDS.some(kw => text.includes(kw.toLowerCase()));
}

// ──────────────────────────────────────────────
// 📌 한국어 FALLBACK
// ──────────────────────────────────────────────
const FALLBACK_ARTICLES = [
  {
    title: "메타, 최강 AI 모델 Muse Spark 공개 — WhatsApp·인스타그램 배포 예정",
    description: "Meta Superintelligence Labs가 개발한 Muse Spark 출시. Instant·Thinking 모드, 병렬 멀티에이전트 아키텍처, 강력한 멀티모달 인식 탑재.",
    source: "AI타임스", date: "2026년 4월 8일",
    link: "https://www.aitimes.com",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "GPT-5.4와 Gemini 3.1 Pro, AI 인텔리전스 지수 공동 1위",
    description: "OpenAI GPT-5.4와 구글 Gemini 3.1 Pro가 57점 공동 1위. Claude Opus 4.6(53점), Meta Muse Spark(52점) 순.",
    source: "인공지능신문", date: "2026년 4월 5일",
    link: "https://www.aitimes.kr",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Claude Sonnet 4.6, 100만 토큰 컨텍스트 창 베타 지원 시작",
    description: "Anthropic의 Claude Sonnet 4.6이 100만 토큰 컨텍스트 창을 베타 지원. 전체 코드베이스 단일 프롬프트 분석 가능.",
    source: "AI타임스", date: "2026년 4월 1일",
    link: "https://www.aitimes.com",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Gemini 3.1 Pro, ARC-AGI-2 추론 벤치마크 77.1%로 1위",
    description: "구글 Gemini 3.1 Pro가 ARC-AGI-2에서 77.1% 기록. 100만 토큰당 $2/$12 최고 가성비.",
    source: "ZDNet Korea", date: "2026년 3월 30일",
    link: "https://zdnet.co.kr",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Windsurf Wave 13, 2026년 3월 AI 개발 도구 1위 등극",
    description: "Codeium의 Windsurf Wave 13이 Arena Mode와 병렬 멀티에이전트 세션 도입, 개발자 만족도 1위.",
    source: "AI타임스", date: "2026년 3월 28일",
    link: "https://www.aitimes.com",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Sora 2, 최대 60초 영화급 AI 영상으로 품질 기준 갱신",
    description: "OpenAI Sora 2가 물리적 사실성이 향상된 최대 60초 AI 영상. Runway Gen-4, Kling AI 2.0과 격차 유지.",
    source: "인공지능신문", date: "2026년 3월 26일",
    link: "https://www.aitimes.kr",
    image: "https://images.unsplash.com/photo-1536240478700-b869ad10e2eb?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Kling AI 2.0 출시 — 최대 3분 영상, 모션 사실성 대폭 향상",
    description: "쾌수(Kuaishou)의 Kling AI 2.0이 최대 3분 영상 지원, Sora와 Runway의 강력한 경쟁자로 부상.",
    source: "ZDNet Korea", date: "2026년 3월 24일",
    link: "https://zdnet.co.kr",
    image: "https://images.unsplash.com/photo-1536240478700-b869ad10e2eb?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Perplexity Computer, 19개 AI 모델로 자율 리서치 처리",
    description: "Perplexity의 Computer 에이전트가 19개 AI 모델 오케스트레이션으로 복잡한 멀티스텝 리서치를 자율 처리.",
    source: "AI타임스", date: "2026년 3월 22일",
    link: "https://www.aitimes.com",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&q=80"
  }
];

// ──────────────────────────────────────────────
// 카드 렌더링
// ──────────────────────────────────────────────
function renderCard(article) {
  const card = document.createElement('div');
  card.className = 'news-item';

  // ✅ RSS 이미지 있으면 사용, 없으면 제목 키워드로 주제 이미지 자동 선택
  const imageUrl = article.thumbnail || article.image ||
                   (article.enclosure && article.enclosure.link) ||
                   getTopicImage(article.title);

  const rawDesc = (article.description || article.content || '').replace(/<[^>]*>/g, '');
  const description = rawDesc.length > 120 ? rawDesc.substring(0, 120) + '...' : rawDesc || '기사 전문을 보려면 클릭하세요.';

  let dateStr = article.date || '';
  if (article.pubDate) {
    try {
      dateStr = new Date(article.pubDate).toLocaleDateString('ko-KR', {
        year: 'numeric', month: 'short', day: 'numeric'
      });
    } catch (e) { dateStr = article.pubDate.split('T')[0]; }
  }

  const source = article.source || '';

  card.innerHTML = `
    <img
      src="${imageUrl}"
      alt="${article.title || 'AI 뉴스'}"
      loading="lazy"
      onerror="this.onerror=null; this.src='${getTopicImage(article.title)}';"
    >
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
// RSS 파싱
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
  } catch (e) {
    console.warn('뉴스 로딩 실패, fallback 유지:', e.message);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', getNews);
} else {
  getNews();
}
