/**
 * search-enhanced.js
 * 자동완성 + 키보드 네비게이션 + 태그 클릭 + 최근 검색 기록
 * index.html / index-ko.html 의 </body> 앞에 추가
 */

(function () {
  'use strict';

  /* ── 상수 ── */
  const STORAGE_KEY = 'aitc_recent_searches';
  const MAX_RECENT  = 5;
  const DEBOUNCE_MS = 180;

  /* ── 요소 참조 ── */
  const searchInput  = document.querySelector('.search-box input');
  const searchBtn    = document.querySelector('.search-box button');
  const filterBtns   = document.querySelectorAll('.filter-btn');

  if (!searchInput) return;

  /* ── 자동완성 드롭다운 생성 ── */
  const dropdown = document.createElement('ul');
  dropdown.id = 'search-dropdown';
  Object.assign(dropdown.style, {
    position: 'absolute', top: '100%', left: '0', right: '0',
    background: '#fff', border: '1px solid #e5e7eb',
    borderRadius: '12px', margin: '6px 0 0', padding: '6px 0',
    listStyle: 'none', boxShadow: '0 8px 24px rgba(0,0,0,.1)',
    zIndex: '9999', display: 'none', maxHeight: '320px',
    overflowY: 'auto'
  });
  searchInput.parentElement.style.position = 'relative';
  searchInput.parentElement.appendChild(dropdown);

  /* ── 최근 검색 저장/로드 ── */
  function getRecent() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }
  function saveRecent(q) {
    if (!q.trim()) return;
    let list = getRecent().filter(x => x.toLowerCase() !== q.toLowerCase());
    list.unshift(q.trim());
    list = list.slice(0, MAX_RECENT);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch {}
  }

  /* ── 드롭다운 렌더 ── */
  let activeIdx = -1;

  function renderDropdown(items, type) {
    dropdown.innerHTML = '';
    activeIdx = -1;
    if (!items.length) { dropdown.style.display = 'none'; return; }

    if (type === 'recent') {
      const header = document.createElement('li');
      header.textContent = searchInput.closest('[lang="ko"]') || document.documentElement.lang === 'ko'
        ? '최근 검색' : 'Recent searches';
      Object.assign(header.style, {
        padding: '6px 16px 4px', fontSize: '.72rem', fontWeight: '700',
        letterSpacing: '.08em', textTransform: 'uppercase', color: '#aaa',
        cursor: 'default'
      });
      dropdown.appendChild(header);
    }

    items.forEach((item, i) => {
      const li = document.createElement('li');
      li.textContent = (type === 'recent' ? '🕐  ' : '') + (item.name || item);
      Object.assign(li.style, {
        padding: '10px 16px', cursor: 'pointer', fontSize: '.95rem',
        color: '#333', display: 'flex', alignItems: 'center', gap: '6px',
        transition: 'background .12s'
      });
      li.addEventListener('mouseenter', () => {
        clearActive();
        li.style.background = '#f0f7ff';
        activeIdx = i;
      });
      li.addEventListener('mouseleave', () => { li.style.background = ''; });
      li.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const val = item.name || item;
        searchInput.value = val;
        saveRecent(val);
        dropdown.style.display = 'none';
        triggerSearch(val);
      });
      dropdown.appendChild(li);
    });

    dropdown.style.display = 'block';
  }

  function clearActive() {
    dropdown.querySelectorAll('li:not(:first-child)').forEach(li => {
      li.style.background = '';
    });
  }

  /* ── 검색 트리거 ── */
  function triggerSearch(query) {
    const q = (query || searchInput.value).trim().toLowerCase();
    const rows = document.querySelectorAll('#tool-table tbody tr, .tool-card');
    let visibleCount = 0;

    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      const show = !q || text.includes(q);
      row.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    // 결과 없음 메시지
    let noResult = document.getElementById('no-search-result');
    if (visibleCount === 0 && q) {
      if (!noResult) {
        noResult = document.createElement('p');
        noResult.id = 'no-search-result';
        noResult.style.cssText = 'text-align:center;padding:40px;color:#888;font-size:1rem;';
        const tableWrap = document.querySelector('.table-container, #tool-table');
        if (tableWrap) tableWrap.parentNode.insertBefore(noResult, tableWrap.nextSibling);
      }
      const lang = document.documentElement.lang;
      noResult.textContent = lang === 'ko'
        ? `"${q}"에 대한 결과가 없습니다.`
        : `No results found for "${q}".`;
      noResult.style.display = 'block';
    } else if (noResult) {
      noResult.style.display = 'none';
    }
  }

  /* ── 자동완성 데이터 로드 ── */
  let toolsData = [];
  fetch('ai-tools.json')
    .then(r => r.json())
    .then(data => { toolsData = data; })
    .catch(() => {});

  /* ── 디바운스 ── */
  let debounceTimer;
  function debounce(fn, ms) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(fn, ms);
  }

  /* ── 입력 이벤트 ── */
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    debounce(() => {
      if (!q) {
        const recent = getRecent();
        recent.length ? renderDropdown(recent, 'recent') : dropdown.style.display = 'none';
        triggerSearch('');
        return;
      }
      const matches = toolsData
        .filter(t => t.name.toLowerCase().includes(q) ||
                     (t.keywords && t.keywords.some(k => k.includes(q))))
        .slice(0, 6);
      renderDropdown(matches, 'match');
      triggerSearch(q);
    }, DEBOUNCE_MS);
  });

  /* ── 포커스: 최근 검색 표시 ── */
  searchInput.addEventListener('focus', () => {
    if (!searchInput.value.trim()) {
      const recent = getRecent();
      if (recent.length) renderDropdown(recent, 'recent');
    }
  });

  /* ── 키보드 네비게이션 ── */
  searchInput.addEventListener('keydown', (e) => {
    const items = [...dropdown.querySelectorAll('li:not([style*="cursor: default"])')];
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIdx = Math.min(activeIdx + 1, items.length - 1);
      items.forEach((li, i) => { li.style.background = i === activeIdx ? '#f0f7ff' : ''; });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIdx = Math.max(activeIdx - 1, 0);
      items.forEach((li, i) => { li.style.background = i === activeIdx ? '#f0f7ff' : ''; });
    } else if (e.key === 'Enter') {
      if (activeIdx >= 0 && items[activeIdx]) {
        items[activeIdx].dispatchEvent(new MouseEvent('mousedown'));
      } else {
        saveRecent(searchInput.value);
        dropdown.style.display = 'none';
        triggerSearch();
      }
    } else if (e.key === 'Escape') {
      dropdown.style.display = 'none';
    }
  });

  /* ── 검색 버튼 ── */
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      saveRecent(searchInput.value);
      dropdown.style.display = 'none';
      triggerSearch();
    });
  }

  /* ── 외부 클릭 시 드롭다운 닫기 ── */
  document.addEventListener('click', (e) => {
    if (!searchInput.parentElement.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });

  /* ══════════════════════════════════════
     필터 버튼 — 즉각 반응 + URL 해시 동기화
     ══════════════════════════════════════ */
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.filter || btn.textContent.trim();
      filterByCategory(cat);

      // URL 해시 업데이트 (뒤로가기 지원)
      history.replaceState(null, '', '#' + encodeURIComponent(cat));

      // 검색창 초기화
      searchInput.value = '';
      triggerSearch('');
    });
  });

  function filterByCategory(cat) {
    const rows = document.querySelectorAll('#tool-table tbody tr');
    const lang = document.documentElement.lang;

    // 언어별 "All" 레이블 처리
    const isAll = cat === 'All' || cat === '전체';

    rows.forEach(row => {
      if (isAll) { row.style.display = ''; return; }

      // data-category 속성 우선, 없으면 텍스트로 찾기
      const rowCat = row.dataset.category || row.querySelector('td:nth-child(2)')?.textContent || '';
      row.style.display = rowCat.includes(cat) ? '' : 'none';
    });
  }

  /* ── 페이지 로드 시 URL 해시 복원 ── */
  if (location.hash) {
    const cat = decodeURIComponent(location.hash.slice(1));
    const matchBtn = [...filterBtns].find(b =>
      (b.dataset.filter || b.textContent.trim()) === cat
    );
    if (matchBtn) matchBtn.click();
  }

  /* ══════════════════════════════════════
     카테고리 카드 링크 추가
     (홈페이지 필터 버튼 → SEO 카테고리 페이지)
     ══════════════════════════════════════ */
  const CAT_PAGE_MAP = {
    'Chatbot':      'best-chatbot-ai-2026.html',
    'Image':        'best-image-ai-2026.html',
    'Video':        'best-video-ai-2026.html',
    'Writing':      'best-writing-ai-2026.html',
    'Coding':       'best-coding-ai-2026.html',
    'Audio':        'best-audio-ai-2026.html',
    '챗봇':         'best-chatbot-ai-2026-ko.html',
    '이미지':       'best-image-ai-2026-ko.html',
    '영상':         'best-video-ai-2026-ko.html',
    '글쓰기':       'best-writing-ai-2026-ko.html',
    '코딩':         'best-coding-ai-2026-ko.html',
    '오디오':       'best-audio-ai-2026-ko.html',
  };

  filterBtns.forEach(btn => {
    const label = btn.dataset.filter || btn.textContent.trim();
    const page  = CAT_PAGE_MAP[label];
    if (!page) return;

    // "전체 보기" 링크 아이콘 추가
    const link = document.createElement('a');
    link.href = page;
    link.title = `View all ${label} tools`;
    link.style.cssText = 'margin-left:4px;font-size:.7rem;color:inherit;opacity:.65;text-decoration:none;vertical-align:middle';
    link.textContent = '↗';
    link.addEventListener('click', e => e.stopPropagation()); // 필터 클릭과 분리
    btn.appendChild(link);
  });

})();
