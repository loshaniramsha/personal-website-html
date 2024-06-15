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



// JavaScript for menu toggle
/*document.addEventListener('DOMContentLoaded', function() {
    var toggleBtn = document.getElementById('toggle-btn');
    var mobileMenu = document.getElementById('mobile-menu');

    toggleBtn.addEventListener('click', function() {
        if (mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
            mobileMenu.style.display = 'block';
        } else {
            mobileMenu.style.display = 'none';
        }
    });

    // Close mobile menu if clicked outside
    document.addEventListener('click', function(event) {
        if (!toggleBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.style.display = 'none';
        }
    });
});*/

document.addEventListener('DOMContentLoaded', function() {
    var toggleBtn = document.getElementById('toggle-btn');
    var mobileMenu = document.getElementById('mobile-menu');

    toggleBtn.addEventListener('click', function() {
        if (mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
            mobileMenu.style.display = 'block';
            document.body.classList.add('mobile-menu-open');
        } else {
            mobileMenu.style.display = 'none';
            document.body.classList.remove('mobile-menu-open');
        }
    });

    // Close mobile menu if clicked outside
    document.addEventListener('click', function(event) {
        if (!toggleBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.style.display = 'none';
            document.body.classList.remove('mobile-menu-open');
        }
    });

    var menuLinks = mobileMenu.getElementsByTagName('a');
    for (var i = 0; i < menuLinks.length; i++) {
        menuLinks[i].addEventListener('click', function() {
            mobileMenu.style.display = 'none';
            document.body.classList.remove('mobile-menu-open');
        });
    }
});






