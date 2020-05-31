import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js'
import IsEmail from 'isemail';

const Screen0 = getScreen(0);
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
const RestaurantSelect = getById("restaurant-select");

PhoneNumberInput.addEventListener("keyup", (event) => {
    if (event.keyCode !== 8) {
        const number = parsePhoneNumberFromString(PhoneNumberInput.value, "US");
        console.log(number);
        PhoneNumberInput.value = new AsYouType("US").input(number.nationalNumber);
    }
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
let restaurantId = QueryParameters.get("restaurantId");
let restaurants = [];

RestaurantSelect.addEventListener("change", handleSelectChange);

main();

async function main() {
    if (restaurantId === null) {
        const restaurantsResponse = await getAllRestaurants();
        const payload = await restaurantsResponse.json();
        restaurants = payload.data.restaurants;
        fadeIn(Screen0);
        populateSelectMenu();
    } else {
        updateRestaurantName();
    }
}

function populateSelectMenu() {
    restaurants.forEach((restaurant) => {
        if (!RestaurantSelect.value) {
            restaurantId = restaurant._id
            RestaurantSelect.value = restaurant._id;
        }
        const option = document.createElement("option");
        option.value = restaurant._id;
        option.innerHTML = restaurant.name;
        RestaurantSelect.append(option);
    })
}

function handleSelectChange() {
    restaurantId = RestaurantSelect.value.toString();
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
    return fetch(`/restaurant/${restaurantId}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
    })
}

function getAllRestaurants() {
    return fetch(`/restaurant/`, {
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
    const number = parsePhoneNumberFromString(PhoneNumberInput.value, "US");
    if (getInputValue(EmailInput) == "" && getInputValue(PhoneNumberInput) == "") {
        showError("Please enter a phone number or email.");
    } else if (PhoneNumberInput.value !== "" && !number.isValid()) {
        showError("Please enter a valid phone number");
    } else if (EmailInput.value !== "" && !IsEmail.validate(EmailInput.value)) {
        showError("Please enter a valid email");
    } else {
        hide(Screen1);
        hide(Screen0);
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
            email: getInputValue(EmailInput) == "" ? null : getInputValue(EmailInput),
            number: getInputValue(PhoneNumberInput) == "" ? null : getInputValue(PhoneNumberInput),
            restaurantId: restaurantId
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