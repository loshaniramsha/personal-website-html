var array = ["red", "green", "blue", "yellow", "cyan", "magenta"];
var myInterval = null;


function removeElement() {
    let last = array.pop();
    array.unshift(last)
    console.log(array)
    $("#val1").css("background-color",array[0])
    $("#val2").css("background-color",array[1])
    $("#val3").css("background-color",array[2])
    $("#val4").css("background-color",array[3])
    $("#val5").css("background-color",array[4])
    $("#val6").css("background-color",array[5])
}

myInterval = setInterval(removeElement,1000)


