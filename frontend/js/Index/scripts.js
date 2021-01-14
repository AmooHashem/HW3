let night_mode = 'day';
let sidebar_status = 'close';

const urlParams = new URLSearchParams(window.location.search);
night_mode = urlParams.get('theme');
if (night_mode == undefined || night_mode == "null") night_mode = "day";
if (night_mode == "night") {
    night_mode = "day";
    // change_light_mode();
    let swtch = document.getElementById("night-mode-switch");
    swtch.onclick();
    swtch.checked = true;
}

function change_light_mode() {
    if (night_mode === 'day') {
        night_mode = 'night';
        document.getElementById("sidebar").classList.add("night-mode");
        document.getElementById('main').classList.add("night-mode");
        document.getElementById("navbar").classList.add("night-mode");
        document.getElementById("buttons-container").classList.add("night-mode");

        if (table = document.getElementById("data-container-table")) {
            table.classList.add("night-mode");
        }
        if (div = document.getElementsByClassName("bottom-table-button-container")[0]) {
            div.classList.add("night-mode");
        }
        cards = document.getElementsByClassName('card');
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.add('night-mode')
        }
    } else {
        night_mode = 'day';
        document.getElementById("sidebar").classList.remove("night-mode");
        document.getElementById('main').classList.remove("night-mode");
        document.getElementById("navbar").classList.remove("night-mode");
        document.getElementById("buttons-container").classList.remove("night-mode");
        document.getElementById("data-container-table").classList.remove("night-mode");
        document.getElementsByClassName("bottom-table-button-container")[0].classList.remove("night-mode");
        cards = document.getElementsByClassName('card');
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.remove('night-mode')
        }
    }
}

function change_sidebar_status() {
    if (sidebar_status === 'close') {
        sidebar_status = 'open';
        document.getElementById("sidebar").style.left = '0px';
        document.getElementById("sidebar-close-btn").style.display = 'inline';
        document.getElementById("sidebar-open-btn").style.display = 'none';

    } else {
        sidebar_status = 'close';
        document.getElementById("sidebar").style.left = '-1000px';
        document.getElementById("sidebar-close-btn").style.display = 'none';
        document.getElementById("sidebar-open-btn").style.display = 'inline';
    }
}

// for page transition:

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

///////////////////////////////

{
    let temporary_storage = localStorage.getItem('USER')
        ? JSON.parse(localStorage.getItem('USER'))
        : {};

    if (temporary_storage.user && temporary_storage.user.sessionToken) {
        document.getElementById("login-button").style.display = 'none';
        document.getElementById("register-button").style.display = 'none';
    } else {
        document.getElementById("signout-button").style.display = 'none';
    }

    _getAllPosts().then(
        (response) => {
            console.log(response)
            response.posts.forEach(makePost);
        },
        () => {
            console.log("ERROR")
        }
    )
}


const signout = () => {
    _signout().then(
        (response) => {
            localStorage.setItem(
                'USER',
                JSON.stringify({
                    user: {}
                })
            )
            location.reload();
        }
    )
}


function makePost(post, index) {
    const card = document.createElement('div');
    card.className = "card col-12 col-sm-5";
    const header = document.createElement('div');
    header.className = "row";
    header.innerHTML += '<div class="col"><h3>' + post.title + '</h3><hr /></div>';
    card.append(header);
    const content = document.createElement('div');
    content.className = "row";
    content.innerHTML += '<div class="col"><p>' + post.content + '</p></div>';
    card.append(content);

    document.getElementById("cardHolder").append(card);
}