var name;
document.getElementById("name-title").innerHTML = localStorage.getItem(name);
var dark


function theme() {
    if (localStorage.getItem(dark) == "false") {
        document.body.style.backgroundColor = "#A3E4DB"
        document.getElementById("name-title").style.color = "black"
        localStorage.setItem(dark, true)
    } else {
        document.body.style.backgroundColor = "#30475E"
        document.getElementById("name-title").style.color = "white"
        localStorage.setItem(dark, false)
    }

}

function reloadPage() {
    location.reload();
}

function takeName() {
    localStorage.setItem(name, document.getElementById("name").value);
}

async function deleteItem(id) {
    await fetch('https://61c404f4f1af4a0017d99206.mockapi.io/todos/' + id, {
        method: 'DELETE',
    })
    reloadPage();
}

function updateItem(id) {
    fetch('https://61c404f4f1af4a0017d99206.mockapi.io/todos/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: document.getElementById(id).value,
        })
    })
}

async function completeItem(id) {
    const res = await fetch('https://61c404f4f1af4a0017d99206.mockapi.io/todos/' + id);
    const data = await res.json();
    if (data.isCompleted) {
        fetch('https://61c404f4f1af4a0017d99206.mockapi.io/todos/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isCompleted: false
            })
        })
    } else {
        fetch('https://61c404f4f1af4a0017d99206.mockapi.io/todos/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isCompleted: true
            })
        })
    }
}



async function addItem() {
    value = document.getElementById("input-todo").value

    if (value.length < 3) {
        alert("Bir todo en az 3 haneli olmak zorunda");
    } else {
        document.getElementById("input-todo-btn").innerHTML = `<div class="spinner-border text-success" role="status"></div>`
        await fetch('https://61c404f4f1af4a0017d99206.mockapi.io/todos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: value
            })
        })
        reloadPage();

    }
}

window.addEventListener('load', async function() {
    const res = await fetch('https://61c404f4f1af4a0017d99206.mockapi.io/todos/');
    const data = await res.json();
    const todoItems = document.querySelector('#todo-items');
    let html = ""

    data.forEach(item => {
        html = html + `
        <li class=" item list-group-item">
            <input class="form-check-input me-1" type="checkbox"
             onchange="completeItem(${item.id})" ${item.isCompleted && "checked"}
             style = "margin-top: 20px;"
             >
            <input type="text" class="item-text" value="${item.content}" id="${item.id}">
            <button class="delete-button btn btn-dark btn-sm" onclick="deleteItem(${item.id})">X</button>
            <button class="update-button btn btn-dark btn-sm" onclick="updateItem(${item.id})">✓</button>
        </li>`
    });
    todoItems.innerHTML = html;


    if (localStorage.getItem(dark) == "true") {
        document.body.style.backgroundColor = "#A3E4DB"
        document.getElementById("name-title").style.color = "black"
    } else {
        document.body.style.backgroundColor = "#30475E"
        document.getElementById("name-title").style.color = "white"
    }


})
