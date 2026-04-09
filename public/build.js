/**
 * ============================================================
 * build.js — AI Tool Compare 자동 빌드 스크립트
 * ============================================================
 * 사용법:
 *   node build.js
 *
 * 이 스크립트가 하는 일:
 *   1. ai-tools.json     → index.html    자동 생성
 *   2. ai-tools-ko.json  → index-ko.html 자동 생성
 *      (정적 HTML tbody + JSON-LD Schema 모두 자동 반영)
 *
 * 새 도구 추가 방법:
 *   1. ai-tools.json / ai-tools-ko.json 에 항목 추가
 *   2. node build.js 실행
 *   3. 생성된 index.html / index-ko.html 서버에 업로드 끝!
 * ============================================================
 */

const fs = require('fs');
const path = require('path');

// ── 설정 ──────────────────────────────────────────────────
const CONFIG = {
  en: {
    inputJson:    'ai-tools.json',
    outputHtml:   'index.html',
    lang:         'en',
    siteUrl:      'https://bestaitoolcompare.com',
    altLangLink:  'index-ko.html',
    altLangLabel: 'KO',
    thisLangLink: 'index.html',
    thisLangLabel:'EN',
    schemaName:   'Best AI Tools 2026',
    schemaDesc:   'A curated directory of the best AI tools in 2026, covering chatbots, video generators, image generators, writing assistants, coding tools, and audio tools.',
    meta: {
      title:       'AI Tool Compare 2026 | GPT-5.4, Claude Sonnet 4.6, Gemini 3.1 Pro Comparison',
      description: 'Compare the latest AI tools of 2026 at a glance. A professional AI comparison site with daily updates on the performance, ratings, and pricing of GPT-5.4, Claude Sonnet 4.6, Gemini 3.1 Pro, Grok 4.20.',
      keywords:    'ai compare, ai tool comparison, best ai tools 2026, Sora vs Runway, AI tool comparison, AI recommendations',
    },
    nav: { home:'Home', compare:'Compare', blog:'Blog', news:'News' },
    navLinks: { home:'index.html', compare:'compare.html', blog:'blog.html', news:'news.html' },
    hero: {
      h1:          'Find the Perfect AI for You',
      subtitle:    'Compare various AI tools and make the best choice.',
      placeholder: 'e.g., video, image, writing, coding...',
      searchBtn:   'Search',
    },
    filters:     ['All','Chatbot','Video','Image','Writing','Coding','Audio','Productivity'],
    filterLabels:['All','Chatbot','Video','Image','Writing','Coding','Audio','Productivity'],
    sectionTitle:'Featured AI Tools Directory',
    tableHeaders:['Tool Name','Description','Rating','Pricing','Link'],
    visitBtn:    'Visit Site',
    noResult:    'No matching AI tools found.',
    pricingLabels:{ free:'Free', paid:'Paid', freemium:'Freemium' },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        { q:'What is the best AI tool in 2026?',          a:'ChatGPT by OpenAI is rated the best all-around AI tool in 2026 with a 5.0/5 rating, followed closely by Claude Sonnet 4.6 (4.9) and Sora 2 (4.9).' },
        { q:'What is the best free AI tool in 2026?',     a:'The best free AI tools in 2026 are ChatGPT, Claude, Gemini, Perplexity AI, and ElevenLabs — all offer powerful features on their free tier.' },
        { q:'Which AI tool is best for video generation?',a:'Sora by OpenAI (4.9/5) leads for cinematic quality. Runway Gen-4 (4.6/5) offers professional editing control, and HeyGen (4.5/5) is ideal for business avatar videos.' },
        { q:'What is the best AI image generator?',       a:'Midjourney (4.8/5) produces the most artistic results. Leonardo.ai (4.6/5) is great for game assets, and Canva AI (4.6/5) is the easiest for non-designers.' },
        { q:'What is the best AI tool for writing?',      a:'Grammarly (4.5/5) is best for editing and proofreading, Jasper (4.5/5) for marketing content at scale, and Claude (4.9/5) for long-form writing and document analysis.' },
      ]
    },
    footer: { copy:'2026 AI Tool Compare. All rights reserved.', about:'About', contact:'Contact', privacy:'Privacy Policy' },
    footerLinks: { about:'about.html', contact:'contact.html', privacy:'privacy.html' },
    schemaFaq: [
      { q:'What is the best AI tool in 2026?',          a:'ChatGPT by OpenAI is rated the best all-around AI tool in 2026 with a 5.0/5 rating, followed closely by Claude Sonnet 4.6 (4.9) and Sora 2 (4.9).' },
      { q:'What is the best free AI tool in 2026?',     a:'The best free AI tools in 2026 are ChatGPT, Claude, Gemini, Perplexity AI, and ElevenLabs — all offer powerful features on their free tier.' },
      { q:'Which AI tool is best for video generation?',a:'Sora by OpenAI (4.9/5) leads for cinematic quality. Runway Gen-4 (4.6/5) offers professional editing control, and HeyGen (4.5/5) is ideal for business avatar videos.' },
      { q:'What is the best AI image generator?',       a:'Midjourney (4.8/5) produces the most artistic results. Leonardo.ai (4.6/5) is great for game assets, and Canva AI (4.6/5) is the easiest for non-designers.' },
      { q:'What is the best AI tool for writing?',      a:'Grammarly (4.5/5) is best for editing and proofreading, Jasper (4.5/5) for marketing content at scale, and Claude (4.9/5) for long-form writing and document analysis.' },
    ],
  },
  ko: {
    inputJson:    'ai-tools-ko.json',
    outputHtml:   'index-ko.html',
    lang:         'ko',
    siteUrl:      'https://bestaitoolcompare.com/index-ko.html',
    altLangLink:  'index.html',
    altLangLabel: 'EN',
    thisLangLink: 'index-ko.html',
    thisLangLabel:'KO',
    schemaName:   '2026년 최고의 AI 도구',
    schemaDesc:   '2026년 챗봇, 영상 생성, 이미지 생성, 글쓰기, 코딩, 오디오 분야 최고의 AI 도구 디렉토리입니다.',
    meta: {
      title:       'AI 도구 비교 2026 | GPT-5.4, Claude Sonnet 4.6, Gemini 3.1 Pro 비교',
      description: '2026년 최신 AI 도구를 한눈에 비교하세요. Sora, Claude 3.5, Gemini 1.5 Pro의 성능, 평점, 가격을 매일 업데이트하는 전문 AI 비교 사이트입니다.',
      keywords:    'AI 비교, AI 도구 비교, 2026 최고의 AI 도구, Sora vs Runway, AI 도구 추천, 무료 AI',
    },
    nav: { home:'홈', compare:'비교', blog:'블로그', news:'뉴스' },
    navLinks: { home:'index-ko.html', compare:'compare-ko.html', blog:'blog-ko.html', news:'news-ko.html' },
    hero: {
      h1:          '나에게 딱 맞는 AI를 찾아보세요',
      subtitle:    '다양한 AI 도구를 비교하고 최선의 선택을 하세요.',
      placeholder: '예: 영상, 이미지, 글쓰기, 코딩...',
      searchBtn:   '검색',
    },
    filters:     ['All','Chatbot','Video','Image','Writing','Coding','Audio','Productivity'],
    filterLabels:['전체','챗봇','영상','이미지','글쓰기','코딩','오디오','생산성'],
    sectionTitle:'AI 도구 디렉토리',
    tableHeaders:['도구명','설명','평점','가격','링크'],
    visitBtn:    '사이트 방문',
    noResult:    '검색 결과가 없습니다.',
    pricingLabels:{ free:'무료', paid:'유료', freemium:'Freemium' },
    faq: {
      title: '자주 묻는 질문',
      items: [
        { q:'2026년 가장 좋은 AI 도구는 무엇인가요?',         a:'OpenAI의 ChatGPT가 5.0/5 평점으로 2026년 최고의 올라운드 AI 도구로 평가됩니다. Claude(4.9)와 Sora(4.9)가 그 뒤를 잇습니다.' },
        { q:'2026년 최고의 무료 AI 도구는 무엇인가요?',       a:'2026년 최고의 무료 AI 도구는 ChatGPT, Claude, Gemini, Perplexity AI, ElevenLabs입니다. 모두 유료 구독 없이도 강력한 기능을 무료로 제공합니다.' },
        { q:'영상 생성에 가장 좋은 AI 도구는 무엇인가요?',    a:'OpenAI의 Sora(4.9/5)가 영화 수준의 영상 품질로 1위입니다. Runway Gen-4(4.6/5)는 전문 편집에, HeyGen(4.5/5)은 비즈니스 아바타 영상에 최적화되어 있습니다.' },
        { q:'최고의 AI 이미지 생성 도구는 무엇인가요?',       a:'Midjourney(4.8/5)가 예술적 품질에서 압도적 1위입니다. Leonardo.ai(4.6/5)는 게임 에셋에, Canva AI(4.6/5)는 비디자이너에게 가장 쉬운 선택입니다.' },
        { q:'글쓰기에 가장 좋은 AI 도구는 무엇인가요?',       a:'교정·편집에는 Grammarly(4.5/5), 마케팅 콘텐츠 대량 생성에는 Jasper(4.5/5), 장문 글쓰기와 문서 분석에는 Claude(4.9/5)가 최고입니다.' },
      ]
    },
    footer: { copy:'2026 AI Tool Compare. All rights reserved.', about:'소개', contact:'문의', privacy:'개인정보처리방침' },
    footerLinks: { about:'about.html', contact:'contact.html', privacy:'privacy.html' },
    schemaFaq: [
      { q:'2026년 가장 좋은 AI 도구는 무엇인가요?',         a:'OpenAI의 ChatGPT가 5.0/5 평점으로 2026년 최고의 올라운드 AI 도구입니다.' },
      { q:'2026년 최고의 무료 AI 도구는 무엇인가요?',       a:'ChatGPT, Claude, Gemini, Perplexity AI, ElevenLabs 모두 무료 플랜을 제공합니다.' },
      { q:'영상 생성에 가장 좋은 AI 도구는 무엇인가요?',    a:'Sora(4.9/5)가 1위이며, Runway Gen-4(4.6/5)와 HeyGen(4.5/5)이 뒤를 잇습니다.' },
      { q:'최고의 AI 이미지 생성 도구는 무엇인가요?',       a:'Midjourney(4.8/5)가 최고이며, Leonardo.ai(4.6/5)와 Canva AI(4.6/5)가 추천됩니다.' },
      { q:'글쓰기에 가장 좋은 AI 도구는 무엇인가요?',       a:'Grammarly(4.5/5), Jasper(4.5/5), Claude(4.9/5)가 용도별 최고의 글쓰기 AI입니다.' },
    ],
  }
};

// ── 별점 생성 ──────────────────────────────────────────────
function stars(rating) {
  return '⭐'.repeat(Math.round(rating));
}

// ── 가격 태그 HTML 생성 ────────────────────────────────────
function pricingTags(pricing, labels) {
  const lower = pricing.map(p => p.toLowerCase());
  let html = '';
  if (lower.includes('free'))     html += `<span class="tag free-tag">${labels.free}</span>`;
  if (lower.includes('paid'))     html += `<span class="tag paid-tag">${labels.paid}</span>`;
  if (lower.includes('freemium')) html += `<span class="tag freemium-tag">${labels.freemium}</span>`;
  return html;
}

// ── 정적 tbody 행 생성 ────────────────────────────────────
function buildStaticRows(tools, cfg) {
  const categories = ['Chatbot','Video','Image','Writing','Coding','Audio'];
  let html = '';

  categories.forEach(cat => {
    const catTools = tools.filter(t =>
      Array.isArray(t.category) ? t.category.includes(cat) : t.category === cat
    );
    if (catTools.length === 0) return;

    catTools.forEach(tool => {
      html += `
          <tr data-category="${cat}">
            <td data-label="${cfg.tableHeaders[0]}">${tool.name}</td>
            <td data-label="${cfg.tableHeaders[1]}">${tool.description}</td>
            <td data-label="${cfg.tableHeaders[2]}" class="tool-rating">${stars(tool.rating)} ${tool.rating.toFixed(1)}</td>
            <td data-label="${cfg.tableHeaders[3]}">${pricingTags(tool.pricing, cfg.pricingLabels)}</td>
            <td data-label="${cfg.tableHeaders[4]}"><a href="${tool.link}" target="_blank" rel="noopener" class="visit-site-btn">${cfg.visitBtn}</a></td>
          </tr>`;
    });
  });
  return html;
}

// ── JSON-LD ItemList Schema 생성 ──────────────────────────
function buildItemListSchema(tools, cfg) {
  const items = tools.map((tool, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'SoftwareApplication',
      name: tool.name,
      description: tool.description,
      applicationCategory: Array.isArray(tool.category) ? tool.category[0] : tool.category,
      url: tool.link,
      offers: tool.pricing.map(p => ({
        '@type': 'Offer',
        price: p.toLowerCase() === 'free' ? '0' : '',
        priceCurrency: 'USD'
      })),
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: tool.rating.toFixed(1),
        bestRating: '5',
        ratingCount: '1000'
      }
    }
  }));

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: cfg.schemaName,
    description: cfg.schemaDesc,
    url: cfg.siteUrl,
    itemListElement: items
  }, null, 2);
}

// ── JSON-LD FAQ Schema 생성 ──────────────────────────────
function buildFaqSchema(faqItems) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  }, null, 2);
}

// ── FAQ HTML 생성 ─────────────────────────────────────────
function buildFaqHtml(faq) {
  let html = `
<section class="faq-section" aria-label="${faq.title}">
    <h2>${faq.title}</h2>`;
  faq.items.forEach(item => {
    html += `
    <div class="faq-item">
        <button class="faq-question" aria-expanded="false">${item.q}<span class="arrow">▼</span></button>
        <div class="faq-answer">${item.a}</div>
    </div>`;
  });
  html += `\n</section>`;
  return html;
}

// ── 필터 버튼 HTML 생성 ───────────────────────────────────
function buildFilterButtons(filters, labels, cfg) {
  return filters.map((f, i) => {
    const isAll = f === 'All';
    return `<button class="filter-btn${isAll ? ' active' : ''}" onclick="filterByCategory('${f}', event)">${labels[i]}</button>`;
  }).join('\n        ');
}

// ── 전체 HTML 생성 ────────────────────────────────────────
function buildHtml(tools, cfg) {
  const staticRows   = buildStaticRows(tools, cfg);
  const itemSchema   = buildItemListSchema(tools, cfg);
  const faqSchema    = buildFaqSchema(cfg.schemaFaq);
  const faqHtml      = buildFaqHtml(cfg.faq);
  const filterBtns   = buildFilterButtons(cfg.filters, cfg.filterLabels, cfg);
  const isKo         = cfg.lang === 'ko';

  // 카테고리맵 (한글 버전용)
  const categoryMapJs = isKo
    ? `\n    const categoryMap = { '전체':'All','챗봇':'Chatbot','영상':'Video','이미지':'Image','글쓰기':'Writing','코딩':'Coding','오디오':'Audio','생산성':'Productivity' };`
    : `\n    const categoryMap = {};`;

  return `<!DOCTYPE html>
<html lang="${cfg.lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${cfg.meta.title}</title>
    <meta name="description" content="${cfg.meta.description}">
    <meta name="keywords" content="${cfg.meta.keywords}">
    <link rel="stylesheet" href="style.css">
    <link rel="icon" type="image/png" href="favicon.png">

    <script type="application/ld+json">
    ${itemSchema}
    <\/script>

    <script type="application/ld+json">
    ${faqSchema}
    <\/script>

    <style>
        .faq-section { max-width: 900px; margin: 60px auto 0; padding: 0 20px 60px; }
        .faq-section h2 { font-size: 1.6rem; font-weight: 700; margin-bottom: 24px; color: #1a1a2e; }
        .faq-item { border: 1px solid #e5e7eb; border-radius: 10px; margin-bottom: 12px; overflow: hidden; }
        .faq-question { width: 100%; background: #fff; border: none; padding: 18px 20px; text-align: left; font-size: 1rem; font-weight: 600; color: #1a1a2e; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: background 0.2s; }
        .faq-question:hover { background: #f9fafb; }
        .faq-question .arrow { font-size: 0.85rem; transition: transform 0.25s; color: #888; flex-shrink: 0; margin-left: 12px; }
        .faq-question.open .arrow { transform: rotate(180deg); }
        .faq-answer { display: none; padding: 0 20px 18px; font-size: 0.97rem; color: #444; line-height: 1.75; background: #fff; }
        .faq-answer.open { display: block; }
    </style>
</head>
<body>

<header class="site-header">
  <div class="nav-container">
    <a href="${cfg.navLinks.home}" class="logo">AI Tool Compare</a>
    <nav class="nav-links">
      <a href="${cfg.navLinks.home}">${cfg.nav.home}</a>
      <a href="${cfg.navLinks.compare}">${cfg.nav.compare}</a>
      <a href="${cfg.navLinks.blog}">${cfg.nav.blog}</a>
      <a href="${cfg.navLinks.news}">${cfg.nav.news}</a>
    </nav>
    <div class="lang-switch">
      <a href="${cfg.thisLangLink}">${cfg.thisLangLabel}</a> | <a href="${cfg.altLangLink}">${cfg.altLangLabel}</a>
    </div>
  </div>
</header>

<div class="hero-section">
    <h1>${cfg.hero.h1}</h1>
    <p class="subtitle">${cfg.hero.subtitle}</p>
    <div class="search-box">
        <input type="text" id="search-input" placeholder="${cfg.hero.placeholder}">
        <button id="search-btn">${cfg.hero.searchBtn}</button>
    </div>
    <div class="filter-buttons">
        ${filterBtns}
    </div>
</div>

<main class="container">
    <h2 class="section-title">${cfg.sectionTitle}</h2>
    <div class="table-container">
      <table id="tool-table">
        <thead>
          <tr>
            ${cfg.tableHeaders.map(h => `<th>${h}</th>`).join('\n            ')}
          </tr>
        </thead>
        <tbody id="tool-table-body">
${staticRows}
        </tbody>
      </table>
    </div>
</main>

${faqHtml}

<footer>
    <div class="footer-content">
        <p>&copy; ${cfg.footer.copy}</p>
        <nav>
            <a href="${cfg.footerLinks.about}">${cfg.footer.about}</a>
            <a href="${cfg.footerLinks.contact}">${cfg.footer.contact}</a>
            <a href="${cfg.footerLinks.privacy}">${cfg.footer.privacy}</a>
        </nav>
    </div>
</footer>

<script>
    let allTools = [];
    let currentCategory = 'All';
    let usingStaticFallback = false;
    ${categoryMapJs}

    async function fetchTools() {
        try {
            const response = await fetch('${cfg.inputJson}');
            allTools = await response.json();
            render();
        } catch (error) {
            console.warn('${cfg.inputJson} not found — using static HTML table.');
            usingStaticFallback = true;
        }
    }

    function displayFilteredTools(filteredTools) {
        const tableBody = document.getElementById('tool-table-body');
        tableBody.innerHTML = '';
        if (filteredTools.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='5' style='text-align:center;padding:20px;'>${cfg.noResult}</td></tr>";
            return;
        }
        filteredTools.forEach(tool => {
            const row = document.createElement('tr');
            const lower = tool.pricing.map(p => p.toLowerCase());
            let tags = '';
            if (lower.includes('free'))     tags += '<span class="tag free-tag">${cfg.pricingLabels.free}</span>';
            if (lower.includes('paid'))     tags += '<span class="tag paid-tag">${cfg.pricingLabels.paid}</span>';
            if (lower.includes('freemium')) tags += '<span class="tag freemium-tag">${cfg.pricingLabels.freemium}</span>';
            row.innerHTML = \`
                <td data-label="${cfg.tableHeaders[0]}">\${tool.name}</td>
                <td data-label="${cfg.tableHeaders[1]}">\${tool.description}</td>
                <td data-label="${cfg.tableHeaders[2]}" class="tool-rating">\${'⭐'.repeat(Math.round(tool.rating))} \${tool.rating.toFixed(1)}</td>
                <td data-label="${cfg.tableHeaders[3]}">\${tags}</td>
                <td data-label="${cfg.tableHeaders[4]}"><a href="\${tool.link}" target="_blank" rel="noopener" class="visit-site-btn">${cfg.visitBtn}</a></td>
            \`;
            tableBody.appendChild(row);
        });
    }

    function filterStaticRows(query = '') {
        const tableBody = document.getElementById('tool-table-body');
        const rows = tableBody.querySelectorAll('tr[data-category]');
        const lowerQuery = query.toLowerCase();
        let count = 0;
        rows.forEach(row => {
            const catMatch = currentCategory === 'All' || row.dataset.category === currentCategory;
            const queryMatch = !lowerQuery || row.textContent.toLowerCase().includes(lowerQuery);
            row.style.display = (catMatch && queryMatch) ? '' : 'none';
            if (catMatch && queryMatch) count++;
        });
        const existing = tableBody.querySelector('.no-result-row');
        if (count === 0 && !existing) {
            const nr = document.createElement('tr');
            nr.className = 'no-result-row';
            nr.innerHTML = "<td colspan='5' style='text-align:center;padding:20px;'>${cfg.noResult}</td>";
            tableBody.appendChild(nr);
        } else if (count > 0 && existing) existing.remove();
    }

    function render(query = '') {
        if (usingStaticFallback) { filterStaticRows(query); return; }
        let filtered = allTools;
        if (currentCategory !== 'All') {
            filtered = filtered.filter(t => {
                if (!t.category) return false;
                const cats = Array.isArray(t.category) ? t.category : [t.category];
                return cats.map(c => c.toLowerCase()).includes(currentCategory.toLowerCase());
            });
        }
        const q = query.toLowerCase();
        if (q) {
            filtered = filtered.filter(t => {
                const kw = (t.keywords || []).map(k => k.toLowerCase());
                return t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || kw.some(k => k.includes(q));
            });
        }
        displayFilteredTools(filtered);
    }

    function filterByCategory(category, event) {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        event.target.classList.add('active');
        currentCategory = categoryMap[category] || category;
        render(document.getElementById('search-input').value);
    }

    document.getElementById('search-btn').addEventListener('click', () => render(document.getElementById('search-input').value));
    document.getElementById('search-input').addEventListener('keyup', e => { if (e.key === 'Enter') render(e.target.value); });

    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const isOpen = btn.classList.toggle('open');
            btn.nextElementSibling.classList.toggle('open', isOpen);
            btn.setAttribute('aria-expanded', isOpen);
        });
    });

    fetchTools();
<\/script>
</body>
</html>`;
}

// ── 메인 실행 ─────────────────────────────────────────────
function build(cfgKey) {
  const cfg = CONFIG[cfgKey];
  const jsonPath = path.join(__dirname, cfg.inputJson);

  if (!fs.existsSync(jsonPath)) {
    console.error(`❌  ${cfg.inputJson} 파일을 찾을 수 없습니다.`);
    return;
  }

  const tools = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const html  = buildHtml(tools, cfg);
  fs.writeFileSync(path.join(__dirname, cfg.outputHtml), html, 'utf8');
  console.log(`✅  ${cfg.outputHtml} 생성 완료 (도구 ${tools.length}개)`);
}

build('en');
build('ko');
console.log('\n🎉  빌드 완료! index.html 과 index-ko.html 을 서버에 업로드하세요.');
