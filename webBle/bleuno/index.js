const service_uuid = "c6f8b088-2af8-4388-8364-ca2a907bdeb8";
const characteristic_uuid = "f6aa83ca-de53-46b4-bdea-28a7cb57942e";

let characteristic; // 전역 변수로 특성 저장
let device;         // 전역 변수로 BLE 디바이스 저장

async function main() {
    console.log('Hello Bleuno');

    document.querySelector('#connect').addEventListener('click', connectDevice);
    document.querySelector('#send').addEventListener('click', sendData);

    document.querySelector('#clear').addEventListener('click', () => {
        document.querySelector('#data-received').value = '';
    });
}

async function connectDevice() {
    try {
        // 디바이스 선택(선택 창이 열리고 사용자가 선택할 때까지 대기)
        device = await navigator.bluetooth.requestDevice({
            filters: [
                {
                    namePrefix: 'ESP32_BLE'
                },
                {
                    services: [service_uuid]
                }
            ]
        });

        console.log('디바이스 선택됨:', device.name);

        // 디바이스 연결
        const server = await device.gatt.connect();
        console.log('GATT 서버에 연결됨');

        // 서비스 접근
        const service = await server.getPrimaryService(service_uuid);
        console.log('서비스 접근 성공');

        // 특성 접근 및 저장
        characteristic = await service.getCharacteristic(characteristic_uuid);
        console.log('특성 접근 성공');

        // 특성 값 변경 시 알림 수신 설정
        const decoder = new TextDecoder('utf-8');
        characteristic.addEventListener('characteristicvaluechanged', (event) => {
            const value = event.target.value;
            const receivedValue = decoder.decode(value);
            console.log('알림 수신:', receivedValue);

            // 수신 데이터를 화면에 표시
            const dataReceived = document.querySelector('#data-received');
            dataReceived.value += `Received: ${receivedValue}\n`;
            dataReceived.scrollTop = dataReceived.scrollHeight; // 스크롤 최신화
        });
        await characteristic.startNotifications();
        console.log('알림 수신 시작');

        const connectButton = document.querySelector('#connect');
        connectButton.innerText = '연결 해제';
        connectButton.removeEventListener('click', connectDevice);
        connectButton.addEventListener('click', disconnectDevice);

    } catch (error) {
        console.error('에러 발생:', error);
    }
}

async function disconnectDevice() {
    try {
        if (device && device.gatt.connected) {
            await device.gatt.disconnect();
            console.log('GATT 서버 연결 해제됨');
        }

        const connectButton = document.querySelector('#connect');
        connectButton.innerText = '연결';
        connectButton.removeEventListener('click', disconnectDevice);
        connectButton.addEventListener('click', connectDevice);

    } catch (error) {
        console.error('에러 발생:', error);
    }
}

async function sendData() {
    try {
        if (!characteristic) {
            console.error('BLE 디바이스가 연결되지 않았습니다.');
            return;
        }

        // 입력 필드에서 데이터 가져오기
        const dataToSend = document.querySelector('#data-to-send').value;
        if (!dataToSend) {
            console.error('보낼 데이터가 없습니다.');
            return;
        }

        // 데이터 인코딩 및 전송
        const encoder = new TextEncoder();
        const encodedData = encoder.encode(dataToSend);
        await characteristic.writeValue(encodedData);
        console.log('데이터 전송:', dataToSend);

        // 전송 데이터를 화면에 표시
        const dataReceived = document.querySelector('#data-received');
        dataReceived.value += `Sent: ${dataToSend}\n`;

    } catch (error) {
        console.error('데이터 전송 중 에러 발생:', error);
    }
}

export default main;
