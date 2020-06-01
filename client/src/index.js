import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js'
import IsEmail from 'isemail';
import moment from "moment";

const Screen0 = getScreen(0);
const Screen1 = getScreen(1);
const Screen2 = getScreen(2);
const Screen3 = getScreen(3);
const Screen4 = getScreen(4);

let EmailInput = getById("email-input");
let PhoneNumberInput = getById("phone-input");
let SubmitButton = getById("submit");
const RestaurantName = getById("restaurant-name");
const ErrorMessage = getById("error-message");
const Screens = document.getElementsByClassName("screen");
const RestaurantSearch = getById("restaurant-search");
const DropdownMenu = getById("restaurant-dropdown");
const TimeOfEntry = getById("time-input");

document.addEventListener("click", (event) => {
    if (!event.target.classList.contains("restaurant-dropdown-menu-item") && !event.target.classList.contains("form-inputs")) {
        clearDropdown();
    }
});

RestaurantSearch.addEventListener("focusin", (event) => {
    const filteredRestaurants = filterRestaurants(event.target.value).slice(0, 5);
    clearDropdown();
    renderDropdown(filteredRestaurants);
})

RestaurantSearch.addEventListener("keydown", (event) => {
    if (event.metaKey || event.ctrlKey) {
        return;
    }
    let name = event.target.value;
    if (event.keyCode === 8) {
        name = name.substring(0, name.length - 1)
    } else {
        name += event.key;
    }
    const filteredRestaurants = filterRestaurants(name).slice(0, 5);
    clearDropdown();
    renderDropdown(filteredRestaurants);
});

function filterRestaurants(name) {
    return restaurants.filter((restaurant) => {
        return restaurant.name.toLowerCase().startsWith(name.toLowerCase());
    }).sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });
}

function clearDropdown() {
    DropdownMenu.innerHTML = "";
}

function renderDropdown(restaurants) {
    restaurants.forEach((restaurant) => {
        DropdownMenu.append(createDropdownElement(restaurant));
    });
}

function createDropdownElement(restaurant) {
    const element = document.createElement("p");
    element.classList.add("restaurant-dropdown-menu-item")
    element.setAttribute("restaurant-id", restaurant._id)
    element.addEventListener("click", (event) => {
        const id = event.target.getAttribute("restaurant-id") 
        if (id) {
            RestaurantSearch.value = event.target.innerText;
            restaurantId = id;
            clearDropdown();
        }
    })
    element.innerText = restaurant.name;
    return element;
}

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

main();

async function main() {
    if (restaurantId === null) {
        EmailInput = getById("email-input-general");
        PhoneNumberInput = getById("phone-input-general");
        SubmitButton = getById("submit-general");
        listenForClick(SubmitButton, submit);
        const restaurantsResponse = await getAllRestaurants();
        const payload = await restaurantsResponse.json();
        restaurants = payload.data.restaurants;
        fadeIn(Screen0);
        populateSelectMenu();
        PhoneNumberInput.addEventListener("keyup", (event) => {
            if (event.keyCode !== 8) {
                const number = parsePhoneNumberFromString(PhoneNumberInput.value, "US");
                console.log(number);
                PhoneNumberInput.value = new AsYouType("US").input(number.nationalNumber);
            }
        })
    } else {
        listenForClick(SubmitButton, submit);
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

async function updateRestaurantName() {
    try {
        const response = await getRestaurant();
        const payload = await response.json();
        RestaurantName.textContent = payload.data.restaurant.name;
        document.title = `Adapt: ${payload.data.restaurant.name}`;
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

function listenForClick(element, onClickHandler) {
    element.addEventListener("click", onClickHandler);
}

async function submit() {
    const number = parsePhoneNumberFromString(PhoneNumberInput.value, "US");
    if (!restaurantId) {
        showError("Please select where you ate");
    } else if (getInputValue(EmailInput) == "" && getInputValue(PhoneNumberInput) == "") {
        showError("Please enter a phone number or email.");
    } else if (PhoneNumberInput.value !== "" && !number.isValid()) {
        showError("Please enter a valid phone number");
    } else if (EmailInput.value !== "" && !IsEmail.validate(EmailInput.value)) {
        showError("Please enter a valid email");
    } else {
        if (TimeOfEntry.value !== "") {
            const time = moment(TimeOfEntry.value, "MM/DD/YYYY hh:mm A", true);
            time.toDate()
            if (!time.isValid()) {
                showError("Invalid entry date");
                return;
            }
        }
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
            timeCheckedIn: getInputValue(TimeOfEntry) == "" ? null : moment(TimeOfEntry.value, "MM/DD/YYYY hh:mm A", true).toDate(),
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