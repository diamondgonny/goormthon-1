// 5
// Wheelchair Evangelist 텍스트 색상 변경
const wheelchairEvangelist = document.querySelector("p");
const colors = ["red", "orange", "yellow", "green", "blue", "navy", "purple", "#111111"];
let currentColorIndex = -1;

wheelchairEvangelist.addEventListener("click", function() {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    this.style.color = colors[currentColorIndex];
});

// 확인, 취소 버튼 클릭 이벤트
const confirmBtn = document.querySelector(".confirm");
const cancelBtn = document.querySelector(".cancel");

confirmBtn.addEventListener("click", function(event) {
    event.stopPropagation();
    this.style.backgroundColor = "#808080";
});

cancelBtn.addEventListener("click", function(event) {
    event.stopPropagation();
    this.style.backgroundColor = "#808080";
});

// 배경 클릭 이벤트
let isDark = false;
const promotionContainer = document.querySelector(".promotion-container")
const promotionText = document.querySelector(".promotion-text")
promotionContainer.addEventListener("click", function() {
    if (!isDark) {
        this.style.backgroundColor = "#111111";
        promotionText.style.color = "#eeeeee";
    } else {
        this.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
        promotionText.style.color = "#111111";
    }
    isDark = !isDark;
});
