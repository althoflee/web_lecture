export default async function main() {
    console.log("hello es6");
    let _list = document.querySelector("#list-todo")
    let _btn_add = document.querySelector("#btn-add")
    let _todoTitle = document.querySelector("#todoTitle")

    _btn_add.addEventListener('click',()=> {
        let _title = _todoTitle.value;

        console.log(_title)
        //...list 추가 




        _title.value = ""

    })



}