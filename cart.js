const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

function calculateTotal(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) { // Bug: <= should be <
    debugger;  
    total += cartItems[i].price; // Bug: cartItems[i] is undefined on the last iteration
  }
  return total;
}


function applyDiscount(total, discountRate) { 
try{
  if(discountRate <0 || discountRate >1){
    throw new Error("invalid discount rate");
  }
  return total - total * discountRate; // Bug: Missing validation for discountRate
} catch(error){
    console.log(error.message);

}
}
function generateReceipt(cartItems, total) {
  try{
    if(typeof total !=="number"){
      throw new Error ("total must be a number")
    }
  let receipt = "Items:\n";
  cartItems.forEach(item => {
      receipt += `${item.name}: $${item.price}\n`;
  });
  receipt += `Total: $${total.toFixed(2)}`; // Bug: total may not be a number
  return receipt;
  }catch (error){
    console.log(error.message)
  }
}
let testReceipt = generateReceipt(cart,1700)
console.log(cart,1700)

console.log(calculateTotal([
  { name: "Laptop", price: 1000 }
]));

// Debugging entry point
console.log("Starting shopping cart calculation...");
const total = calculateTotal(cart);
const discountedTotal = applyDiscount(total, 0.2); // 20% discount
const receipt = generateReceipt(cart, discountedTotal);

document.getElementById("total").textContent = `Total: $${discountedTotal}`;
document.getElementById("receipt").textContent = receipt;


/*
Error 1: calculateTotal()

The original loop used i <= cartItems.length. The <= caused the loop to continue one extra time, even after reaching the end of the array. This caused JavaScript to try to access an item that did not exist, resulting in an error.

Fix: I changed i <= cartItems.length to i < cartItems.length so the loop stops at the last valid array in



Error 2: applyDiscount()

The original function did not validate the discount rate. This allowed users to enter a negative discount or a discount greater than 1 (100%), which could produce incorrect totals, including negative prices.

Fix: I added a validation condition to make sure the discount rate stays between 0 and 1. If the value is outside that range, an error message is displayed.


Error 3: generateReceipt()

The function used total.toFixed(2) to format the total price to two decimal places. However, if the total was not a number, this could cause a runtime error.

Fix: I added validation using typeof total !== "number" to check that the total is a number before formatting it.


used the Chrome DevTools Console to identify errors and view messages while running the application.

I used the Sources tab to set breakpoints and pause JavaScript execution inside calculateTotal(), applyDiscount(), and generateReceipt().

I used the Scope panel to inspect variables and understand how their values changed during execution. I also used the debugger statement inside the loop to pause execution and follow how the total price was calculated.

These tools helped me understand where errors occurred, identify their causes, and verify that the corrected code worked as expected.

*/