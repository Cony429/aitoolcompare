#!/usr/bin/env python3
# =====================================================
# apply_patch.py
# index.html 과 index-ko.html 에 두 가지 수정 적용
# 사용법: python3 apply_patch.py
# (index.html, index-ko.html 과 같은 폴더에서 실행)
# =====================================================
import os, sys

patches = {
    'index.html': [
        # [1] 헤더 로고 — 파비콘 이미지 추가
        (
            '<a href="index.html" class="logo">AI Tool Compare</a>',
            '<a href="index.html" class="logo" style="display:flex;align-items:center;gap:10px;text-decoration:none;">\n      <img src="favicon.png" alt="Logo" style="width:32px;height:32px;border-radius:6px;object-fit:contain;">\n      <span style="font-size:1.4rem;font-weight:800;color:#1a1a2e;">AI Tool Compare</span>\n    </a>'
        ),
        # [2] 푸터 — privacy.html → privacy-policy.html + Terms of Service 추가
        (
            '<a href="privacy.html">Privacy Policy</a>',
            '<a href="privacy-policy.html">Privacy Policy</a>\n            <a href="terms.html">Terms of Service</a>'
        ),
    ],
    'index-ko.html': [
        # [1] 헤더 로고 — 파비콘 이미지 추가
        (
            '<a href="index-ko.html" class="logo">AI Tool Compare</a>',
            '<a href="index-ko.html" class="logo" style="display:flex;align-items:center;gap:10px;text-decoration:none;">\n      <img src="favicon.png" alt="로고" style="width:32px;height:32px;border-radius:6px;object-fit:contain;">\n      <span style="font-size:1.4rem;font-weight:800;color:#1a1a2e;">AI Tool Compare</span>\n    </a>'
        ),
        # [2] 푸터 — 링크 KO 버전으로 수정 + 이용약관 추가
        (
            '<a href="about.html">소개</a>\n            <a href="contact.html">문의</a>\n            <a href="privacy.html">개인정보처리방침</a>',
            '<a href="about-ko.html">소개</a>\n            <a href="contact-ko.html">문의</a>\n            <a href="privacy-policy-ko.html">개인정보처리방침</a>\n            <a href="terms-ko.html">이용약관</a>'
        ),
    ],
}

for filename, changes in patches.items():
    if not os.path.exists(filename):
        print(f"⚠️  파일 없음: {filename} — 건너뜀")
        continue

    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    errors = []

    for i, (old, new) in enumerate(changes, 1):
        if old not in content:
            errors.append(f"  변경 {i}: 대상 문자열을 찾을 수 없음")
            errors.append(f"    찾는 문자열: {old[:80]}")
        else:
            content = content.replace(old, new, 1)
            print(f"  ✅ [{filename}] 변경 {i} 적용 완료")

    if errors:
        for e in errors:
            print(e)
        print(f"  ❌ [{filename}] 일부 변경 실패 — 파일 저장 안 함")
        continue

    # 백업 생성
    backup = filename + '.bak'
    with open(backup, 'w', encoding='utf-8') as f:
        f.write(original)
    print(f"  💾 백업 저장: {backup}")

    # 수정본 저장
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  ✅ [{filename}] 저장 완료\n")

print("\n모든 패치 완료!")
