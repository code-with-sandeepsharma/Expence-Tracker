const balance = document.getElementById("balance");
 const money_plus = document.getElementById("money_plus");

 const money_minus = document.getElementById("money_minus");
 const list = document.getElementById("list");

 const form = document.getElementById("form");
 const text = document.getElementById("text_");

 const amount = document.getElementById("Amount");


 let transactions = [];
//addtransaction
function addtransaction(e){
e.preventDefault();
if(
    text.value.trim()=== ""|| amount.value.trim()===""
){
alert("please enter text and value");
}else{
    const transaction ={
        id:generateID(),
        text:text.value,
        amount:+amount.value,
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    text.value="";
    amount.value="";
}
}

//generate id
function generateID(){
    return Math.floor(Math.random()*1000000);
}

 function addTransactionDOM(transaction){
    const sign = transaction.amount < 0? "-": "+";
    const item = document.createElement("li");
    item.classList.add(
        transaction.amount < 0 ?"minus" :"plus"
    );
    item.innerHTML = `${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="">x</button>`;
    list.appendChild(item);
 }
 //updateValues

 function updateValues(){
    const amounts = transactions.map((transaction) => transaction,amount);
    console.log("amounts array: ",amounts);
    
    const total = parseInt(amounts.reduce((acc,item) =>(acc += item.amount ),0).toFixed(2));
    console.log(total.item);
    


const income = parseInt(
    amounts
      .filter(item => item.amount > 0)  // Corrected to filter based on item.amount
      .reduce((acc, item) => acc + item.amount, 0)  // Sum the amounts
      .toFixed(2)  
  );
  console.log(income);
  

const expense = parseFloat(
    amounts
      .filter(item => item.amount < 0) // Filter out negative amounts
      .reduce((acc, item) => acc + item.amount, 0) * -1 // Sum and then negate the result
  ).toFixed(2);
  
  console.log(expense);
  

    balance.innerText=`$${total}`;
    money_plus.innerText=`$${income}`;
    money_minus.innerText=`$${expense}`;
 }
 //init app 
 function Init(){
    list.innerHTML="";
    transactions.forEach(addTransactionDOM);
    updateValues();     
 }
 Init();
 form .addEventListener("submit",addtransaction);