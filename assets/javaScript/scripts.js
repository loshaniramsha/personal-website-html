/*const box = document.querySelectorAll(".assignment-box");
const colorBox = document.querySelectorAll(".color-box");

box.forEach((box, index) => {
    box.addEventListener("mouseover", () => {
        colorBox[index].style.animation = "loshani 1s ease-out forwards";
    });
    box.addEventListener("mouseleave", () => {
        colorBox[index].style.animation = "none";
    });
});*/


const boxes = document.querySelectorAll(".assignment-box");
const colorBoxes = document.querySelectorAll(".color-box");

// Function to handle mouseover and touchstart events
const handleHover = (index) => {
    colorBoxes[index].style.animation = "loshani 1s ease-out forwards";
};

// Function to handle mouseleave and touchend events
const handleLeave = (index) => {
    colorBoxes[index].style.animation = "none";
};

// Adding event listeners for mouse and touch events
boxes.forEach((box, index) => {
    // Mouse events
    box.addEventListener("mouseover", () => {
        handleHover(index);
    });
    box.addEventListener("mouseleave", () => {
        handleLeave(index);
    });

    // Touch events
    box.addEventListener("touchstart", () => {
        handleHover(index);
    });
    box.addEventListener("touchend", () => {
        handleLeave(index);
    });
});



