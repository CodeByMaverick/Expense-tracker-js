console.log("JS connected");

const button = document.querySelector("button")
console.log(button);

button.addEventListener("click", function(){
    console.log("Button clicked!");
    console.log(textInput.value);
    console.log(numberInput.value);
});
const textInput = document.querySelector('input[type = "text"]');
const numberInput = document.querySelector('input[type = "number"]');