const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

fs.open(path.join(__dirname, 'mySveta.txt'), 'w', (err) => {
	if (err) throw err;
	console.log('Enter yor text');
});

stdin.on('data', data => {

	if (data.toString().trim() === 'exit') {
		stdout.write('Good Bye!')
		process.exit();
	}

	fs.appendFile(path.join(__dirname, 'mySveta.txt'), data, err => {
		if (err) {
			throw err;
			console.log('File added')
		}
	})

	process.on('SIGINT', () => {
		stdout.write('Good Bye!'),
			process.exit()
	})
})