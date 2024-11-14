
async function main() {
    // console.log('Hello World');

    document.getElementById('myId').innerText = 'Hello my myid';
    document.getElementsByName('myname')[0].innerText = 'Hello my myname';
    document.querySelector('.myclass').innerText = 'Hello my myclass';

    console.log(document.getElementById('myId')); // return element
    console.log(document.querySelector('#myId')); // return element

    console.log(document.querySelector('[name="myname"]')); // return first element
    console.log(document.getElementsByName('myname')); // return array

    console.log(document.querySelector('.myclass')); // return first element
    console.log(document.getElementsByClassName('myclass')); // return array

    document.querySelector('.myclass').addEventListener('click', function() {
        alert('Hello myname');
        console.log(this);

        this.style.color = 'red';
        this.innerText = 'Hello myname';
    });

    // console.log('Hello World');

    document.querySelector('[myattr="alice"]').innerText = 'Hello myattr';

    // document.querySelector('.Alice').innerText = 'Hello Alice';
    document.querySelector('.Alice').childNodes[0].nodeValue = 'Hello Alice';

}

export default main;