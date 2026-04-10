/**
 * news.js — AI Tool Compare
 * 
 * ✅ AI 관련 뉴스만 필터링 (keyword + client-side filter 이중 적용)
 * ✅ AdSense 크롤러 대응: 정적 fallback 즉시 렌더링
 */

const apiKey = 'pub_22d0f1b1183945bebaff43a1f9acbe04';
const newsContainer = document.getElementById('news-container') || document.getElementById('news-articles');

// ──────────────────────────────────────────────
// 📌 STATIC FALLBACK — 최신 AI 뉴스로 업데이트
// ──────────────────────────────────────────────
const FALLBACK_ARTICLES = [
  {
    title: "Meta Launches Muse Spark — Most Powerful AI Model Yet",
    description: "Meta's Muse Spark, built by Meta Superintelligence Labs, debuts with Instant and Thinking modes, parallel multi-agent architecture, and strong multimodal perception. Rolling out to WhatsApp, Instagram, and Messenger.",
    source: "Meta AI",
    date: "April 8, 2026",
    link: "https://about.fb.com/news/2026/04/introducing-muse-spark-meta-superintelligence-labs/",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "GPT-5.4 and Gemini 3.1 Pro Tie at Top of AI Intelligence Index",
    description: "OpenAI's GPT-5.4 and Google's Gemini 3.1 Pro both score 57 on the Artificial Analysis Intelligence Index, leading Claude Opus 4.6 (53) and Meta Muse Spark (52).",
    source: "Artificial Analysis",
    date: "April 5, 2026",
    link: "https://artificialanalysis.ai",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Claude Sonnet 4.6 Introduces 1M Token Context Window in Beta",
    description: "Anthropic's Claude Sonnet 4.6 now supports a 1 million token context window in beta, enabling analysis of entire codebases and book-length documents in a single prompt.",
    source: "Anthropic",
    date: "April 1, 2026",
    link: "https://anthropic.com",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Gemini 3.1 Pro Leads ARC-AGI-2 Reasoning at 77.1%",
    description: "Google's Gemini 3.1 Pro achieves a record 77.1% on ARC-AGI-2 while offering the best price-to-performance ratio among frontier models at $2/$12 per million tokens.",
    source: "Google DeepMind",
    date: "March 30, 2026",
    link: "https://deepmind.google",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Windsurf Wave 13 Ranked #1 AI Dev Tool — Launches Arena Mode",
    description: "Codeium's Windsurf Wave 13 introduces Arena Mode for side-by-side model comparison and parallel multi-agent sessions with Git worktrees, topping developer satisfaction rankings.",
    source: "Codeium",
    date: "March 28, 2026",
    link: "https://codeium.com/windsurf",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Sora 2 Sets New Standard for AI Video with 60-Second Generation",
    description: "OpenAI's Sora 2 delivers significantly improved physical realism in AI video generation up to 60 seconds, maintaining its lead over Runway Gen-4 and Kling AI 2.0.",
    source: "OpenAI",
    date: "March 26, 2026",
    link: "https://sora.com",
    image: "https://images.unsplash.com/photo-1536240478700-b869ad10e2eb?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Kling AI 2.0 Launches with Up to 3-Minute Video Generation",
    description: "Kuaishou's Kling AI 2.0 dramatically improves motion realism and extends maximum video length to 3 minutes, emerging as a strong competitor to Sora and Runway Gen-4.",
    source: "Kuaishou",
    date: "March 24, 2026",
    link: "https://klingai.com",
    image: "https://images.unsplash.com/photo-1536240478700-b869ad10e2eb?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Perplexity Computer Autonomously Handles Multi-Step Research Tasks",
    description: "Perplexity's Computer agent orchestrates 19 AI models to autonomously handle complex multi-step workflows with real-time web access and source citations.",
    source: "Perplexity AI",
    date: "March 22, 2026",
    link: "https://perplexity.ai",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80"
  }
];

// ──────────────────────────────────────────────
// 🔧 HELPERS
// ──────────────────────────────────────────────
const lang = document.documentElement.lang || 'en';
const isKo = lang.startsWith('ko');
const fallbackImg = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80';

// AI 관련 키워드 (클라이언트 사이드 2차 필터)
const AI_KEYWORDS = [
  'ai ', ' ai', 'artificial intelligence', 'machine learning', 'deep learning',
  'chatgpt', 'openai', 'claude', 'anthropic', 'gemini', 'google ai', 'google deepmind',
  'llm', 'large language model', 'gpt', 'generative ai', 'midjourney', 'dall-e',
  'stable diffusion', 'image generation', 'video generation', 'sora', 'runway',
  'copilot', 'cursor', 'deepseek', 'meta ai', 'llama', 'muse spark',
  'neural network', 'transformer', 'ai model', 'ai tool', 'ai agent',
  'language model', 'foundation model', 'multimodal', 'grok', 'perplexity',
  'elevenlabs', 'kling', 'heygen', 'synthesia', 'windsurf', 'lovable'
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
  const description = rawDesc.length > 120 ? rawDesc.substring(0, 120) + '...' : rawDesc || 'Click to read the full article.';

  let dateStr = article.date || '';
  if (article.pubDate) {
    try {
      dateStr = new Date(article.pubDate).toLocaleDateString(
        isKo ? 'ko-KR' : 'en-US',
        { year: 'numeric', month: 'short', day: 'numeric' }
      );
    } catch (e) {
      dateStr = article.pubDate.split('T')[0];
    }
  }

  const source = article.source_id || article.source || '';

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
        <a href="${article.link || article.url || '#'}" target="_blank" rel="noopener noreferrer">${isKo ? '더 읽기 →' : 'Read more →'}</a>
      </div>
    </div>
  `;

  return card;
}

function renderFallback() {
  if (!newsContainer) return;
  newsContainer.innerHTML = '';
  FALLBACK_ARTICLES.forEach(article => {
    newsContainer.appendChild(renderCard(article));
  });
}

// ──────────────────────────────────────────────
// 🚀 STEP 1: 즉시 fallback 렌더링 (Googlebot 대응)
// ──────────────────────────────────────────────
if (newsContainer) {
  renderFallback();
}

// ──────────────────────────────────────────────
// 🔄 STEP 2: API로 최신 AI 뉴스 로딩
// 변경사항: q= 파라미터로 AI 키워드 필터링 추가
// ──────────────────────────────────────────────
async function getNews() {
  if (!newsContainer) return;

  const languageParam = isKo ? 'ko' : 'en';

  try {
    // ✅ AI 키워드 쿼리 + technology 카테고리로 이중 필터
    const aiQuery = 'artificial+intelligence+OR+ChatGPT+OR+OpenAI+OR+Claude+OR+Gemini+OR+LLM+OR+AI+model';
    const apiUrl = `https://newsdata.io/api/1/latest?apikey=${apiKey}&language=${languageParam}&q=${aiQuery}&category=technology&image=1&removeduplicate=1`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      // ✅ 클라이언트 사이드 2차 필터 — AI 무관 기사 완전 차단
      const aiArticles = data.results.filter(isAIRelated);

      if (aiArticles.length >= 3) {
        newsContainer.innerHTML = '';
        aiArticles.forEach(article => {
          newsContainer.appendChild(renderCard(article));
        });
      }
      // AI 기사가 3개 미만이면 fallback 유지 (품질 보장)
    }

  } catch (error) {
    console.warn('News API unavailable, showing fallback content:', error.message);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', getNews);
} else {
  getNews();
}
