const tools = [
    { name: "ChatGPT", description: "A versatile AI chatbot by OpenAI for conversation, coding, and more.", link: "https://chat.openai.com" },
    { name: "Claude", description: "Advanced AI assistant from Anthropic, focused on safety and helpfulness.", link: "https://claude.ai" },
    { name: "Midjourney", description: "Top-tier AI image generator that turns text prompts into stunning art.", link: "https://midjourney.com" },
    { name: "Gemini", description: "Google's most capable AI model, integrated across the Google ecosystem.", link: "https://gemini.google.com" },
    { name: "Jasper", description: "Professional AI content platform designed for marketing and business writing.", link: "https://jasper.ai" },
    { name: "Canva AI", description: "Easy-to-use AI design tools for creating social media posts and graphics.", link: "https://canva.com" },
    { name: "Perplexity", description: "An AI-powered search engine that provides direct answers with citations.", link: "https://perplexity.ai" },
    { name: "Descript", description: "An all-in-one video and podcast editor that works like a word document.", link: "https://descript.com" },
    { name: "Luma AI", description: "Cutting-edge AI for creating realistic 3D objects and cinematic videos.", link: "https://lumalabs.ai" },
    { name: "Gamma", description: "Create beautiful presentations, memos, and briefs in seconds with AI.", link: "https://gamma.app" },
    { name: "Notion AI", description: "Enhance your workflow with AI-powered writing and organization in Notion.", link: "https://notion.so" },
    { name: "Leonardo.ai", description: "Powerful image generation platform optimized for creative assets and gaming.", link: "https://leonardo.ai" },
    { name: "Sora", description: "An AI model that can create realistic and imaginative scenes from text instructions.", link: "https://openai.com/sora" },
    { name: "Runway", description: "Real-time video editing and generation.", link: "https://runwayml.com/" },
    { name: "ElevenLabs", description: "AI voice generator.", link: "https://elevenlabs.io/" },
    { name: "HeyGen", description: "AI video generator for business.", link: "https://www.heygen.com/" },
    { name: "Pika", description: "Idea to video platform.", link: "https://pika.art/" },
    { name: "Suno", description: "Create music with AI.", link: "https://www.suno.ai/" },
    { name: "Udio", description: "Create music with AI.", link: "https://www.udio.com/" },
    { name: "Copy.ai", description: "Automated creativity tools for copywriters.", link: "https://www.copy.ai/" },
    { name: "QuillBot", description: "AI-powered paraphrasing tool.", link: "https://quillbot.com/" },
    { name: "Grammarly", description: "AI-powered writing assistant.", link: "https://www.grammarly.com/" },
    { name: "GitHub Copilot", description: "AI pair programmer.", link: "https://github.com/features/copilot" },
    { name: "Writesonic", description: "AI writer for creating SEO-friendly content.", link: "https://writesonic.com/" }
];

function displayTools() {
    const container = document.getElementById('tool-list');
    container.innerHTML = ''; 

    tools.forEach(tool => {
        const card = document.createElement('div');
        card.className = 'tool-card';
        card.innerHTML = `
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
            <a href="${tool.link}" target="_blank" class="visit-btn" style="display:inline-block; padding:10px 20px; background:#007bff; color:white; border-radius:6px; text-decoration:none; font-weight:bold;">Visit Website</a>
        `;
        container.appendChild(card);
    });
}

displayTools();