// set-homepage.js
const fs = require('fs');
const packageJson = require('./package.json');

const homepage = process.env.HOMEPAGE;

if (homepage) {
	packageJson.homepage = homepage;
} else {
	delete packageJson.homepage;
}

fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));