
document.addEventListener('DOMContentLoaded', () => {
    const aiData = {
        'chatgpt': {
            name: 'ChatGPT',
            category: 'Chatbot',
            core_strength: 'Advanced reasoning and wide knowledge base.',
            use_case: 'Content creation, coding, complex problem-solving.',
            pricing: 'Freemium, with a $20/month Plus plan.'
        },
        'claude': {
            name: 'Claude',
            category: 'Chatbot',
            core_strength: 'Focus on safety and handling large documents.',
            use_case: 'Summarizing long texts, nuanced conversation.',
            pricing: 'API access, with a free tier.'
        },
        'gemini': {
            name: 'Gemini',
            category: 'Chatbot',
            core_strength: 'Google\'s versatile multimodal AI.',
            use_case: 'Cross-modal tasks, creative generation, research.',
            pricing: 'Free access, with paid API tiers.'
        },
        'midjourney': {
            name: 'Midjourney',
            category: 'Image Generation',
            core_strength: 'Highly artistic and photorealistic results.',
            use_case: 'Creating digital art, concept design.',
            pricing: 'Subscription-based, starting at $10/month.'
        },
        'dalle3': {
            name: 'DALL-E 3',
            category: 'Image Generation',
            core_strength: 'Natively integrated with ChatGPT Plus.',
            use_case: 'Easy to use with natural language prompts.',
            pricing: 'Included with ChatGPT Plus subscription.'
        },
         'runway': {
            name: 'Runway',
            category: 'Video Generation',
            core_strength: 'AI-powered video editing & generation.',
            use_case: 'Text-to-video, video editing, special effects.',
            pricing: 'Freemium with tiered subscription plans.'
        }
    };

    const tool1Select = document.getElementById('tool1-select');
    const tool2Select = document.getElementById('tool2-select');
    const compareBtn = document.getElementById('compare-btn');
    const comparisonResult = document.getElementById('comparison-result');
    const headerRow = document.getElementById('comparison-header-row');
    const comparisonBody = document.getElementById('comparison-body');

    // Populate dropdowns
    for (const key in aiData) {
        const option1 = new Option(aiData[key].name, key);
        const option2 = new Option(aiData[key].name, key);
        tool1Select.add(option1);
        tool2Select.add(option2);
    }
    tool2Select.value = Object.keys(aiData)[1]; // Set a default different value

    compareBtn.addEventListener('click', () => {
        const tool1Key = tool1Select.value;
        const tool2Key = tool2Select.value;

        if (tool1Key === tool2Key) {
            alert('Please select two different tools to compare.');
            return;
        }

        const tool1 = aiData[tool1Key];
        const tool2 = aiData[tool2Key];

        // Clear previous results
        headerRow.innerHTML = '<th>Feature</th>';
        comparisonBody.innerHTML = '';

        // Set table headers
        const th1 = document.createElement('th');
        th1.textContent = tool1.name;
        headerRow.appendChild(th1);

        const th2 = document.createElement('th');
        th2.textContent = tool2.name;
        headerRow.appendChild(th2);

        // Create rows for each feature
        const features = ['category', 'core_strength', 'use_case', 'pricing'];
        features.forEach(feature => {
            const row = document.createElement('tr');
            const featureCell = document.createElement('td');
            featureCell.className = 'feature-name';
            featureCell.textContent = feature.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
            row.appendChild(featureCell);

            const tool1Cell = document.createElement('td');
            tool1Cell.textContent = tool1[feature];
            row.appendChild(tool1Cell);

            const tool2Cell = document.createElement('td');
            tool2Cell.textContent = tool2[feature];
            row.appendChild(tool2Cell);

            comparisonBody.appendChild(row);
        });

        comparisonResult.style.display = 'block';
    });
});
