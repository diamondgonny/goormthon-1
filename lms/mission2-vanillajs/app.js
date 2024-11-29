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
    let isEditing = false;
    let originalText = item.text;

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

    const doneBtnEl = document.createElement("button");
    doneBtnEl.classList.add("material-icons");
    doneBtnEl.innerText = "done";
    doneBtnEl.style.display = "none";

    const cancelBtnEl = document.createElement("button");
    cancelBtnEl.classList.add("material-icons");
    cancelBtnEl.innerText = "close";
    cancelBtnEl.style.display = "none";

    const removeBtnEl = document.createElement("button");
    removeBtnEl.classList.add("material-icons");
    removeBtnEl.innerText = "remove_circle";

    // 체크박스 상태 변경 시
    checkbox.addEventListener("change", () => {
        item.complete = checkbox.checked;
        itemEl.classList.toggle("complete", item.complete);
        saveToLocalStorage();
    });

    // Enter키로 수정, Esc 키로 취소
    inputEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            finishEditing();
        } else if (e.key === "Escape") {
            e.preventDefault();
            cancelEditing();
        }
    });

    // 수정 버튼 클릭 시
    editBtnEl.addEventListener("click", () => {
        startEditing();
    });

    // 확인 버튼 클릭 시
    doneBtnEl.addEventListener("click", () => {
        finishEditing();
    });
    // 취소 버튼 클릭 시
    cancelBtnEl.addEventListener("click", () => {
        cancelEditing();
    });

    // 삭제 버튼 클릭 시
    removeBtnEl.addEventListener("click", () => {
        todos = todos.filter(t => t.id != item.id);
        itemEl.remove();
        saveToLocalStorage();
    });

    // 수정 관련 함수들
    function startEditing() {
        console.log('start');
        if (!isEditing) {
            isEditing = true;
            editBtnEl.style.display = "none";
            doneBtnEl.style.display = "inline";
            cancelBtnEl.style.display = "inline";
            itemEl.classList.add("editing");
            originalText = item.text;
            inputEl.removeAttribute("disabled");
            inputEl.focus();
        }
    }

    function finishEditing() {
        console.log('finish');
        if (isEditing) {
            isEditing = false;
            editBtnEl.style.display = "inline";
            doneBtnEl.style.display = "none";
            cancelBtnEl.style.display = "none";
            itemEl.classList.remove("editing");
            item.text = inputEl.value;
            inputEl.setAttribute("disabled", "");
            saveToLocalStorage();
        }
    }

    function cancelEditing() {
        console.log('cancel');
        if (isEditing) {
            isEditing = false;
            editBtnEl.style.display = "inline";
            doneBtnEl.style.display = "none";
            cancelBtnEl.style.display = "none";
            itemEl.classList.remove("editing");
            inputEl.value = originalText;
            item.text = originalText;
            inputEl.setAttribute("disabled", "");
            saveToLocalStorage();
        }
    }

    // 버튼들을 actions div에 추가
    actionsEl.append(editBtnEl);
    actionsEl.append(doneBtnEl);
    actionsEl.append(cancelBtnEl);
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
