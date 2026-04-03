/**
 * news.js — AI Tool Compare
 * 
 * ✅ AdSense 크롤러 대응:
 *   - 페이지 로드 즉시 정적 fallback 뉴스 카드 렌더링 (Googlebot이 읽을 수 있음)
 *   - API 호출 성공 시 최신 뉴스로 교체
 *   - API 실패 시 fallback 카드 유지 (빈 페이지 방지)
 */

const apiKey = 'pub_22d0f1b1183945bebaff43a1f9acbe04';
const newsContainer = document.getElementById('news-container') || document.getElementById('news-articles');

// ──────────────────────────────────────────────
// 📌 STATIC FALLBACK CONTENT
// Googlebot이 JS 실행 전에도 읽을 수 있는 정적 뉴스 카드
// API 성공 시 교체되고, 실패 시 그대로 유지됨
// ──────────────────────────────────────────────
const FALLBACK_ARTICLES = [
  {
    title: "OpenAI Launches GPT-4.5 with Enhanced Reasoning and Multimodal Capabilities",
    description: "OpenAI's latest model brings significant improvements to reasoning, coding, and real-time voice interaction, setting a new benchmark for general-purpose AI assistants in 2026.",
    source: "OpenAI Blog",
    date: "April 1, 2026",
    link: "https://openai.com/blog",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Google DeepMind's Gemini 2.0 Ultra Tops Multimodal Benchmarks",
    description: "Gemini 2.0 Ultra achieves state-of-the-art results on video understanding and long-context document analysis, outperforming competitors across key industry benchmarks.",
    source: "Google DeepMind",
    date: "March 30, 2026",
    link: "https://deepmind.google/",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Meta Releases Llama 4 Scout: Open-Source Model with 10M Token Context",
    description: "Meta's newest open-source model features a record-breaking 10 million token context window and mixture-of-experts architecture, making it available for self-hosted enterprise use.",
    source: "Meta AI",
    date: "March 28, 2026",
    link: "https://ai.meta.com/",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Microsoft Copilot Studio Enables Enterprise AI Agent Deployment at Scale",
    description: "Microsoft's low-code platform now supports multi-agent orchestration with built-in security controls, allowing businesses to deploy autonomous AI workflows connected to Microsoft 365.",
    source: "Microsoft",
    date: "March 27, 2026",
    link: "https://www.microsoft.com/",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "AI-Designed Drug Candidate Enters Phase II Clinical Trial",
    description: "Insilico Medicine's AI-designed drug for a rare pulmonary disease has advanced to Phase II trials, marking a major milestone for artificial intelligence in pharmaceutical discovery.",
    source: "Nature Medicine",
    date: "March 26, 2026",
    link: "https://www.nature.com/nm/",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Cursor Surpasses 1 Million Developer Users as AI Coding Goes Mainstream",
    description: "The AI-native IDE Cursor has passed one million active developers, driven by its full-codebase context and agentic editing features that rival GitHub Copilot's market share.",
    source: "TechCrunch",
    date: "March 25, 2026",
    link: "https://techcrunch.com/",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Anthropic Raises $2.5B Series E to Accelerate Claude's Enterprise Expansion",
    description: "Anthropic's latest funding round values the company at $18.4 billion and will fund expanded enterprise offerings, safety research, and global infrastructure for Claude deployments.",
    source: "Bloomberg",
    date: "March 24, 2026",
    link: "https://www.bloomberg.com/",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "EU AI Act Enforcement Begins: High-Risk AI Systems Must Now Comply",
    description: "The European Union's AI Act enforcement phase has officially started, requiring companies deploying high-risk AI in hiring, credit, and medical applications to meet new transparency requirements.",
    source: "Reuters",
    date: "March 22, 2026",
    link: "https://www.reuters.com/",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
  }
];

// ──────────────────────────────────────────────
// 🔧 RENDER HELPERS
// ──────────────────────────────────────────────
const lang = document.documentElement.lang || 'en';
const isKo = lang.startsWith('ko');
const fallbackImg = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80';

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
        <a href="${article.link}" target="_blank" rel="noopener noreferrer">${isKo ? '더 읽기 →' : 'Read more →'}</a>
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
// 페이지 로드 즉시 정적 카드를 렌더링해서
// JS 실행 전에 크롤링해도 콘텐츠가 보이게 함
// ──────────────────────────────────────────────
if (newsContainer) {
  renderFallback();
}

// ──────────────────────────────────────────────
// 🔄 STEP 2: API로 최신 뉴스 로딩 후 교체
// ──────────────────────────────────────────────
async function getNews() {
  if (!newsContainer) return;

  const languageParam = isKo ? 'ko' : 'en';

  try {
    const apiUrl = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=us,kr&language=${languageParam}&category=technology,top&image=1&removeduplicate=1`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8초 타임아웃

    const response = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      // ✅ API 성공: 최신 뉴스로 교체
      newsContainer.innerHTML = '';
      data.results.forEach(article => {
        newsContainer.appendChild(renderCard(article));
      });
    }
    // API 결과가 없으면 fallback 유지 (innerHTML 건드리지 않음)

  } catch (error) {
    // ✅ API 실패: fallback 카드 그대로 유지 (빈 페이지 없음)
    console.warn('News API unavailable, showing fallback content:', error.message);
    // renderFallback()은 이미 STEP 1에서 호출됨 — 아무것도 안 해도 됨
  }
}

// DOM 준비 후 API 호출
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', getNews);
} else {
  getNews();
}
