const service_uuid = "02cb14bf-42e0-41bd-9d6d-68db02057e42";
const characteristic_uuid = "fef6efb5-fbf8-4d0a-a69f-57049733a87a";

let characteristic; // 전역 변수로 특성 저장
let device;         // 전역 변수로 BLE 디바이스 저장

document.getElementById('disconnect').setAttribute('disabled', 'disabled');

document.getElementById('connect').addEventListener('click', async function() {
    try {
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

        // 특성 값 읽기
        const value = await characteristic.readValue();
        const decoder = new TextDecoder('utf-8');
        const receivedValue = decoder.decode(value);
        console.log('특성 값:', receivedValue);

        // 특성 값 변경 시 알림 수신 설정
        characteristic.addEventListener('characteristicvaluechanged', (event) => {
            const value = event.target.value;
            const receivedValue = decoder.decode(value);
            console.log('알림 수신:', receivedValue);
        });
        await characteristic.startNotifications();
        console.log('알림 수신 시작');

        document.getElementById('connect').setAttribute('disabled', 'disabled');
        document.getElementById('disconnect').removeAttribute('disabled');

    } catch (error) {
        console.error('에러 발생:', error);
    }
});

document.getElementById('led-on').addEventListener('click', async function() {
    try {
        if (characteristic) {
            const encoder = new TextEncoder();
            const command = encoder.encode("on -1"); // LED 켜기 명령
            await characteristic.writeValue(command);
            console.log('LED 켜기 명령 전송됨');
        } else {
            console.error('BLE 특성이 연결되지 않았습니다.');
        }
    } catch (error) {
        console.error('LED 켜기 명령 전송 중 오류 발생:', error);
    }
});

document.getElementById('led-off').addEventListener('click', async function() {
    try {
        if (characteristic) {
            const encoder = new TextEncoder();
            const command = encoder.encode('off -1'); // LED 끄기 명령
            await characteristic.writeValue(command);
            console.log('LED 끄기 명령 전송됨');
        } else {
            console.error('BLE 특성이 연결되지 않았습니다.');
        }
    } catch (error) {
        console.error('LED 끄기 명령 전송 중 오류 발생:', error);
    }
});

// Disconnect 버튼 클릭 시 디바이스 연결 해제
document.getElementById('disconnect').addEventListener('click', async function() {
    try {
        if (device && device.gatt.connected) {
            await device.gatt.disconnect();

            document.getElementById('connect').removeAttribute('disabled');
            document.getElementById('disconnect').setAttribute('disabled', 'disabled');

            console.log('디바이스 연결 해제됨');
        } else {
            console.log('디바이스가 연결되어 있지 않습니다.');
        }
    } catch (error) {
        console.error('디바이스 연결 해제 중 오류 발생:', error);
    }
});


async function sendCommand(_command) {
    try {
        if (characteristic) {
            const encoder = new TextEncoder();
            const command = encoder.encode(_command); // LED 끄기 명령
            await characteristic.writeValue(command);
            // console.log('LED 끄기 명령 전송됨');
            console.log(command + ' 명령 전송됨');
        } else {
            console.error('BLE 특성이 연결되지 않았습니다.');
        }
    } catch (error) {
        console.error('LED 끄기 명령 전송 중 오류 발생:', error);
    }
}

document.getElementById('led-0-on').addEventListener('click', function() {
    sendCommand('on 0');
});

document.getElementById('led-0-off').addEventListener('click', function() {
    sendCommand('off 0');
});
