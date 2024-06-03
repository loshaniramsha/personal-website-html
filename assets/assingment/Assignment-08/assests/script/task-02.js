var array = ["A", "B", "C", "D", "E", "F"];
var newArray = [];
var myInterval = null;


function removeElement() {
    let last = array.pop();
    array.unshift(last)
    console.log(array)
    $("#val1").text(array[0])
    $("#val2").text(array[1])
    $("#val3").text(array[2])
    $("#val4").text(array[3])
    $("#val5").text(array[4])
    $("#val6").text(array[5])
}

myInterval = setInterval(removeElement,1000)


