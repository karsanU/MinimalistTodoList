const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

// Initialize the local storage
if (localStorage.getItem("itemCountSpan") === null) {
  localStorage.itemCountSpan = "0"

} else {
  document.getElementById('item-count').innerHTML = localStorage.getItem("itemCountSpan")
}

if (localStorage.getItem("uncheckedCountSpan") === null) {
  localStorage.setItem("uncheckedCountSpan", "0")

} else {
  document.getElementById('unchecked-count').innerHTML = localStorage.getItem("uncheckedCountSpan")

}

// content
if (localStorage.getItem("todoList") === null) {
  localStorage.setItem(("todoList"), JSON.stringify(" "))

} else {
  document.getElementById('todo-list').innerHTML = JSON.parse(localStorage.todoList)
  // if the item is previously checked set check
  items = document.getElementsByTagName("li")

  for (var i = 0; i < items.length; i++) {
    if (items[i].firstChild.style.color === "rgb(221, 221, 221)") {
      console.log(items[0].firstChild.style.color === "rgb(221, 221, 221)")
      items[i].getElementsByTagName("input")[0].checked = true
    }
  }
}
const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')



// updates local storage with the temporary storage 
function updateLocalStorage() {
  localStorage.itemCountSpan = itemCountSpan.innerHTML
  localStorage.uncheckedCountSpan = uncheckedCountSpan.innerHTML
  localStorage.todoList = JSON.stringify(list.innerHTML)

}

// set Date and month
var dateObj = new Date();

var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "Apr";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

var day = weekday[dateObj.getDay()];
var month = month[dateObj.getMonth()];
var date = dateObj.getUTCDate();



newDate = day + ", " + month + " " + date

document.getElementById("todaysDate").innerHTML = newDate;


// Create a new todo item item when enter is clicked in input
// Get the input field
var input = document.getElementById("inputFormData");
// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault()
    // Trigger the button element with a click
    document.getElementById("addImg").click()
  }
})

// Create a new todo item
function newTodo() {

  const todoText = document.getElementById("inputFormData").value
  if (todoText === "") {
    return false;
  } else {
    document.getElementById("inputFormData").value = ""
    // Create a new todo item and append
    const item = document.createElement("li") // Create a <li> element
    const p = document.createElement("p")
    p.style.alignSelf = "center"
    p.style.paddingBottom = "5px"
    p.innerHTML = todoText // Insert text
    item.className = "todo-container"
    item.appendChild(p)
    const list = document.getElementById('todo-list')
    list.appendChild(item)  // Append <li> to <ul>


    // Create a new check button and append
    const checkBox = document.createElement("input")  // Create a <button> element
    checkBox.setAttribute("type", "checkbox")
    checkBox.className = "todo-checkbox"
    checkBox.setAttribute("onClick", "checkItem()");
    item.appendChild(checkBox)

    // create a new delete button and append
    const deleteBox = document.createElement("img")  // Create a <button> element
    deleteBox.src = "img/delete.png"
    deleteBox.className = "todo-delete"
    deleteBox.setAttribute("onClick", "deleteItem()");

    item.append(deleteBox)

  }

  // increase count 
  itemCountSpan.innerHTML = parseInt(itemCountSpan.innerHTML) + 1
  uncheckedCountSpan.innerHTML = parseInt(uncheckedCountSpan.innerHTML) + 1

  // update local storage
  updateLocalStorage()
}

// modify the <p> in the <li> of the button
function checkItem() {
  item = event.target.parentElement
  // reduced unchecked count 
  if (event.target.checked === true) {
    item.getElementsByTagName("p")[0].style.color = "#ddd"
    item.style.color = "#ddd"
    item.style.textDecoration = "line-through"
    uncheckedCountSpan.innerHTML = parseInt(uncheckedCountSpan.innerHTML) - 1

  } else {
    //event.target.checked = false
    item.getElementsByTagName("p")[0].style.color = "#333"
    item.style.color = "#333"
    item.style.textDecoration = "none"
    uncheckedCountSpan.innerHTML = parseInt(uncheckedCountSpan.innerHTML) + 1
  }

  // update local storage
  updateLocalStorage()
}


// remove the parent <li> of the associated button
function deleteItem() {

  // reduce unchecked count if it has not already been marked as done  
  item = event.target.parentElement
  if (item.getElementsByTagName("input")[0].checked === false) {
    uncheckedCountSpan.innerHTML = parseInt(uncheckedCountSpan.innerHTML) - 1
  }

  // reduce item count span 
  itemCountSpan.innerHTML = parseInt(itemCountSpan.innerHTML) - 1

  // delete the item 
  event.target.parentElement.remove()


  // update local storage
  updateLocalStorage()
}

