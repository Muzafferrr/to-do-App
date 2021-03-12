const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

//load items
loadItems();
//call event listener
eventListeners();

function eventListeners() {
    //submit event
    form.addEventListener('submit', addNewItem);
    //delete item
    taskList.addEventListener('click', deleteItem);
    //delete all items
    btnDeleteAll.addEventListener('click', deleteAllItems);
}
//load items
function loadItems(){
    items = getItemsFromLS();
    items.forEach(function(item){
        createItem(item);
    });
}
//get items from ls
function getItemsFromLS(){
    if(localStorage.getItem('items') === null){
        items = [];
    }
    else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}
//delete items from ls
function deleteItemFromLS(text){
    items = getItemsFromLS();
    items.forEach(function(item, index){
        if(item === text){
            items.splice(index, 1);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
}
//set item to ls 
function setItemToLS(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}
//create item
function createItem(text){
    const li = document.createElement('li');
        li.className = 'list-group-item list-group-item-secondary';
        li.appendChild(document.createTextNode(text));
        //create a
        const a = document.createElement('a');
        a.classList = 'delete-item float-right';
        a.setAttribute('href', '#');
        a.innerHTML = '<i class="fas fa-times"></i>';
        //add a to li
        li.appendChild(a);
        //add li to ul
        taskList.appendChild(li);
}
//add new item
function addNewItem(e) {
    if (input.value === '') {
        alert('add new item');
    }
    if (input.value !== '') {
        createItem(input.value);
        //save to ls 
        setItemToLS(input.value);
        //clear input
        input.value = '';
    }
    e.preventDefault();
}
//delete item
function deleteItem(e) {
        if (e.target.className === 'fas fa-times') {
            if (confirm('are you sure?')) {
            e.target.parentElement.parentElement.remove();
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}
//delete all items
function deleteAllItems(e) {
    if (confirm('are you sure?')) {
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
    e.preventDefault();
}
