export default function main() {
    const fetchBtn = document.getElementById('fetchBtn');
    const inputName = document.getElementById('inputName');
    const resultPre = document.getElementById('result');

    fetchBtn.addEventListener('click', async () => {
        const name = inputName.value;
        
        // 1. 쿼리 스트링 포함 URL 생성
        // 입력값이 없으면 빈 문자열이 전송되고, 서버 로직에 의해 'World'가 출력될 것임
        const url = `http://localhost:3000/api/hello?name=${encodeURIComponent(name)}`;

        try {
            // 2. Fetch API 호출
            const response = await fetch(url, {
                method: 'GET', // 생략 가능 (기본값 GET)
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // 3. JSON 파싱
            const data = await response.json();

            // 4. 결과 출력 (가독성을 위해 들여쓰기 2칸 적용)
            resultPre.textContent = JSON.stringify(data, null, 2);

        } catch (error) {
            console.error('Fetch Error:', error);
            resultPre.textContent = `Error: ${error.message}`;
        }
    });
    
    console.log("Client logic loaded");
}