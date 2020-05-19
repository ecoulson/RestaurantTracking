const FormScreen = document.getElementById("screen-1");
const CheckingInScreen = document.getElementById("screen-2");
const SuccessScreen = document.getElementById("screen-3");

function showFormScreen() {
    show(FormScreen)
}

function show(element) {
    element.style.display = "block";
}

function showCheckingInScreen() {
    show(CheckingInScreen)
}

function showSuccessScreen() {
    show(SuccessScreen)
}

function hideFormScreen() {
    hide(FormScreen)
}

function hide(element) {
    element.style.display = "none";
}

function hideCheckingInScreen() {
    hide(CheckingInScreen)
}

function hideSuccessScreen() {
    hide(SuccessScreen)
}

function run() {
    showFormScreen();
    setTimeout(() => {
        hideFormScreen()
        showCheckingInScreen()
        setTimeout(() => {
            hideCheckingInScreen()
            showSuccessScreen()
        }, 5000)
    }, 5000)
}

run();