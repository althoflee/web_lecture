export default async function main() {

    const menuitems = document.querySelectorAll(".menu-item");

    let currentIndex = 0;

    menuitems.forEach((item, index) => {
        if(currentIndex == index)
            item.classList.add('selected')
        else 
            item.classList.remove('selected')
    });

    // 방향키 / 엔터 처리
    window.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowDown":
                 
                menuitems[currentIndex].classList.remove('selected')
                currentIndex = (currentIndex + 1) % menuitems.length;
                menuitems[currentIndex].classList.add('selected')
                
                e.preventDefault();
                break;

            case "ArrowUp":
                menuitems[currentIndex].classList.remove('selected')
                currentIndex = (currentIndex - 1 + menuitems.length) % menuitems.length;
                menuitems[currentIndex].classList.add('selected')
                e.preventDefault();
                break;

            case "Enter":
                // 선택된 메뉴 클릭 동작 연결 (필요 없으면 삭제)
                const selected = menuitems[currentIndex];

                console.log(selected)
                console.log(selected.dataset.action)
                
                e.preventDefault();
                break;
        }
    });



    console.log("hello es6");
}