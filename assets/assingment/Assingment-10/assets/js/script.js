const display=document.getElementById("display");

function appendToDisplay(input) {
    display.value+=input;
}

function clearDisplay() {
    display.value="";
    
}
function calculate() {
    try {
        display.value=eval(display.value);
    }
    catch (error) {
        display.value = "Error";
    }
}
function clearDisplayOneByOne() {
    display.value = display.value.slice(0, -1); // Remove the last character from the display value
}


