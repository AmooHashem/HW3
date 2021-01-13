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

    if (temporary_storage.token) {
        document.getElementById("login-button").style.display = 'none';
        document.getElementById("register-button").style.display = 'none';
    } else {
        document.getElementById("signout-button").style.display = 'none';
    }

    _getAllPosts().then(
        (response) => {
            console.log(response)
            // response.posts.forEach(myFunction);
            showPost();
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
                    token: '',
                })
            )
            location.reload();
        }
    )
}



function showPost(item, index) {
    const cardHolder = document.getElementById("cardHolder");
    console.log(cardHolder)
    cardHolder.innerHTML += '<div class="card">'+

    '<div class="datum team-rank">'+
      '<div class="rank">'+
        رتبه
      </div>
      <div class="rank-number">
        ۲۳
      </div>
    </div>


    <div class="datum score-section">
      <div class="key">امتیاز</div>
      <div class="score">۱۴</div>
    </div>


    <div class="datum">
      <div class="key">
        نام تیم
      </div>
      <div class="value">
        وب چمپز
      </div>
    </div>


    <div class="datum">
      <div class="key key-uni">
        نام دانشگاه و کشور
      </div>
      <div class="value">
        صنعتی شریف - ایران
      </div>
    </div>

  </div>
'
} 