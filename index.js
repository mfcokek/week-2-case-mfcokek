var name;
//index.html den gelen takename'den gelen değeri name-title'a yazıyoruz
document.getElementById("name-title").innerHTML = localStorage.getItem(name);
var dark
let html = ""

//aşağıda tema buttonuna tıklandında localstorage da tutulan değer değiştirilir veya tema ayarlanır
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
//ilk sayfada girilen değer local storage'a atanır
function takeName() {
    localStorage.setItem(name, document.getElementById("name").value);
}
//girilen değer id üzerinden silinir ve liste yeniden yüklenir
async function deleteItem(id) {
    await fetch('https://61c404f4f1af4a0017d99206.mockapi.io/todos/' + id, {
        method: 'DELETE',
    })
    load()
}
//gelen id üzerinden içeriğin value'si güncellenir
function updateItem(id) {
    if (document.getElementById(id).value.length > 2) {
        fetch('https://61c404f4f1af4a0017d99206.mockapi.io/todos/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: document.getElementById(id).value,
            })
        })
    } else {
        alert("Bir todo en az 3 haneli olmak zorunda");
    }
}
//ilk önce önceden true mu false mu olduğu sorgulanur ona göre değiştirilir
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
    //input içerisindeki değer alınır
    value = document.getElementById("input-todo").value
    
    //hane kontrolü
    if (value.length < 3) {
        alert("Bir todo en az 3 haneli olmak zorunda");
    } else {
        //sorgu sürecinde ekle yerine spinner gelir
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
        //işlem tamamlandıktan sonra spinner yerine yeniden Ekle yazısı gelir ve inputun içerisi boşaltılır
        document.getElementById("input-todo-btn").innerHTML = `Ekle`
        document.getElementById("input-todo").value = ""
        load()
    }
}
//liste içeriği burada oluşturulur gelen bütün veriler foreach içinde döner ve kullanılacak işlemler için id tag'lerine id atanır
async function load() {
    const res = await fetch('https://61c404f4f1af4a0017d99206.mockapi.io/todos/');
    const data = await res.json();
    const todoItems = document.querySelector('#todo-items');
    html = ""
    data.forEach(item => {
        html = html + `
    <li class=" item list-group-item">
        <input class="form-check-input me-1" type="checkbox"
         onchange="completeItem(${item.id})" ${item.isCompleted && "checked"}
         style = "margin-top: 20px;"
         >
        <input type="text" class="item-text" onchange="updateItem(${item.id})" value="${item.content}" id="${item.id}">
        <button class="delete-button btn btn-dark btn-sm" onclick="deleteItem(${item.id})">Sil</button>
    </li>`
    });
    todoItems.innerHTML = html;
}
//sayfa ilk yüklenirken burası çalışır gelen tema değişkenine göre tema ayarlanır ve liste yüklenir
window.addEventListener('load', async function() {
    if (localStorage.getItem(dark) == "true") {
        document.body.style.backgroundColor = "#A3E4DB"
        document.getElementById("name-title").style.color = "black"
    } else {
        document.body.style.backgroundColor = "#30475E"
        document.getElementById("name-title").style.color = "white"
    }
    load()
})
