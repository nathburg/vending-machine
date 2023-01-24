const process = require('process');

let itemCostInput = null;
let paymentInput = null;

for (let i = 0; i < process.argv.length; ++i) {
	const arg = process.argv[i];
	if (arg === '--item-cost') {
		itemCostInput = process.argv[i + 1];
		// Skip the next element since we consumed it above.
		++i;
	} else if (arg === '--payment') {
		paymentInput = process.argv[i + 1];
		// Skip the next element since we consumed it above.
		++i;
	}
}

if (itemCostInput == null) {
	console.error('--item-cost must be provided');
	process.exit(1);
}

const itemCost = Number(itemCostInput) * 100;
if (isNaN(itemCost)) {
	console.log('--item-cost must be a number');
	process.exit(1);
}

if (paymentInput == null) {
	console.error('--payment must be provided');
	process.exit(1);
}

const payment = Number(paymentInput) * 100;
if (isNaN(payment)) {
	console.log('--payment must be a number');
	process.exit(1);
}

const coinValues = {
	Quarters: 25,
	Dimes: 10,
	Nickels: 5,
	Pennies: 1,
};

const coins = [
	{ name: 'Quarters', value: 25 },
	{ name: 'Dimes', value: 10 },
	{ name: 'Nickels', value: 5 },
	{ name: 'Pennies', value: 1 },
];

const diff = payment - itemCost;
let change = diff;
let total = 0;

for (let coin of coins) {
	const coinQuantity = Math.floor(change / coin.value);
	total += coinQuantity * coin.value;
	const remainder = change % coin.value;
	if (coinQuantity) console.log(`${coin.name}: ${coinQuantity}`);
	if (!remainder) break;
	else change = remainder;
}

console.log(`Total Change: $${total / 100}`);
