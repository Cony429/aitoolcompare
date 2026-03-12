'''
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const toolCards = document.querySelectorAll('.tool-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.textContent.toLowerCase();

            toolCards.forEach(card => {
                const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
                if (filter === 'all' || tags.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    const aiTools = [
        { name: "ChatGPT", category: "Chatbot", rating: 5, feature: "Advanced conversational AI", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=40" },
        { name: "Midjourney", category: "Image Generation", rating: 4, feature: "Artistic and high-quality visuals", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=40" },
        { name: "Jasper", category: "Writing Assistant", rating: 4, feature: "Content creation for marketing", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=40" },
        { name: "Gemini", category: "Chatbot", rating: 4, feature: "Google's versatile multimodal AI", image: "https://images.unsplash.com/photo-1675271591211-126ad94e495d?w=40" },
        { name: "Runway", category: "Video Generation", rating: 4, feature: "AI-powered video editing & generation", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=40" },
        { name: "DALL-E 3", category: "Image Generation", rating: 4, feature: "Integrated with ChatGPT for easy use", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=40" },
        { name: "Copy.ai", category: "Writing Assistant", rating: 4, feature: "Generates high-quality marketing copy", image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=40" },
        { name: "Perplexity AI", category: "Chatbot", rating: 4, feature: "Conversational search engine", image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=40" },
        { name: "Sora", category: "Video Generation", rating: 5, feature: "Generates realistic and imaginative scenes", image: "https://images.unsplash.com/photo-1621155346337-7d1947ea715d?w=40" },
        { name: "Notion AI", category: "Writing Assistant", rating: 4, feature: "Integrated AI assistant for Notion users", image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=40" },
    ];

    const tbody = document.getElementById('ai-tools-tbody');

    function renderTable(tools) {
        tbody.innerHTML = '';
        tools.forEach(tool => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="tool-name-cell">
                        <img src="${tool.image}" alt="${tool.name}">
                        <strong>${tool.name}</strong>
                    </div>
                </td>
                <td>${tool.category}</td>
                <td class="star-rating">${Array(tool.rating).fill('★').join('')}${Array(5 - tool.rating).fill('☆').join('')}</td>
                <td>${tool.feature}</td>
            `;
            tbody.appendChild(row);
        });
    }

    renderTable(aiTools);

    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredTools = aiTools.filter(tool => tool.name.toLowerCase().includes(searchTerm));
        renderTable(filteredTools);
    });
});
'''