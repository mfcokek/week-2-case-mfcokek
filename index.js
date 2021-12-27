var name;
document.getElementById("name-title").innerHTML = localStorage.getItem(name);

function takeName() {
    localStorage.setItem(name, document.getElementById("name").value);
}

function deleteItem(id) {
    fetch('https://61c404f4f1af4a0017d99206.mockapi.io/todos/' + id, {
        method: 'DELETE',
    })
    const myTimeout = setTimeout(reloadPage, 500);
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

function reloadPage() {
    location.reload();
}

function addItem() {
    value = document.getElementById("input-todo").value
    console.log(typeof(value));
    if (value.length < 3) {
        alert("Bir todo en az 3 haneli olmak zorunda");
    } else {
        fetch('https://61c404f4f1af4a0017d99206.mockapi.io/todos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: value
            })
        })
        document.getElementById("input-todo-btn").innerHTML = `<div class="spinner-border text-success" role="status"></div>`

        const myTimeout = setTimeout(reloadPage, 1000);
    }

}

window.addEventListener('load', async function() {
    const res = await fetch('https://61c404f4f1af4a0017d99206.mockapi.io/todos/');
    const data = await res.json();
    const todoItems = document.querySelector('#todo-items');
    let html = []

    data.forEach(item => {
        html.push(`
        <li class=" item list-group-item">
            <input class="form-check-input me-1" type="checkbox" onchange="completeItem(${item.id})" ${item.isCompleted && "checked"}>
            <input type="text" class="item-text" value="${item.content}" id="${item.id}">
            <button class="delete-button btn btn-dark btn-sm" onclick="deleteItem(${item.id})">X</button>
            <button class="update-button btn btn-dark btn-sm" onclick="updateItem(${item.id})">✓</button>
        </li>`)
    });
    todoItems.innerHTML = html;

})
