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

// if token exist, redirect to index.html

{
  let temporary_storage = localStorage.getItem('USER')
    ? JSON.parse(localStorage.getItem('USER'))
    : {};

  if (temporary_storage.user && temporary_storage.user.sessionToken) {
    document.getElementById("login-button").style.display = 'none';
    document.getElementById("register-button").style.display = 'none';
    _readUser(temporary_storage.user.objectId).then(
      (response) => {
        document.getElementById("userEmail").innerHTML += response.email;
      }
    )
  } else {
    window.location.replace(`signin.html?theme=${night_mode}`);
    document.getElementById("signout-button").style.display = 'none';
  }

  _getPost().then(
    (response) => {
      console.log(response)
      createPost();
      response.posts.forEach(showPost);
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
          user: {},
        })
      )
      location.reload();
    }
  )
}


function showPost(post, index) {
  const card = document.createElement('div');
  card.className = "card col-12 col-sm-5";
  const header = document.createElement('div');
  header.className = "row";
  const headerColumn = document.createElement('div');
  headerColumn.className = 'col';
  const title = document.createElement('h3');
  title.innerHTML = post.title;
  const inputField = document.createElement('input');
  inputField.className = 'form-control';
  inputField.value = post.title;
  inputField.style.display = 'none';
  headerColumn.append(title);
  headerColumn.append(inputField);
  header.append(headerColumn);
  card.append(header);

  const content = document.createElement('div');
  content.className = "row";
  const contentColumn = document.createElement('div');
  contentColumn.className = 'col';
  const paragraph = document.createElement('p');
  paragraph.innerHTML = post.content;
  const textArea = document.createElement('textarea');
  textArea.className = 'form-control';
  textArea.rows = '3';
  textArea.innerHTML = post.content;
  textArea.style.display = 'none';
  contentColumn.append(paragraph);
  contentColumn.append(textArea);
  content.append(contentColumn);
  card.append(content);

  const buttonsRow = document.createElement('div');
  buttonsRow.className = 'row';

  const editRow = document.createElement('div');
  editRow.className = 'col col-6 center';
  const editButton = document.createElement('button');
  let onEditingMode = false;
  editButton.className = 'btn btn-block btn-success';
  editButton.addEventListener('click',
    async () => {
      if (onEditingMode) {
        await _editPost(inputField.value, textArea.value, post.objectId);
        location.reload();
      } else {
        title.style.display = 'none';
        inputField.style.display = 'inherit';
        paragraph.style.display = 'none';
        textArea.style.display = 'inherit';
        removeButton.innerHTML = 'لغو';
        editButton.innerHTML = 'ثبت';
        onEditingMode = true;
      }
    }
  )
  editButton.innerHTML += 'ویرایش';
  editRow.append(editButton);

  const removeRow = document.createElement('div');
  removeRow.className = 'col col-6 center';
  const removeButton = document.createElement('button');
  removeButton.className = 'btn btn-block btn-danger';
  removeButton.addEventListener('click',
    async () => {
      if (onEditingMode) {
        title.style.display = 'inherit';
        inputField.style.display = 'none';
        paragraph.style.display = 'inherit';
        textArea.style.display = 'none';
        removeButton.innerHTML = 'حذف';
        editButton.innerHTML = 'ویرایش';
        onEditingMode = false;
      } else {
        await _deletePost(post.objectId);
        location.reload();
      }
    }
  )
  removeButton.innerHTML += 'حذف';
  removeRow.append(removeButton);

  buttonsRow.append(editRow);
  buttonsRow.append(removeRow);
  card.append(buttonsRow);

  document.getElementById("cardHolder").append(card);
}





function createPost() {

  const card = document.createElement('div');
  card.className = "card col-5";
  const header = document.createElement('div');
  header.className = "row";
  const headerColumn = document.createElement('div');
  headerColumn.className = 'col';
  const title = document.createElement('input');
  title.className = 'form-control';
  title.value = 'عنوان پست';
  headerColumn.append(title);
  header.append(headerColumn);
  card.append(header);

  const content = document.createElement('div');
  content.className = "row";
  const contentColumn = document.createElement('div');
  contentColumn.className = 'col';
  const textArea = document.createElement('textarea');
  textArea.className = 'form-control';
  textArea.rows = '3';
  textArea.innerHTML += 'متن پست را اینجا وارد کنید!';
  contentColumn.append(textArea);
  content.append(contentColumn);
  card.append(content);

  const buttonRow = document.createElement('div');
  buttonRow.className = 'row';

  const submitButtonColumn = document.createElement('div');
  submitButtonColumn.className = 'col col-12 center';
  const submitButton = document.createElement('button');
  submitButton.className = 'btn btn-block btn-success';
  submitButton.addEventListener('click',
    async () => {
      await _createPost(title.value, textArea.value);
      location.reload();
    }
  )
  submitButton.innerHTML += 'ثبت';
  submitButtonColumn.append(submitButton);

  buttonRow.append(submitButtonColumn);
  card.append(buttonRow);

  document.getElementById("cardHolder").append(card);
}