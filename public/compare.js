document.addEventListener('DOMContentLoaded', () => {
    const compareBtn = document.querySelector('#compare-btn') || document.querySelector('button');
    const tool1Select = document.querySelector('#tool1') || document.querySelectorAll('select')[0];
    const tool2Select = document.querySelector('#tool2') || document.querySelectorAll('select')[1];
    
    // 결과가 출력될 공간 생성 (없으면 만듦)
    let resultContainer = document.querySelector('#comparison-result');
    if (!resultContainer) {
        resultContainer = document.createElement('div');
        resultContainer.id = 'comparison-result';
        resultContainer.style.marginTop = '30px';
        document.querySelector('.comparison-builder').appendChild(resultContainer);
    }

    compareBtn.addEventListener('click', () => {
        const t1 = tool1Select.value;
        const t2 = tool2Select.value;

        if (!t1 || !t2 || t1 === t2) {
            alert("Please select two different tools to compare!");
            return;
        }

        // 화면에 알림창 대신 표(Table)를 그립니다.
        resultContainer.innerHTML = `
            <div style="background: white; padding: 20px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); animation: fadeIn 0.5s;">
                <h3 style="text-align:center; color:#007bff; margin-bottom:20px;">Comparison Result</h3>
                <table style="width: 100%; border-collapse: collapse; text-align: left;">
                    <tr style="border-bottom: 2px solid #eee;">
                        <th style="padding: 12px;">Feature</th>
                        <th style="padding: 12px; color: #ff4757;">${t1}</th>
                        <th style="padding: 12px; color: #007bff;">${t2}</th>
                    </tr>
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 12px; font-weight: bold;">Category</td>
                        <td style="padding: 12px;">AI Model</td>
                        <td style="padding: 12px;">AI Model</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 12px; font-weight: bold;">Performance</td>
                        <td style="padding: 12px;">⭐⭐⭐⭐⭐</td>
                        <td style="padding: 12px;">⭐⭐⭐⭐⭐</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; font-weight: bold;">Main Use Case</td>
                        <td style="padding: 12px;">Creative Content</td>
                        <td style="padding: 12px;">Professional Tasks</td>
                    </tr>
                </table>
                <p style="margin-top:20px; font-size: 0.9rem; color: #777; text-align:center;">* Specific data is being updated based on the latest 2026 models.</p>
            </div>
        `;
    });
});

// 페이드인 애니메이션 효과
const style = document.createElement('style');
style.innerHTML = `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`;
document.head.appendChild(style);