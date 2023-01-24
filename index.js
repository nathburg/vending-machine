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

const change = payment - itemCost;

if (change === 0) return console.log('No change required.');

const quarters = Math.floor(change / 25);
const quartersRemainder = (change / 25 - quarters) * 25;
if (quarters) console.log(`Quarters: ${quarters}`);
if (!quartersRemainder) return;

const dimes = Math.floor(quartersRemainder / 10);
const dimesRemainder = (quartersRemainder / 10 - dimes) * 10;
if (dimes) console.log(`Dimes: ${dimes}`);

if (!dimesRemainder) return;

const nickels = Math.floor(dimesRemainder / 5);
const nickelsRemainder = (dimesRemainder / 5 - nickels) * 5;
if (nickels) console.log(`Nickels: ${nickels}`);

if (!nickelsRemainder) return;

console.log(`Pennies: ${Math.floor(nickelsRemainder)}`);
