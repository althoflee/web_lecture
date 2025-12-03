// index.js (Prompt + Question Chat Example)

export default function main() {
  console.log("Prompt + Message Chat Example Start");

  const promptEl = document.getElementById("inp-prompt");
  const inputEl = document.getElementById("inp-msg");
  const sendBtn = document.getElementById("send-btn");
  const respEl = document.getElementById("response");

  const MODEL = "qwen3-vl:2b";
  const OLLAMA_URL = "http://localhost:11434/api/chat";

  // Ollama 요청 함수
  async function callOllama(promptText, userText) {
    const body = {
      model: MODEL,
      messages: [
        {
          role: "system",
          content: promptText || "You are a helpful assistant."
        },
        {
          role: "user",
          content: userText
        }
      ],
      stream: false
    };

    const res = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Ollama Error: ${res.status} / ${text}`);
    }

    const data = await res.json();
    return data.message.content;
  }

  // 전송 버튼 처리
  async function handleSend() {
    const promptText = promptEl.value.trim();
    const userText = inputEl.value.trim();
    if (!userText) return;

    respEl.textContent = "응답 생성 중...";

    try {
      const answer = await callOllama(promptText, userText);
      respEl.textContent = answer;
    } catch (err) {
      respEl.textContent = "에러: " + err.message;
    }
  }

  sendBtn.addEventListener("click", handleSend);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSend();
  });
}
