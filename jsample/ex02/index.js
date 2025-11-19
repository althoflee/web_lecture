export default async function main() {

    const menu = document.getElementById("main-menu");
    const creditPage = document.getElementById("credit-screen");
    const optionPage = document.getElementById("option-screen");
    const menuitems = document.querySelectorAll(".menu-item");
    const gameScreen = document.getElementById("game-screen");

    let currentIndex = 0;
    let isCreditMode = false;
    let isOptionMode = false;
    let isGameMode = false;

    function updateSelection() {
        menuitems.forEach((item, index) => {
            item.classList.toggle("selected", index === currentIndex);
        });
    }

    function showMenu() {
        isCreditMode = false;
        isOptionMode = false;

        optionPage.style.display = "none";
        creditPage.style.display = "none";


        menu.style.display = "flex";
    }

    function showCredit() {
        isCreditMode = true;
        isOptionMode = false;
        menu.style.display = "none";
        creditPage.style.display = "flex";
    }

    function showOptions() {
        isOptionMode = true;
        isCreditMode = false;
        menu.style.display = "none";
        optionPage.style.display = "flex";
    }

    function showGameScreen() {
        isGameMode = true;
        isCreditMode = false;
        isOptionMode = false;
        menu.style.display = "none";
        optionPage.style.display = "none";
        creditPage.style.display = "none";
        gameScreen.style.display = "flex";
    }

    

    // 초기 메뉴 활성화
    showMenu();
    updateSelection();

    // 방향키 / 엔터 처리
    window.addEventListener("keydown", (e) => {

        // CREDIT 화면이면 아무 키나 누르면 복귀
        if (isCreditMode) {
            showMenu();
            return;
        }
        if (isOptionMode) {
            showMenu();
            return;
        }

        switch (e.key) {
            case "ArrowDown":
                currentIndex = (currentIndex + 1) % menuitems.length;
                updateSelection();
                e.preventDefault();
                break;

            case "ArrowUp":
                currentIndex = (currentIndex - 1 + menuitems.length) % menuitems.length;
                updateSelection();
                e.preventDefault();
                break;

            case "Enter":
                const selected = menuitems[currentIndex];
                const action = selected.dataset.action;
                
                if (action === "credit") {
                    showCredit();
                } else if (action === "option") {
                    showOptions();
                } else if (action === "start") {
                    showGameScreen();
                }


                console.log("Selected:", action);
                e.preventDefault();
                break;
        }
    });

    console.log("Game Menu Active");
}

