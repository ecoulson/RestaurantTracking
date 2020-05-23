/* Flow Screens

Screen 1
Actions
________
1. people will enter either their email or phone number
2. they will then submit
3. we check that they have included an email or phone number
4. if they have included an email or phone 
    number we then send them to page 2 otherwise 
    we display some feedback to the user prompting them
    to enter an email or phone number
5. we then send the data to our server (requires evan's code)

Todos
_____
1. we need to get the html inputs for email and phone
2. we can check their values for an email or phone number

Screen 2
________
1. we wait for the server to tell us that it has received and check in the user
2. if it sucessfully checks in the user then it goes to screen3 otherwise it goes to screen 4

Screen 3
________
No actions can be taken

Screen 4
________
no actions can be taken
*/


const Screen1 = getScreen(1);
const Screen2 = getScreen(2);
const Screen3 = getScreen(3);
const Screen4 = getScreen(4);

const EmailInput = getById("email-input");
const PhoneNumberInput = getById("phone-input");
const SubmitButton = getById("submit");
const RestaurantName = getById("restaurant-name");
const ErrorMessage = getById("error-message");


const QueryParameters = new URLSearchParams(window.location.search);
const RestaurantId = QueryParameters.get("restaurantId");

updateRestaurantName();

async function updateRestaurantName() {
    const response = await getRestaurant();
    const payload = await response.json();
    RestaurantName.textContent = payload.data.restaurant.name;
}

function getRestaurant() {
    return fetch(`/restaurant/${RestaurantId}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
    })
}

listenForClick(SubmitButton, submit);                      

function listenForClick(element, onClickHandler) {
    element.addEventListener("click", onClickHandler);
}

async function submit() {
    if (getInputValue(EmailInput) == "" && getInputValue(PhoneNumberInput) == "") {
        showError("Please enter a phone number or email.");
    } else {
        hide(Screen1);
        show(Screen2);
        const response = await sendFormDataToServer();
        const payload = await response.json();
        if (payload.success) {
            hide(Screen2);
            show(Screen3);
        } else{
            hide(Screen2);
            show(Screen4);
        }
    }
}

function showError(message) {
    ErrorMessage.textContent = message;
    fadeIn(ErrorMessage);
    setTimeout(function () {
        fadeOut(ErrorMessage);
    }, 5 * 1000);
}

function sendFormDataToServer() {
    return fetch("/check_in", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: getInputValue(EmailInput) == "" ? " " : getInputValue(EmailInput),
            number: getInputValue(PhoneNumberInput) == "" ? " " : getInputValue(PhoneNumberInput),
            restaurantId: RestaurantId
        })
    })
}

function getInputValue(element) {
    return element.value
}

function getScreen(id) {
    return getById(`screen-${id}`);
}

function getById(id) {
    return document.getElementById(id);
}

function fadeIn(element) {
    show(element);
    element.classList.add("fade-in-animation");
    setTimeout(() => {
        element.classList.remove("fade-in-animation");
    }, 1000)
}

function fadeOut(element) {
    element.classList.add("fade-out-animation");
    setTimeout(() => {
        hide(element);
        element.classList.remove("fade-out-animation");
    }, 1000)
}

function show(element) {
    element.style.display = "block";
}

function hide(element) {
    element.style.display = "none";
}

show(Screen1);