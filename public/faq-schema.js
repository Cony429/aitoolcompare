/**
 * faq-schema.js
 * 블로그 포스트 페이지에 FAQ Schema를 자동 생성·주입합니다.
 * 페이지 내 <h3> + <p> 패턴을 읽어서 FAQPage JSON-LD를 만들고
 * <head>에 <script type="application/ld+json">으로 삽입합니다.
 *
 * 사용법: 모든 blog 포스트 HTML의 </body> 앞에 추가
 *   <script src="faq-schema.js"></script>
 */

(function () {
  'use strict';

  /* ── FAQ 섹션 탐지 ── */
  function buildFAQSchema() {
    const faqs = [];

    // 방법 1: class="faq-*" 마크업이 있는 경우
    const faqItems = document.querySelectorAll('.faq-item, [data-faq]');
    if (faqItems.length) {
      faqItems.forEach(item => {
        const q = item.querySelector('.faq-q, h3, dt')?.textContent.trim();
        const a = item.querySelector('.faq-a, p, dd')?.textContent.trim();
        if (q && a) faqs.push({ q, a });
      });
    }

    // 방법 2: "Q." / "Q:" 로 시작하는 패턴
    if (!faqs.length) {
      document.querySelectorAll('p, h3, h4').forEach(el => {
        const text = el.textContent.trim();
        if (/^(Q\.|Q:|FAQ|질문\.|Q )/.test(text)) {
          const answer = el.nextElementSibling;
          if (answer) {
            faqs.push({
              q: text.replace(/^(Q\.|Q:|FAQ|질문\.)\s*/i, ''),
              a: answer.textContent.trim()
            });
          }
        }
      });
    }

    // 방법 3: <h2>자주 묻는 질문 / FAQ</h2> 섹션 아래 h3+p 패턴
    if (!faqs.length) {
      const headings = document.querySelectorAll('h2, h3');
      headings.forEach(h => {
        const isFAQ = /(FAQ|자주|frequently|questions)/i.test(h.textContent);
        if (!isFAQ) return;

        let sibling = h.nextElementSibling;
        while (sibling) {
          if (sibling.tagName === 'H2') break; // 다음 섹션 시작
          if (sibling.tagName === 'H3' || sibling.tagName === 'H4') {
            const q = sibling.textContent.trim();
            const ans = sibling.nextElementSibling;
            if (ans && ans.tagName === 'P') {
              faqs.push({ q, a: ans.textContent.trim() });
            }
          }
          sibling = sibling.nextElementSibling;
        }
      });
    }

    // 방법 4: 포스트 내 모든 h3 + 바로 다음 p (FAQ 섹션 없이도)
    if (!faqs.length) {
      const h3s = document.querySelectorAll('.post-wrap h3, article h3');
      h3s.forEach(h3 => {
        const next = h3.nextElementSibling;
        if (next && next.tagName === 'P') {
          faqs.push({ q: h3.textContent.trim(), a: next.textContent.trim() });
        }
      });
    }

    return faqs.slice(0, 8); // Google은 FAQ 최대 ~8개를 권장
  }

  /* ── Schema 주입 ── */
  function injectSchema(faqs) {
    if (!faqs.length) return;

    // 이미 FAQPage Schema가 있으면 스킵
    const existing = document.querySelectorAll('script[type="application/ld+json"]');
    for (const s of existing) {
      try {
        if (JSON.parse(s.textContent)['@type'] === 'FAQPage') return;
      } catch {}
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(({ q, a }) => ({
        "@type": "Question",
        "name": q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": a.substring(0, 500) // 500자 제한
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  /* ── Article Schema 보완 ── */
  function patchArticleSchema() {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    scripts.forEach(s => {
      try {
        const data = JSON.parse(s.textContent);
        if (data['@type'] === 'Article' || data['@type'] === 'BlogPosting') {
          let updated = false;

          // dateModified 없으면 추가
          if (!data.dateModified) {
            data.dateModified = new Date().toISOString().split('T')[0];
            updated = true;
          }

          // image 없으면 OG 이미지에서 추출
          if (!data.image) {
            const ogImg = document.querySelector('meta[property="og:image"]');
            if (ogImg) {
              data.image = ogImg.content;
              updated = true;
            }
          }

          // author 없으면 추가
          if (!data.author) {
            data.author = { "@type": "Organization", "name": "AI Tool Compare" };
            updated = true;
          }

          // wordCount 추가
          if (!data.wordCount) {
            const articleEl = document.querySelector('.post-wrap, article, main');
            if (articleEl) {
              data.wordCount = articleEl.textContent.trim().split(/\s+/).length;
              updated = true;
            }
          }

          if (updated) s.textContent = JSON.stringify(data);
        }
      } catch {}
    });
  }

  /* ── BreadcrumbList Schema 추가 ── */
  function injectBreadcrumb() {
    // 이미 있으면 스킵
    const existing = [...document.querySelectorAll('script[type="application/ld+json"]')];
    if (existing.some(s => { try { return JSON.parse(s.textContent)['@type'] === 'BreadcrumbList'; } catch { return false; } })) return;

    const path = location.pathname;
    const isKo = document.documentElement.lang === 'ko';
    const items = [
      { "@type": "ListItem", "position": 1, "name": "AI Tool Compare", "item": "https://bestaitoolcompare.com/" }
    ];

    if (path.includes('blog')) {
      items.push({ "@type": "ListItem", "position": 2, "name": isKo ? "블로그" : "Blog", "item": `https://bestaitoolcompare.com/blog${isKo ? '-ko' : ''}.html` });
    } else if (path.includes('compare')) {
      items.push({ "@type": "ListItem", "position": 2, "name": isKo ? "비교" : "Compare", "item": `https://bestaitoolcompare.com/compare${isKo ? '-ko' : ''}.html` });
    }

    // 현재 페이지
    const pageTitle = document.title.split('|')[0].trim();
    if (items.length > 1) {
      items.push({ "@type": "ListItem", "position": items.length + 1, "name": pageTitle });
    }

    if (items.length < 2) return;

    const schema = { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": items };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  /* ── 실행 ── */
  const faqs = buildFAQSchema();
  injectSchema(faqs);
  patchArticleSchema();
  injectBreadcrumb();

  /* ── 개발자용 로그 (배포 시 제거 가능) ── */
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    console.log('[faq-schema.js]', faqs.length, 'FAQ items injected');
  }

})();
