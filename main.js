function showDescription(tool) {
  let description;
  switch (tool) {
    case "gemini":
      description = "Gemini is a family of multimodal large language models developed by Google. It was announced on December 6, 2023.";
      break;
    case "chatgpt":
      description = "ChatGPT is a chatbot developed by OpenAI and launched in November 2022. It is built on top of OpenAI's GPT-3.5 and GPT-4 foundational large language models and has been fine-tuned using both supervised and reinforcement learning techniques.";
      break;
    case "copilot":
      description = "GitHub Copilot is a cloud-based artificial intelligence tool developed by GitHub and OpenAI to assist users of Visual Studio Code, Visual Studio, Neovim, and JetBrains integrated development environments by autocompleting code.";
      break;
    case "midjourney":
      description = "Midjourney is an independent research lab that produces a proprietary artificial intelligence program that creates images from textual descriptions. It is known for its high-quality, artistic images.";
      break;
    case "dalle2":
      description = "DALL-E 2 is a new AI system that can create realistic images and art from a description in natural language. It can create original, realistic images and art from a text description. It can combine concepts, attributes, and styles.";
      break;
    case "stablediffusion":
      description = "Stable Diffusion is a deep learning, text-to-image model released in 2022. It is primarily used to generate detailed images conditioned on text descriptions, though it can also be applied to other tasks such as inpainting, outpainting, and generating image-to-image translations guided by a text prompt.";
      break;
    case "jasper":
      description = "Jasper is an AI copywriter and content generator for marketing teams. It can create a variety of content, including blog posts, social media posts, and website copy.";
      break;
    case "copyai":
      description = "Copy.ai is an AI-powered copywriter that generates high-quality copy for your business. It can write a variety of content, including ad copy, email subject lines, and product descriptions.";
      break;
    case "surferseo":
      description = "SurferSEO is a content intelligence tool that helps you write SEO-optimized content. It analyzes your content and compares it to the top-ranking pages for your target keyword.";
      break;
  }
  alert(description);
}