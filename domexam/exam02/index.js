
async function main() {

    let _list = document.querySelector('#myList');

    let counter = 0;
    let _selectedItemId = -1;

    document.querySelector('#btn-add').addEventListener('click', function () {
        let _li = document.createElement('li');
        _li.innerText = 'Item ' + counter++;
        // _li.attributes['data-id'] = counter; //비표준
        _li.setAttribute('data-id', counter); //표준
        _list.appendChild(_li);
    });

    document.querySelector('#btn-delete').addEventListener('click', function () {
        let _li = _list.lastElementChild;
        _list.removeChild(_li);
    });

    document.querySelector('#btn-remove').addEventListener('click', function () {

        /*
                let _li = _list.children;
                for (let i = 0; i < _li.length; i++) {
                    // if (_li[i].attributes['data-id'] == _selectedItemId) {
                    if (_li[i].getAttribute('data-id') == _selectedItemId) {
                        _list.removeChild(_li[i]);
                        break;
                    }
                }
        */
        const itemsArray = Array.from(_list.children);

        const itemToRemove = itemsArray.find(item => {
            // console.log(item.getAttribute('data-id'));
            return item.getAttribute('data-id') == _selectedItemId
        });
        if (itemToRemove) {
            _list.removeChild(itemToRemove);
        }

        _selectedItemId = -1;
    });

    document.querySelector('#btn-insert').addEventListener('click', function () {

        const itemsArray = Array.from(_list.children);
        const itemToInsert = itemsArray.find(item => item.getAttribute('data-id') == _selectedItemId);

        if (itemToInsert) {
            let _li = document.createElement('li');
            _li.innerText = 'New Item ' + counter++;
            _li.setAttribute('data-id', counter);
            _list.insertBefore(_li, itemToInsert);
        }
    });

    document.querySelector('#btn-insert-after').addEventListener('click', function () {

        const itemsArray = Array.from(_list.children);
        const itemToInsert = itemsArray.find(item => item.getAttribute('data-id') == _selectedItemId);

        if (itemToInsert) {
            let _li = document.createElement('li');
            _li.innerText = 'New Item ' + counter++;
            _li.setAttribute('data-id', counter);
            
            if (itemToInsert.nextElementSibling) { //다음에 있는게 있으면
                _list.insertBefore(_li, itemToInsert.nextElementSibling); //다음에 추가
            }   else {
                _list.appendChild(_li); //마지막에 추가
            }
        }
    });



    _list.addEventListener('click', function (evt) {

        if (evt.target.tagName === 'LI') {

            //reset all color
            let _li = _list.children;
            for (let i = 0; i < _li.length; i++) {
                _li[i].style.color = 'black';
            }

            evt.target.style.color = 'red';
            // _selectedItemId = evt.target.attributes['data-id'];
            _selectedItemId = evt.target.getAttribute('data-id');

        }
    });

    _list.addEventListener('mouseover', function (evt) {
        if (evt.target.tagName === 'LI') {
            evt.target.classList.add('hover-effect');
        }
    });
    
    _list.addEventListener('mouseout', function (evt) {
        if (evt.target.tagName === 'LI') {
            evt.target.classList.remove('hover-effect');
        }
    });
    

    console.log('Hello World');
}

export default main;