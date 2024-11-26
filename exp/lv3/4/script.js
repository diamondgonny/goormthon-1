// 4
let users = [];

function addUser(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const age = parseInt(document.getElementById("age").value); // int 타입
    users.push({name, age});
    document.getElementById("userForm").reset();
    updateDisplay();
}

function updateDisplay() {
    const userList = document.getElementById("userList");

    while (userList.firstChild) {
        userList.removeChild(userList.firstChild);
    }
    // 화살표 함수, 콜백 함수 (FP) I
    users.forEach((user, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. 이름: ${user.name}, 나이: ${user.age}`;
        userList.appendChild(li);
    });
    console.table(users)

    if (users.length > 0) {
        // 화살표 함수, 콜백 함수 (FP) II
        const totalAge = users.reduce((sum, user) => sum + user.age, 0);
        const averageAge = totalAge / users.length;
        document.getElementById("averageAge").textContent =
            `평균 나이: ${averageAge.toFixed(2)}세`;    // 소수점 둘째 자리까지
    } else {
        document.getElementById("averageAge").textContent =
            "등록된 사용자가 없습니다.";
    }
}
