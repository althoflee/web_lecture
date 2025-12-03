// index.js
export default function main() {
  console.log("Tool calling demo start");

  const inputEl = document.getElementById("inp-msg");
  const sendBtn = document.getElementById("send-btn");
  const respEl = document.getElementById("response");

  const MODEL = "qwen3-vl:2b";
  const OLLAMA_CHAT_URL = "http://localhost:11434/api/chat";

  // 1) JS 쪽 툴 함수들 (실제 실행 로직)
  function add_two_numbers(a, b) {
    return Number(a) + Number(b);
  }

  function subtract_two_numbers(a, b) {
    return Number(a) - Number(b);
  }

  // 2) 함수 레지스트리 (문자열 → 함수 매핑)
  const FUNCTION_REGISTRY = {
    add_two_numbers,
    subtract_two_numbers,
  };

  // 3) Ollama에게 넘겨줄 툴 스키마 (Python 버전과 동일 구조)
  const tools = [
    {
      type: "function",
      function: {
        name: "add_two_numbers",
        description: "Add two numbers",
        parameters: {
          type: "object",
          required: ["a", "b"],
          properties: {
            a: { type: "integer", description: "The first number" },
            b: { type: "integer", description: "The second number" },
          },
        },
      },
    },
    {
      type: "function",
      function: {
        name: "subtract_two_numbers",
        description: "두개의 숫자를 입력받아 빼는 함수",
        parameters: {
          type: "object",
          required: ["a", "b"],
          properties: {
            a: { type: "integer", description: "The first number" },
            b: { type: "integer", description: "The second number" },
          },
        },
      },
    },
  ];

  // 4) Ollama /api/chat 호출 유틸리티
  async function callOllamaChat(body) {
    const res = await fetch(OLLAMA_CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Ollama HTTP ${res.status}: ${text}`);
    }

    const data = await res.json();
    console.log("[Ollama raw response]", data);
    return data;
  }

  // 5) 메인 핸들러: 한 번의 질의에 대해
  async function handleSend() {
    const userText = inputEl.value.trim();
    if (!userText) return;

    respEl.textContent = "생각 중... (tool calling)";

    try {
      // (1) 첫 번째 요청: LLM이 툴 호출을 결정하도록
      const baseMessages = [
        { role: "user", content: userText },
      ];

      const firstResp = await callOllamaChat({
        model: MODEL,
        messages: baseMessages,
        tools: tools,
        stream: false,
        // 일부 모델은 think 옵션을 지원 (지원 안 해도 무시됨)
        think: true,
      });

      const firstMsg = firstResp.message || firstResp; // 구현체에 따라 다를 수 있어서 안전하게
      console.log("[First message]", firstMsg);

      const toolCalls = firstMsg.tool_calls || [];
      const thinking = firstMsg.thinking || "";

      // 추론 과정 콘솔에 찍기
      if (thinking) {
        console.log("=== LLM Thinking ===");
        console.log(thinking);
      }

      // (1-1) 툴 호출이 없다면, 그냥 content를 출력하고 종료
      if (toolCalls.length === 0) {
        respEl.textContent = firstMsg.content || "(툴 호출 없이 응답함)";
        return;
      }

      // (2) 여기서는 단일 tool call만 처리 (필요하면 반복문으로 확장 가능)
      const toolCall = toolCalls[0];
      const fnName = toolCall.function.name;
      const args = toolCall.function.arguments || {};

      console.log("[Tool call requested]", fnName, args);

      const fn = FUNCTION_REGISTRY[fnName];
      if (!fn) {
        respEl.textContent = `알 수 없는 함수 호출: ${fnName}`;
        return;
      }

      // (3) 브라우저에서 실제 툴 함수 실행
      const toolResult = fn(args.a, args.b);
      console.log("[Tool result]", toolResult);

      // (4) 툴 실행 결과를 LLM에게 다시 보내 최종 자연어 응답 생성
      const followupMessages = [
        ...baseMessages,
        {
          // LLM이 낸 "툴 호출 지시" 메시지를 그대로 히스토리에 포함
          role: "assistant",
          content: firstMsg.content || "",
          tool_calls: toolCalls,
          thinking: thinking,
        },
        {
          // 툴 실행 결과를 전달
          role: "tool",
          tool_call_id: toolCall.id,
          content: String(toolResult),
        },
      ];

      const finalResp = await callOllamaChat({
        model: MODEL,
        messages: followupMessages,
        stream: false,
      });

      const finalMsg = finalResp.message || finalResp;
      console.log("[Final message]", finalMsg);

      respEl.textContent = finalMsg.content || "";
    } catch (err) {
      console.error(err);
      respEl.textContent = "에러: " + err.message;
    }
  }

  // 6) 버튼 / Enter 키에 이벤트 연결
  sendBtn.addEventListener("click", handleSend);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  });
}
