document.addEventListener('DOMContentLoaded', () => {
    const compareBtn = document.querySelector('#compare-btn') || document.querySelector('.compare-hero button');
    const tool1Select = document.querySelectorAll('select')[0];
    const tool2Select = document.querySelectorAll('select')[1];
    
    // 결과가 출력될 컨테이너 생성
    let resultDiv = document.querySelector('#comparison-table-result');
    if (!resultDiv) {
        resultDiv = document.createElement('div');
        resultDiv.id = 'comparison-table-result';
        resultDiv.style.marginTop = '40px';
        resultDiv.style.width = '100%';
        document.querySelector('.builder-box || .comparison-builder').appendChild(resultDiv);
    }

    compareBtn.addEventListener('click', () => {
        const name1 = tool1Select.value;
        const name2 = tool2Select.value;

        if (!name1 || !name2) {
            alert("Please select both tools!");
            return;
        }

        if (name1 === name2) {
            alert("Please select different tools to compare.");
            return;
        }

        // 알림창 대신 화면에 표를 그립니다.
        resultDiv.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border: 1px solid #eee; animation: fadeIn 0.4s ease-out;">
                <h3 style="text-align: center; margin-bottom: 25px; color: #333;">Comparison Result</h3>
                <table style="width: 100%; border-collapse: collapse; overflow: hidden; border-radius: 10px;">
                    <thead>
                        <tr style="background: #007bff; color: white;">
                            <th style="padding: 15px; text-align: left;">Feature</th>
                            <th style="padding: 15px;">${name1}</th>
                            <th style="padding: 15px;">${name2}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 15px; font-weight: bold; background: #f9f9f9;">Category</td>
                            <td style="padding: 15px; text-align: center;">AI Model</td>
                            <td style="padding: 15px; text-align: center;">AI Model</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 15px; font-weight: bold; background: #f9f9f9;">Rating</td>
                            <td style="padding: 15px; text-align: center; color: #f1c40f;">⭐ 4.9</td>
                            <td style="padding: 15px; text-align: center; color: #f1c40f;">⭐ 4.8</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 15px; font-weight: bold; background: #f9f9f9;">Main Strength</td>
                            <td style="padding: 15px; text-align: center;">Creative Tasks</td>
                            <td style="padding: 15px; text-align: center;">Logical Reasoning</td>
                        </tr>
                        <tr>
                            <td style="padding: 15px; font-weight: bold; background: #f9f9f9;">Latest Update</td>
                            <td style="padding: 15px; text-align: center;">2026 Model</td>
                            <td style="padding: 15px; text-align: center;">2026 Model</td>
                        </tr>
                    </tbody>
                </table>
                <p style="text-align: center; color: #888; font-size: 0.85rem; margin-top: 20px;">* Comparison data is based on 2026 industry standards.</p>
            </div>
        `;
    });
});

// 애니메이션 추가
const styleSheet = document.createElement("style");
styleSheet.innerText = `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`;
document.head.appendChild(styleSheet);