document.getElementById('scan').addEventListener('click', async function() {
    try {
        const device = await navigator.bluetooth.requestDevice({
            filters: [
                {
                    namePrefix: 'BSQTC_'
                },
                {
                    services: ['2ca354b0-5f62-11ef-b4d4-f7af9038ee7d']
                }
            ]
        });

        console.log('디바이스 선택됨:', device.name);

        // 디바이스 연결
        const server = await device.gatt.connect();
        console.log('GATT 서버에 연결됨');

        // 서비스 접근
        const service = await server.getPrimaryService('2ca354b0-5f62-11ef-b4d4-f7af9038ee7d');
        console.log('서비스 접근 성공');

        // 특성 접근
        const characteristic = await service.getCharacteristic('35c34c80-5f62-11ef-b4d4-f7af9038ee7d');
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

    } catch (error) {
        console.error('에러 발생:', error);
    }
});
