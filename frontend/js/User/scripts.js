const urlParams = new URLSearchParams(window.location.search);
const requestedTab = urlParams.get('tab');
let night_mode = urlParams.get('theme');

if (night_mode == "night") {
    night_mode = "day";
    change_theme();
} else {
    night_mode = "day";
}

let temporary_storage = localStorage.getItem('USER')
    ? JSON.parse(localStorage.getItem('USER'))
    : {};

if (temporary_storage.token) {
    goHome();
}

function change_theme() {
    let elements = Array.from(document.querySelectorAll(".minimal-navbar, .signin-body, #main-form, #sign-form, .signin-form, .form-container"));
    night_mode = (night_mode == "night" ? "day" : "night");

    if (night_mode == "night") {
        elements.forEach(element => {
            element.classList.add("night-mode");
        });
        document.getElementById("pointless-picture").srcset = "files/signup-highQ-dark.jpg"
        document.getElementById("pointless-image").src = "files/signup-highQ-dark.jpg"
    } else {
        elements.forEach(element => {
            element.classList.remove("night-mode");
            document.getElementById("pointless-picture").srcset = "files/signup-highQ-light.jpg"
            document.getElementById("pointless-image").src = "files/signup-highQ-light.jpg"
        });
    }
}

isFormValid = true;
let validationErrorMessage = "";

if (requestedTab == "signup") {
    change_form_to_signup()
} else {
    change_form_to_signin()
}

function change_form_to_signin() {
    document.getElementById('signin-head-button').classList.add('selected-form-button');
    document.getElementById('signup-head-button').classList.remove('selected-form-button');
    document.getElementById('signup-form').classList.remove('displayed-form');
    document.getElementById('signin-form').classList.add('displayed-form');
}

function change_form_to_signup() {
    document.getElementById('signup-head-button').classList.add('selected-form-button');
    document.getElementById('signin-head-button').classList.remove('selected-form-button');
    document.getElementById('signup-form').classList.add('displayed-form');
    document.getElementById('signin-form').classList.remove('displayed-form');
}

function validateSignupForm(event) {
    event.preventDefault();

    let div = document.getElementById('signup-form-error');
    let label = div.getElementsByTagName("label")[0];

    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let confirm_password = document.getElementById("password-confirm");


    isFormValid = validatePassword(password, confirm_password) && email.validity.valid;
    if (isFormValid) {
        div.style.display = "none";
        signup(email.value, password.value).then(
            (response) => {
                div.style.display = "flex";
                label.innerHTML = 'اکانت شما با موفقیت ساخته شد!';
                localStorage.setItem(
                    'USER',
                    JSON.stringify({
                        token: response.sessionToken,
                    })
                )
                setTimeout(() => {
                    goHome();
                }, 3000);
            },
            (error) => {
                div.style.display = "flex";
                label.innerHTML = error;
            }
        ).catch(
            (error) => {
                div.style.display = "flex";
                label.innerHTML = error;
            }
        )
    } else {
        div.style.display = "flex";
        label.innerHTML = validationErrorMessage;
    }
}

function validateSigninForm(event) {
    event.preventDefault();

    let div = document.getElementById('signin-form-error');
    let label = div.getElementsByTagName("label")[0];

    let email = document.getElementById("signin-email");
    let password = document.getElementById("signin-password");


    isFormValid = validatePassword(password) && email.validity.valid;
    if (isFormValid) {
        div.style.display = "none";
        signin(email.value, password.value).then(
            (response) => {
                div.style.display = "flex";
                label.innerHTML = 'خوش آمدید!';
                localStorage.setItem(
                    'USER',
                    JSON.stringify({
                        token: response.sessionToken,
                    })
                )
                setTimeout(() => {
                    goHome();
                }, 3000);
            },
            (error) => {
                div.style.display = "flex";
                label.innerHTML = error;
            }
        ).catch(
            (error) => {
                div.style.display = "flex";
                label.innerHTML = error;
            }
        )
    } else {
        div.style.display = "flex";
        label.innerHTML = validationErrorMessage;
    }
}

function goHome() {
    window.location.replace(`index.html?theme=${night_mode}`);
}

function validatePassword(password, confirm_password) {
    if (password.value.length < 5) {
        password.isValid = false;
        validationErrorMessage = 'پسورد باید حداقل ۵ حرف باشد.';
        return false;
    }
    if (confirm_password == undefined) {
        return true;
    }
    if (password.value != confirm_password.value) {
        confirm_password.isValid = false
        validationErrorMessage = "پسوردها همخوانی ندارند.";
        return false
    } else {
        password.isValid = true;
        validationErrorMessage = "";
        confirm_password.isValid = true;
        return true;
    }
}

// for page transitions:

window.transitionToPage = function (href) {
    document.querySelector('body').style.opacity = 0
    setTimeout(function () {
        window.location.href = href
    }, 500)
}

document.addEventListener('DOMContentLoaded', function (event) {
    setTimeout(function () {
        document.querySelector('body').style.opacity = 1
    }, 0)
})