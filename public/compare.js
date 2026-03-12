const myTools = [
    // Chat & Writing
    { name: "ChatGPT", desc: "Advanced conversational AI for various tasks.", stars: 5, url: "https://openai.com/chatgpt", img: "https://.../chatgpt.png", tags: ['text', 'chat', 'writing', 'coding', 'productivity', 'assistant', 'openai'] },
    { name: "Gemini", desc: "Google's most capable and versatile multimodal AI model.", stars: 4, url: "https://gemini.google.com/", tags: ['search', 'research', 'answer', 'information', 'multimodal', 'google', 'chat', 'bard'] },
    { name: "Jasper", desc: "AI Content Generator for marketing, blog posts, and more.", stars: 4, url: "#", tags: ['writing', 'marketing', 'copywriting', 'content', 'seo', 'automation', 'business'] },
    { name: "Copy.ai", desc: "Generates high-quality marketing copy and content.", stars: 4, url: "#", tags: ['writing', 'marketing', 'copywriting', 'content', 'automation', 'business'] },
    { name: "Notion AI", desc: "Integrated AI assistant to help you write, plan, and organize.", stars: 4, url: "#", tags: ['productivity', 'writing', 'organization', 'notes', 'workspace', 'assistant', 'database'] },
    { name: "Writesonic", desc: "AI writer that creates SEO-friendly content for blogs, ads, and more.", stars: 4, url: "#", tags: ['writing', 'seo', 'marketing', 'content', 'copywriting'] },
    { name: "Grammarly", desc: "AI-powered writing assistant for grammar, spelling, and style.", stars: 5, url: "#", tags: ['writing', 'productivity', 'assistant', 'grammar', 'editing'] },
    { name: "QuillBot", desc: "Paraphrasing and summarizing tool to improve your writing.", stars: 4, url: "#", tags: ['writing', 'paraphrasing', 'summarizing', 'editing'] },
    
    // Image & Design
    { name: "Midjourney", desc: "Generates high-quality, artistic images from text prompts.", stars: 5, url: "#", tags: ['image', 'art', 'design', 'creative', 'drawing', 'graphics', 'visuals', 'generator'] },
    { name: "DALL-E 3", desc: "OpenAI's image generator, creating highly detailed images from text.", stars: 4, url: "https://openai.com/dall-e-3", tags: ['image', 'art', 'design', 'openai', 'generator'] },
    { name: "Leonardo.ai", desc: "Create production-quality assets for your creative projects.", stars: 4, url: "#", tags: ['image', 'art', 'design', 'creative', 'drawing', 'assets', 'gaming', 'generator'] },
    { name: "Stable Diffusion", desc: "Powerful open-source model for generating images from text.", stars: 4, url: "#", tags: ['image', 'art', 'open-source', 'generator', 'creative'] },
    { name: "Canva", desc: "Online design platform with AI features for creating graphics.", stars: 5, url: "#", tags: ['design', 'graphics', 'social media', 'presentation', 'ui'] },
    { name: "Figma", desc: "Collaborative interface design tool with growing AI capabilities.", stars: 5, url: "#", tags: ['design', 'ui', 'ux', 'prototyping', 'collaboration'] },
    { name: "Adobe Firefly", desc: "Adobe's family of creative generative AI models.", stars: 4, url: "#", tags: ['image', 'design', 'adobe', 'generator', 'creative'] },
    { name: "Uizard", desc: "AI-powered tool for designing wireframes, mockups, and prototypes.", stars: 3, url: "#", tags: ['design', 'ui', 'ux', 'prototyping', 'wireframing'] },
    
    // Video & Audio
    { name: "Sora", desc: "OpenAI's model for creating realistic video from text.", stars: 5, url: "https://openai.com/sora", tags: ['video', 'animation', 'movie', 'motion', 'film', 'generator', 'openai'] },
    { name: "Runway", desc: "AI-powered video creation and editing suite for creators.", stars: 4, url: "#", tags: ['video', 'animation', 'editing', 'motion', 'vfx', 'generator', 'film', 'magic tools'] },
    { name: "Pika", desc: "AI video platform that can generate and edit videos from text and images.", stars: 4, url: "#", tags: ['video', 'generator', 'animation', 'creative'] },
    { name: "Descript", desc: "All-in-one audio and video editor with powerful AI features.", stars: 4, url: "#", tags: ['video', 'audio', 'editing', 'transcription', 'podcast'] },
    { name: "ElevenLabs", desc: "The most realistic and versatile AI speech software.", stars: 5, url: "#", tags: ['audio', 'voice', 'speech', 'sound', 'narration', 'dubbing', 'tts', 'cloning'] },
    { name: "Synthesia", desc: "AI video generation platform to create videos with AI avatars.", stars: 4, url: "#", tags: ['video', 'avatar', 'presentation', 'corporate', 'training'] },
    { name: "Murf.ai", desc: "Versatile AI voice generator for lifelike text-to-speech.", stars: 4, url: "#", tags: ['audio', 'voice', 'tts', 'narration', 'presentation'] },

    // Code & Development
    { name: "GitHub Copilot", desc: "AI pair programmer that helps you write code faster.", stars: 5, url: "#", tags: ['code', 'development', 'github', 'assistant', 'programming'] },
    { name: "Tabnine", desc: "AI code completion assistant for all programming languages.", stars: 4, url: "#", tags: ['code', 'development', 'assistant', 'programming', 'ide'] },
    { name: "Replit", desc: "Online IDE with AI features for coding, deploying, and hosting.", stars: 4, url: "#", tags: ['code', 'development', 'ide', 'hosting', 'collaboration'] },
    { name: "Amazon CodeWhisperer", desc: "AI coding companion from AWS.", stars: 4, url: "#", tags: ['code', 'development', 'aws', 'assistant', 'programming'] },
    
    // Business & Productivity
    { name: "Perplexity AI", desc: "An AI-powered research and conversational search engine.", stars: 4, url: "#", tags: ['search', 'research', 'answer', 'information', 'knowledge', 'engine', 'conversational', 'ask'] },
    { name: "Tome", desc: "AI-powered storytelling format for creating presentations and narratives.", stars: 4, url: "#", tags: ['presentation', 'storytelling', 'productivity', 'design'] },
    { name: "Fireflies.ai", desc: "AI assistant for your meetings. Records, transcribes, and analyzes voice conversations.", stars: 4, url: "#", tags: ['productivity', 'meetings', 'transcription', 'assistant', 'automation'] },
    { name: "Otter.ai", desc: "AI meeting assistant that records audio, writes notes, and generates summaries.", stars: 4, url: "#", tags: ['productivity', 'meetings', 'transcription', 'notes'] },
    { name: "Synthesia", desc: "Create professional videos with AI avatars and voices.", stars: 4, url: "#", tags: ['video', 'business', 'training', 'presentation'] },
    { name: "Beautiful.ai", desc: "Presentation software that makes it easy to create beautiful designs.", stars: 4, url: "#", tags: ['presentation', 'design', 'business', 'productivity'] },
    { name: "Glean", desc: "AI-powered work search that finds exactly what you need across all your company’s apps.", stars: 4, url: "#", tags: ['search', 'enterprise', 'productivity', 'knowledge management'] },
    { name: "ClickUp AI", desc: "A productivity platform's AI assistant to manage tasks, docs, and goals.", stars: 4, url: "#", tags: ['productivity', 'project management', 'assistant', 'automation'] },

    // More & Niche Tools
    { name: "Character.AI", desc: "Create and talk to intelligent chatbots with distinct personalities.", stars: 4, url: "#", tags: ['chat', 'entertainment', 'character', 'roleplay'] },
    { name: "Luma AI", desc: "Create lifelike 3D models and scenes with your phone.", stars: 4, url: "#", tags: ['3d', 'nerf', 'reality capture', 'creative'] },
    { name: "Riffusion", desc: "Real-time music generation with stable diffusion.", stars: 3, url: "#", tags: ['audio', 'music', 'sound', 'generator', 'creative'] },
    { name: "Suno AI", desc: "AI music generator that creates songs with vocals from a simple prompt.", stars: 4, url: "#", tags: ['audio', 'music', 'song', 'generator', 'creative'] },
    { name: "DeepL", desc: "AI-powered translation service known for its accuracy and nuance.", stars: 5, url: "#", tags: ['translation', 'language', 'writing', 'productivity'] },
    { name: "Consensus", desc: "An AI search engine for research papers.", stars: 4, url: "#", tags: ['research', 'science', 'academic', 'search'] },
    { name: "Elicit", desc: "AI research assistant to automate literature reviews.", stars: 4, url: "#", tags: ['research', 'science', 'academic', 'writing'] },
    { name: "PlayHT", desc: "AI voice generator with realistic text-to-speech voices.", stars: 4, url: "#", tags: ['audio', 'voice', 'tts', 'podcast', 'video'] },
    { name: "HeyGen", desc: "AI video platform for creating engaging business videos.", stars: 4, url: "#", tags: ['video', 'avatar', 'business', 'marketing'] },
    { name: "Klaviyo", desc: "Marketing automation platform with AI-powered features.", stars: 4, url: "#", tags: ['marketing', 'automation', 'email', 'business'] },
    { name: "Zapier", desc: "Automation platform that connects your apps, now with AI features.", stars: 5, url: "#", tags: ['automation', 'productivity', 'workflow', 'integration'] },
    { name: "Veed.io", desc: "Online video editor with a simple interface and powerful AI tools.", stars: 4, url: "#", tags: ['video', 'editing', 'subtitles', 'marketing'] },
    { name: "Spline", desc: "A collaborative 3D design tool for the web.", stars: 4, url: "#", tags: ['3d', 'design', 'web', 'interactive', 'animation'] },
    { name: "Looka", desc: "AI-powered platform to design a logo and build a brand you love.", stars: 4, url: "#", tags: ['design', 'logo', 'branding', 'business'] },
    { name: "Bardeen", desc: "AI to automate your manual workflows.", stars: 4, url: "#", tags: ['automation', 'productivity', 'workflow', 'scraping'] }
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
