export default async function main() {
    console.log("hello es6");

    let _list = document.querySelector('#mylist')
    let counter = 0
    let _selectorId = -1;

    document.querySelector('#btn-add').addEventListener('click', ()=> {
        let _li = document.createElement('li');
        _li.innerText = 'Item : ' + counter++;
        _li.setAttribute('data-id',counter)
        _list.appendChild(_li)

    });

    document.querySelector('#btn-delete').addEventListener('click',()=> {
        let _li = _list.lastElementChild;
        _list.removeChild(_li)
    })

    _list.addEventListener('click',(evt)=> {

        if(evt.target.tagName == 'LI') {
            //reset
            let _li = _list.children
            console.log(_li);

            for(let i=0;i<_li.length;i++) {
                _li[i].style.color = 'black'
            }
            evt.target.style.color = 'red'
            _selectorId = evt.target.getAttribute('data-id');
        }
    })

    document.querySelector('#btn-remove').addEventListener('click',()=> {
        
        // let _li = _list.children;

        // for(let i=0;i<_li.length;i++) {
        //     if(_li[i].getAttribute('data-id') == _selectorId) {
        //         _list.removeChild(_li[i])
        //         break;
        //     }
        // }
        const itemArray = Array.from(_list.children)
        const itemToRemove = itemArray.
            find(item=> {
                return item.getAttribute('data-id') == _selectorId
            } );
        
        if(itemToRemove) {
            _list.removeChild(itemToRemove)
        }

    });


}