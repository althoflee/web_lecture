export default async function main() {
    console.log("hello es6");

    let element = document.getElementById('myid');
    console.log(element)
    element.innerText = 'hello my id'

    let elm2 = document.getElementsByName('myname')
    console.log(elm2)
    elm2[0].innerText = 'hello my name'

    let elm3 = document.querySelector('[name="myname"]')
    console.log(elm3)

    let elm4 = document.querySelector('[myattr="alice"]')
    console.log(elm4)
    elm4.innerText = 'hello alice'

    let elm5 = document.querySelector('.myclass')
    console.log(elm5)
    elm5.innerText = 'hello my class'

    console.log(document.querySelectorAll('.myclass'))
    console.log(document.getElementsByClassName('myclass'))
    
}