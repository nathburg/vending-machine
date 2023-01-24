const process = require('process');
const currencies = require('./currencies.json');

let itemCostInput = null;
let paymentInput = null;
let currencyInput = null;

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
	} else if (arg === '--currency') {
		currencyInput = process.argv[i + 1];
		++i;
	}
}

if (currencyInput == null) {
	console.error('--currency must be provided');
	process.exit(1);
}

if (!Object.keys(currencies).includes(currencyInput)) {
	console.error('--currency is not a valid entry');
	process.exit(1);
}

const { abbreviation, format, unitConversionFactor, coins } =
	currencies[currencyInput];

if (itemCostInput == null) {
	console.error('--item-cost must be provided');
	process.exit(1);
}

const itemCost = Number(itemCostInput) * unitConversionFactor;
if (isNaN(itemCost)) {
	console.log('--item-cost must be a number');
	process.exit(1);
}

if (paymentInput == null) {
	console.error('--payment must be provided');
	process.exit(1);
}

const payment = Number(paymentInput) * unitConversionFactor;
if (isNaN(payment)) {
	console.log('--payment must be a number');
	process.exit(1);
}

const diff = payment - itemCost;
let change = diff;
let total = 0;

for (let coin of coins) {
	const coinQuantity = Math.floor(change / coin.value);
	total += coinQuantity * coin.value;
	const remainder = change % coin.value;
	if (coinQuantity) console.log(`${coin.name}: ${coinQuantity}`);
	change = remainder;
	if (!remainder) break;
}

console.log(
	`Total Change: ${format.replace(
		'%amount%',
		total / unitConversionFactor
	)} ${abbreviation}`
);
if (change)
	console.log(
		'This currency does not support perfect change for the current transaction.'
	);
