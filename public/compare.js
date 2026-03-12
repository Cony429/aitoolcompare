const myTools = [
    { name: "ChatGPT", desc: "Advanced conversational AI for various tasks.", stars: 5, url: "#", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=50", tags: ['text', 'chat', 'writing', 'coding', 'productivity', 'assistant', 'openai'] },
    { name: "Midjourney", desc: "Generates high-quality, artistic images from text prompts.", stars: 5, url: "#", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=50", tags: ['image', 'art', 'design', 'creative', 'drawing', 'graphics', 'visuals', 'generator'] },
    { name: "Leonardo.ai", desc: "Create production-quality assets for your creative projects.", stars: 4, url: "#", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=50", tags: ['image', 'art', 'design', 'creative', 'drawing', 'assets', 'gaming', 'generator'] },
    { name: "Sora", desc: "OpenAI's model that can create realistic and imaginative scenes from text instructions.", stars: 5, url: "#", img: "https://images.unsplash.com/photo-1621155346337-7d1947ea715d?w=50", tags: ['video', 'animation', 'movie', 'motion', 'film', 'scenery', 'generator', 'openai'] },
    { name: "Runway", desc: "AI-powered video creation and editing suite for creators.", stars: 4, url: "#", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=50", tags: ['video', 'animation', 'editing', 'motion', 'vfx', 'generator', 'film', 'magic tools'] },
    { name: "Perplexity AI", desc: "An AI-powered research and conversational search engine.", stars: 4, url: "#", img: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=50", tags: ['search', 'research', 'answer', 'information', 'knowledge', 'engine', 'conversational', 'ask'] },
    { name: "Gemini", desc: "Google's most capable and versatile multimodal AI model.", stars: 4, url: "#", img: "https://images.unsplash.com/photo-1675271591211-126ad94e495d?w=50", tags: ['search', 'research', 'answer', 'information', 'multimodal', 'google', 'chat', 'bard'] },
    { name: "ElevenLabs", desc: "The most realistic and versatile AI speech software, ever.", stars: 5, url: "#", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=50", tags: ['audio', 'voice', 'speech', 'sound', 'narration', 'dubbing', 'tts', 'cloning'] },
    { name: "Jasper", desc: "AI Content Generator for marketing, blog posts, and more.", stars: 4, url: "#", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=50", tags: ['writing', 'marketing', 'copywriting', 'content', 'seo', 'automation', 'business'] },
    { name: "Notion AI", desc: "Integrated AI assistant to help you write, plan, and organize.", stars: 4, url: "#", img: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=50", tags: ['productivity', 'writing', 'organization', 'notes', 'workspace', 'assistant', 'database'] }
];

document.addEventListener('DOMContentLoaded', () => {
    const tool1Select = document.getElementById('tool1-select');
    const tool2Select = document.getElementById('tool2-select');
    const compareBtn = document.getElementById('compare-btn');
    const comparisonResult = document.getElementById('comparison-result');

    // Populate select options
    myTools.forEach(tool => {
        const option1 = document.createElement('option');
        option1.value = tool.name;
        option1.textContent = tool.name;
        tool1Select.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = tool.name;
        option2.textContent = tool.name;
        tool2Select.appendChild(option2);
    });

    compareBtn.addEventListener('click', () => {
        const tool1Name = tool1Select.value;
        const tool2Name = tool2Select.value;

        if (tool1Name === tool2Name) {
            comparisonResult.innerHTML = '<p>Please select two different tools to compare.</p>';
            return;
        }

        const tool1 = myTools.find(t => t.name === tool1Name);
        const tool2 = myTools.find(t => t.name === tool2Name);

        comparisonResult.innerHTML = `
            <h3>${tool1.name} vs ${tool2.name}</h3>
            <p><strong>${tool1.name}:</strong> ${tool1.desc}</p>
            <p><strong>${tool2.name}:</strong> ${tool2.desc}</p>
            <!-- Add more detailed comparison points here -->
        `;
    });
});
