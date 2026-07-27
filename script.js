console.log("JS connected");

// DOM elements 
const balanceElement = document.querySelector("#balance")
const incomeElement = document.querySelector("#income")
const expenseElement = document.querySelector("#expense")

const button = document.querySelector("button")
const textInput = document.querySelector('input[type = "text"]');
const numberInput = document.querySelector('input[type = "number"]');
const transactionList = document.querySelector("ul");

let editingIndex = null;

const transactions = JSON.parse(localStorage.getItem("transactions")) ?? [];

function calculateTotals(){
    let income = 0;
    let expense = 0;
    let balance = 0;

    transactionList.innerHTML = "";

    if (transactions.length == 0){
        transactionList.innerHTML = "<li>No Transactions yet</li>";
    }

transactions.forEach(function(transaction, index){
    console.log(index);
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
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button")

    editButton.classList.add("edit-button")
    deleteButton.classList.add("delete-button")

    editButton.addEventListener("click", function(){
        editingIndex = index;

        button.textContent = "Save Changes";

        textInput.value = transaction.name;
        numberInput.value = transaction.amount;

        textInput.focus()
        textInput.setSelectionRange(
            textInput.value.length,
            textInput.value.length
        )
        numberInput.setSelectionRange(
            numberInput.value.length,
            numberInput.value.length
        )
    });

    deleteButton.addEventListener("click", function(){
        transactions.splice(index ,1);

        localStorage.setItem(
            "transactions",
            JSON.stringify(transactions)
        );
        calculateTotals();
    });

    nameSpan.textContent = transaction.name;
    amountSpan.textContent = amountText + " $";
    deleteButton.textContent = "❌";
    editButton.textContent = "✏️";

    newLi.appendChild(nameSpan);
    newLi.appendChild(amountSpan);
    newLi.appendChild(editButton);
    newLi.appendChild(deleteButton);
    transactionList.appendChild(newLi);
});

balanceElement.textContent = "$" + balance;
incomeElement.textContent = "$" + income;
expenseElement.textContent = "$" + expense;

}
calculateTotals();


function addTransaction(){

    const amount = Number(numberInput.value);

    if(textInput.value.trim() === "" || numberInput.value === ""){
        alert("Please Fill in Both Fields");
        return;
    } 

    if (amount === 0){
        alert("Amount cannot be 0");
        return;
    }

    console.log("Button clicked!");
    console.log(textInput.value);
    console.log(numberInput.value);

    const newTransaction = {
        name: textInput.value,
        amount: amount
    };

     if(editingIndex == null){
        transactions.push(newTransaction);
    }
    else{
        transactions[editingIndex] = newTransaction
    }
    button.textContent = "Add Transaction"
    editingIndex = null;
    textInput.value == "";
    numberInput.value == "";
    textInput.focus();

    localStorage.setItem("transactions", JSON.stringify(transactions));
    calculateTotals();
    
    textInput.value = "";
    numberInput.value = "";
    textInput.focus();

}

// Event listners 
button.addEventListener("click", addTransaction);

numberInput.addEventListener("keydown", function(event){
        if (event.key === "Enter"){
            addTransaction();
        }
    });

textInput.addEventListener("keydown", function(event){
        if (event.key === "Enter"){
            addTransaction();
        }
    });