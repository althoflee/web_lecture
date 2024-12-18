export default async function main() {
    console.log("hello es6");

    const _tx_info = document.querySelector("#check .info-text")
    const btn_check = document.querySelector("#check button")
    const base_url = 'http://cbhai01.iptime.org:17870/api/v2/challenge'

    const _registerForm = document.querySelector("#register")

    btn_check.addEventListener('click', async () => {
        try {

            const response = await fetch(base_url,
                {
                    method: 'GET',

                    headers: {
                        'Content-Type': 'text/plain',
                        'auth-token': 'DtqBzT4O'
                    }
                }
            )
            if (!response.ok) {
                throw new Error("Network response not ok")
            }
            const data = await response.json()
            console.log(data)

            if(data.r == 'ok') {
                _tx_info.innerText = `welcome to : ${data.info}`
            }
        }
        catch (error) {
            console.log(error)
        }

    });

    _registerForm.querySelector('button').addEventListener('click', async () => {

        const _name = _registerForm.querySelector('.name').value
        const _passwd = _registerForm.querySelector('.passwd').value
        const _studentId = _registerForm.querySelector('.studentId').value
        const _classId = "2024_02"

        try {

            const param = new URLSearchParams({
                name: _name,
                passwd: _passwd,
                studentId: _studentId,
                classId: _classId
            })

            const response = await fetch(`${base_url}/register?${param}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': 'DtqBzT4O'
                    }
                }
            )
            if (!response.ok) {
                throw new Error("Network response not ok")
            }
            const data = await response.json()
            console.log(data)

            if(data.r == 'ok') {
                _tx_info.innerText = `success : ${data.info}`
            }
            else {
                _tx_info.innerText = `error : ${data.info}`
            }
        }
        catch (error) {
            console.log(error)
        }
    });

    document.querySelector('#start_hl button').addEventListener('click', async () => {
        try {

            const _passwd = _registerForm.querySelector('.passwd').value
            const _studentId = _registerForm.querySelector('.studentId').value

            const param = new URLSearchParams({
                passwd: _passwd,
                studentId: _studentId
            })

            const response = await fetch(`${base_url}/start_hl?${param}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': 'DtqBzT4O'
                    }
                }
            )
            if (!response.ok) {
                throw new Error("Network response not ok")
            }
            const data = await response.json()
            console.log(data)

            if(data.r == 'ok') {
                _tx_info.innerText = `success : ${data.info}`
            }
            else {
                _tx_info.innerText = `error : ${data.info}`
            }
        }
        catch (error) {
            console.log(error)
        }
    });

    document.querySelector('#game button').addEventListener('click', async () => {
        try {

            const _passwd = _registerForm.querySelector('.passwd').value
            const _studentId = _registerForm.querySelector('.studentId').value
            const _gussNum = document.querySelector('#game input').value

            const param = new URLSearchParams({
                passwd: _passwd,
                studentId: _studentId,
                num : _gussNum
            })

            const response = await fetch(`${base_url}/find_hl?${param}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': 'DtqBzT4O'
                    }
                }
            )
            if (!response.ok) {
                throw new Error("Network response not ok")
            }
            const data = await response.json()
            console.log(data)

            if(data.r == 'ok') {
                _tx_info.innerText = `success : ${data.info}`
            }
            else {
                _tx_info.innerText = `error : ${data.info}`
            }
        }
        catch (error) {
            console.log(error)
        }
        
    });

}