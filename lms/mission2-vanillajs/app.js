const list = document.getElementById("list");
const createBtn = document.getElementById("create-btn");
let todos = [];
createBtn.addEventListener('click', createNewTodo);

function createNewTodo() {
    const item = {
        id: new Date().getTime(),
        text: "",
        complete: false
    }

    todos.unshift(item); // 데이터 관리용 삽입
    const { itemEl, inputEl } = createTodoElement(item); // Destructuring Assignment
    list.prepend(itemEl); // 화면 표시용 삽입
    inputEl.removeAttribute("disabled");
    inputEl.focus();
    saveToLocalStorage();
}

function createTodoElement(item) {
    const itemEl = document.createElement("div");
    itemEl.classList.add("item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.complete;
    if (item.complete) {
        itemEl.classList.add("complete");
    }

    const inputEl = document.createElement("input");
    inputEl.type = "text";
    inputEl.value = item.text;
    inputEl.setAttribute("disabled", "");

    const actionsEl = document.createElement("div");
    actionsEl.classList.add("actions");

    const editBtnEl = document.createElement("button");
    editBtnEl.classList.add("material-icons");
    editBtnEl.innerText = "edit";

    const removeBtnEl = document.createElement("button");
    removeBtnEl.classList.add("material-icons", "remove-btn");
    removeBtnEl.innerText = "remove_circle";

    // 체크박스 상태 변경 시
    checkbox.addEventListener("change", () => {
        item.complete = checkbox.checked;
        itemEl.classList.toggle("complete", item.complete);
        saveToLocalStorage();
    });

    // 입력 필드 값 변경 시
    inputEl.addEventListener("input", () => {
        item.text = inputEl.value;
    });

    // 입력 필드에서 포커스 잃을 때
    inputEl.addEventListener("blur", () => {
        inputEl.setAttribute("disabled", "");
        saveToLocalStorage();
    });

    // 수정 버튼 클릭 시
    editBtnEl.addEventListener("click", () => {
        inputEl.removeAttribute("disabled");
        inputEl.focus();
    });

    // 삭제 버튼 클릭 시
    removeBtnEl.addEventListener("click", () => {
        todos = todos.filter(t => t.id != item.id);
        itemEl.remove();
        saveToLocalStorage();
    });

    // 버튼들을 actions div에 추가
    actionsEl.append(editBtnEl);
    actionsEl.append(removeBtnEl);

    // 모든 요소를 item div에 추가
    itemEl.append(checkbox);
    itemEl.append(inputEl);
    itemEl.append(actionsEl);

    return { itemEl, inputEl, editBtnEl, removeBtnEl }
}

function saveToLocalStorage() {
    const data = JSON.stringify(todos);
    localStorage.setItem("my_todos", data);
}

function loadFromLocalStorage() {
    const data = localStorage.getItem("my_todos");
    if (data) {
        todos = JSON.parse(data);
    }
}

function displayTodos() {
    loadFromLocalStorage();
    for (let i = 0; i < todos.length; i++) {
        const item = todos[i];
        const { itemEl } = createTodoElement(item);
        list.append(itemEl);
    }
}

displayTodos();
