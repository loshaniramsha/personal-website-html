const box = document.querySelectorAll(".assignment-box");
const colorBox = document.querySelectorAll(".color-box");

box.forEach((box, index) => {
    box.addEventListener("mouseover", () => {
        colorBox[index].style.animation = "loshani 1s ease-out forwards";
    });
    box.addEventListener("mouseleave", () => {
        colorBox[index].style.animation = "none";
    });
});





