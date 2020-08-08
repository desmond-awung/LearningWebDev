// Print a bunch of fake info in a specific order
// faker could come in very handy!

let fake = require("faker");

// console.log(fake.address.city());
// console.log(fake.commerce.price());
// console.log(fake.commerce.product());

console.log("************************")
console.log(" WELCOME TO MY SHOP! ")
console.log("************************")

for (let i=0; i < 10; i++) {
    let adj = fake.commerce.productAdjective();
    let material = fake.commerce.productMaterial();
    let product = fake.commerce.product();
    let price = fake.commerce.price();
    // sp = " "
    console.log(adj + " " + material + " " + product + " - $" + price);
}

