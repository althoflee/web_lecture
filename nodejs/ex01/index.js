import http from 'node:http';

const PORT = 3000;

const server = http.createServer((req, res) => {
    // 공통 헤더
    // res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Access-Control-Allow-Origin', '*');

    // 1. CORS 필수 헤더 설정 (모든 요청에 공통 적용)
    res.setHeader('Access-Control-Allow-Origin', '*'); // 모든 도메인 허용
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // 허용할 메서드
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // 허용할 헤더

    // 2. Preflight 요청(OPTIONS) 처리 (이 부분이 핵심입니다!)
    if (req.method === 'OPTIONS') {
        res.writeHead(204); // No Content (성공했지만 줄 내용은 없음)
        res.end();
        return; // 여기서 함수 종료
    }

    // 1. URL 파싱 (WHATWG URL 표준 API)
    // req.url은 상대 경로만 있으므로, base URL(dummy)을 붙여서 파싱합니다.
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const { pathname, searchParams } = parsedUrl;

    // 2. 라우팅 체크 (url 대신 pathname 사용)
    if (pathname === '/api/hello' && req.method === 'GET') {
        
        // 3. 쿼리 파라미터 추출 (?name=값)
        // 값이 없으면 'World'를 기본값으로 사용
        const name = searchParams.get('name') || 'World';

        res.writeHead(200);
        res.end(JSON.stringify({ 
            success: true, 
            message: `Hello, ${name}!` 
        }));
    }

    else {
        res.writeHead(404);
        res.end(JSON.stringify({ success: false, message: 'Route not found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});