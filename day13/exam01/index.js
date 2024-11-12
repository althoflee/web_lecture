export default async function main() {
    console.log("hello es6");

    let _p = document.getElementById("first_p")

    console.log('id :' + _p.id)

    console.log(_p)
    console.log(_p.tagName)
    console.log(_p.innerHTML)
    console.log(_p.innerText)

    console.log(_p.offsetHeight)
    console.log(_p.offsetWidth)

    console.log(_p.style)
    _p.style.color = 'green'
}