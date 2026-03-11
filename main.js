function showDescription(tool) {
  let description = "";
  switch (tool) {
    case "gemini":
      description = "Gemini is a family of multimodal large language models developed by Google AI. It was announced on December 6, 2023, and is positioned as a competitor to OpenAI's GPT-4. Gemini is trained on a large dataset of text and code, and it can generate text, translate languages, write different kinds of creative content, and answer your questions in an informative way.";
      break;
    case "chatgpt":
      description = "ChatGPT is a large language model-based chatbot developed by OpenAI. It is able to generate human-like text and has a wide range of applications, including translation, summarization, and question answering. It was launched in November 2022 and has since become one of the most popular AI applications.";
      break;
    case "copilot":
      description = "GitHub Copilot is a cloud-based artificial intelligence tool developed by GitHub and OpenAI to assist users of Visual Studio Code, Visual Studio, Neovim, and JetBrains integrated development environments (IDEs) by autocompleting code. It was first announced by GitHub on 29 June 2021 and is available for a subscription fee to individual developers.";
      break;
  }
  alert(description);
}