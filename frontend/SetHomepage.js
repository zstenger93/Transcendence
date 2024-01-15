// THIS IS USED TO SET THE homepage FIELD IN package.json FOR DIFFERENT BUILDS
const fs = require('fs');
const packageJson = require('./package.json');

const homepage = process.env.HOMEPAGE;

if (homepage) {
	packageJson.homepage = homepage;
} else {
	delete packageJson.homepage;
}

fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));