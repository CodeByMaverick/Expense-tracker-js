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
        name: "Bonus",
        amount: 1200
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

    transactionList.innerHTML = "";

transactions.forEach(function(transaction){
    if(transaction.amount > 0){
        income = income + transaction.amount;
    }
    else{
        expense = expense + Math.abs(transaction.amount);
    }
    balance = income - expense;

    let amountText;
    if(transaction.amount > 0){
        amountText = "+" + transaction.amount;
    }
    else{
        amountText = transaction.amount;
    }
    const newLi = document.createElement("li");
    if(transaction.amount > 0){
        newLi.classList.add("income-transaction");
    }
    else{
        newLi.classList.add("expense-transaction");
    }

    const nameSpan = document.createElement("span");
    const amountSpan = document.createElement("span");

    nameSpan.textContent = transaction.name;
    amountSpan.textContent = amountText + " $";

    newLi.appendChild(nameSpan);
    newLi.appendChild(amountSpan);
    transactionList.appendChild(newLi);
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

    const newTransaction = {
        name: textInput.value,
        amount: amount
    };
    transactions.push(newTransaction);
    calculateTotals();
    
    textInput.value = "";
    numberInput.value = "";
});