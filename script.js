console.log("JS connected");

// DOM elements 
const balanceElement = document.querySelector("#balance")
const incomeElement = document.querySelector("#income")
const expenseElement = document.querySelector("#expense")

const button = document.querySelector("button")
const textInput = document.querySelector('input[type = "text"]');
const numberInput = document.querySelector('input[type = "number"]');
const transactionList = document.querySelector("ul");

// Application data

const transactions = [
    {
        name: "Salary",
        amount: 5000
    },
    {
        name: "Groceries",
        amount: -425
    },
    {
        name: "Travel Expense",
        amount: -600
    },
    {
        name: "Internet Bills",
        amount: -280
    }
];

function calculateTotals(){
    let income = 0;
    let expense = 0;
    let balance = 0;

transactions.forEach(function(transaction){
    if(transaction.amount > 0){
        income = income + transaction.amount;
    }
    else{
        expense = expense + Math.abs(transaction.amount);
    }
    balance = income - expense;
});

balanceElement.textContent = "$" + balance;
incomeElement.textContent = "$" + income;
expenseElement.textContent = "$" + expense;

}
calculateTotals();

// Event listners 
button.addEventListener("click", function(){

    if(textInput.value === "" || numberInput.value === ""){
        alert("Please Fill in Both Fields");
        return;
    } 

    console.log("Button clicked!");
    console.log(textInput.value);
    console.log(numberInput.value);

    const amount = Number(numberInput.value);
    console.log(amount);
    console.log(typeof amount);

    const newLi = document.createElement("li");

    newLi.textContent = textInput.value + " " + numberInput.value;
    transactionList.appendChild(newLi);
    textInput.value = "";
    numberInput.value = "";

     console.log("Before clearing:", numberInput.value);

    numberInput.value = "";

    console.log("After clearing:", numberInput.value);

    // Upadte totals based on transaction type
    if(amount > 0){
    console.log("Income");
    income = income + amount;
    balance = balance + amount;
    incomeElement.textContent = "$" + income;
    balanceElement.textContent = "$" + balance;
    newLi.classList.add("Income");
    }

    else{
        console.log("Expense");
        expense = expense + Math.abs(amount);
        balance = balance - Math.abs(amount);
        expenseElement.textContent = "$" + expense;
        balanceElement.textContent = "$" + balance;
        newLi.classList.add("Expense");
    }

});