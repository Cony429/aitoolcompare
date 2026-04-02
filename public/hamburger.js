/* hamburger.js — 모든 HTML 페이지 </body> 직전에 <script src="hamburger.js"></script> 추가 */

(function () {
  /* ── 1. 헤더에 햄버거 버튼 + 모바일 메뉴 자동 삽입 ── */
  const header = document.querySelector('.site-header');
  const navContainer = document.querySelector('.nav-container');
  const navLinks = document.querySelector('.nav-links');
  const langSwitch = document.querySelector('.lang-switch');

  if (!header || !navContainer || !navLinks) return;

  /* 햄버거 버튼 */
  const btn = document.createElement('button');
  btn.className = 'hamburger';
  btn.setAttribute('aria-label', '메뉴 열기');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span></span><span></span><span></span>';
  navContainer.appendChild(btn);

  /* 모바일 메뉴 패널 — nav-links 내용 복사 */
  const mobileNav = document.createElement('nav');
  mobileNav.className = 'mobile-nav';

  /* 링크 복사 */
  navLinks.querySelectorAll('a').forEach(function (a) {
    const clone = a.cloneNode(true);
    mobileNav.appendChild(clone);
  });

  /* 언어 전환 복사 */
  if (langSwitch) {
    const langRow = document.createElement('div');
    langRow.className = 'mobile-lang';
    langRow.innerHTML = langSwitch.innerHTML;
    mobileNav.appendChild(langRow);
  }

  header.appendChild(mobileNav);

  /* ── 2. 토글 동작 ── */
  btn.addEventListener('click', function () {
    const isOpen = mobileNav.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
    btn.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  /* 메뉴 바깥 클릭 시 닫기 */
  document.addEventListener('click', function (e) {
    if (!header.contains(e.target)) {
      mobileNav.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  /* 메뉴 링크 클릭 시 닫기 */
  mobileNav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* 화면 커지면 자동 닫기 */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      mobileNav.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  /* ── 3. 테이블 스크롤 힌트 자동 삽입 ── */
  const tableContainer = document.querySelector('.table-container');
  if (tableContainer) {
    const hint = document.createElement('p');
    hint.className = 'table-scroll-hint';
    hint.textContent = '← 좌우로 스크롤하세요';
    tableContainer.parentNode.insertBefore(hint, tableContainer);

    /* 480px 이하에서만 보이도록 */
    function toggleHint() {
      hint.style.display = window.innerWidth <= 480 ? 'block' : 'none';
    }
    toggleHint();
    window.addEventListener('resize', toggleHint);
  }
})();
