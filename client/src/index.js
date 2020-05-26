import { AsYouType, parsePhoneNumberFromString } from '../../server/node_modules/libphonenumber-js'

const Screen1 = getScreen(1);
const Screen2 = getScreen(2);
const Screen3 = getScreen(3);
const Screen4 = getScreen(4);

const EmailInput = getById("email-input");
const PhoneNumberInput = getById("phone-input");
const SubmitButton = getById("submit");
const RestaurantName = getById("restaurant-name");
const ErrorMessage = getById("error-message");
const Screens = document.getElementsByClassName("screen");
const EmailRegex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");

PhoneNumberInput.addEventListener("keyup", (event) => {
    PhoneNumberInput.value = new AsYouType("US").input(PhoneNumberInput.value);
})

Array.from(Screens).forEach((screen) => {
    screen.style.height = `${window.innerHeight}px`;
})

window.addEventListener("resize", () => {
    Array.from(Screens).forEach((screen) => {
        screen.style.height = `${window.innerHeight}px`;
    });  
})

const QueryParameters = new URLSearchParams(window.location.search);
const RestaurantId = QueryParameters.get("restaurantId");

if (RestaurantId === null) {
    showError("Failed to find restaurant");
} else {
    updateRestaurantName();
}

async function updateRestaurantName() {
    try {
        const response = await getRestaurant();
        const payload = await response.json();
        RestaurantName.textContent = payload.data.restaurant.name;
        document.title = `Adapt: ${payload.data.restaurant.name}`
        fadeIn(Screen1);
    } catch(error) {
        showError("Failed to find restaurant");
    }
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
    }
    const number = parsePhoneNumberFromString(PhoneNumberInput.value, "US");
    if (PhoneNumberInput.value !== "" && !number.isValid()) {
        showError("Please enter a valid phone number");
    }
    if (!EmailRegex.test(EmailInput.value)) {
        showError("Please enter a valid email");
    }
    else {
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
    }, 500)
}

function fadeOut(element) {
    element.classList.add("fade-out-animation");
    setTimeout(() => {
        hide(element);
        element.classList.remove("fade-out-animation");
    }, 500)
}

function show(element) {
    element.style.display = "block";
}

function hide(element) {
    element.style.display = "none";
}