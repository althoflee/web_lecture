export default async function main() {
    console.log("hello es6");

    let btn_check = document.querySelector("#check button")
    const base_url = 'http://cbhai01.iptime.org:17870'

    btn_check.addEventListener('click',async ()=> {
        try {

            const response = await fetch( base_url + '/api/v2/challenge/',
                {
                    method : 'GET',
                    headers : {
                        'Content-Type' : 'text/plain',
                        'auth-token' : 'DtqBzT4O'
    
                    }
                }
            )
            if(!response.ok) {
                throw new Error("Network response not ok")
            }
            const data = await response.json()
            console.log(data)

        }
        catch(error) {
            console.log(error)
        }

    })


}