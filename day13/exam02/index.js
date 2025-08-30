var counter = 0;

export default async function main() {

    let _counter = document.querySelector("#counter h2")

    console.log(_counter)

    let _btn_inc = document.querySelector("#btn-inc")

    _btn_inc.addEventListener('click',()=> {

        counter++
        console.log(counter)
        _counter.innerText = counter
    })
    


}