export default async function main() {
    console.log("hello es6");
    let _list = document.querySelector("#list-todo")
    let _btn_add = document.querySelector("#btn-add")
    let _todoTitle = document.querySelector("#todoTitle")
    let _btn_del = document.querySelector("#btn-delete")

    _btn_add.addEventListener('click',()=> {
        let _title = _todoTitle.value;

        console.log(_title)
        //...list 추가 
        let _li = document.createElement('li')
        _li.innerText = _title

        _list.appendChild(_li)

        _todoTitle.value = ""

    })

    _btn_del.addEventListener('click',()=> {
        let _lastLi = _list.lastElementChild
        _list.removeChild(_lastLi)
    })

    _list.addEventListener('click',(evt)=> {
        console.log(evt.target)
        
        //이전 내용 클리어
        let list_items = _list.children
        const itemsArray = Array.from(list_items)
        itemsArray.forEach( (item)=> {
            //item.classList
            item.classList.remove('select-item')
        })
        

        evt.target.classList.add("select-item")

    })
}