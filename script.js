console.log("JS connected");

const button = document.querySelector("button")
const textInput = document.querySelector('input[type = "text"]');
const numberInput = document.querySelector('input[type = "number"]');
const transactionList = document.querySelector("ul");

console.log(button);

button.addEventListener("click", function(){
    console.log("Button clicked!");
    console.log(textInput.value);
    console.log(numberInput.value);
    const newLi = document.createElement("li");


    newLi.textContent = textInput.value + " " + numberInput.value;
    transactionList.appendChild(newLi);
    textInput.value = "";
    numberInput.value = "";

});