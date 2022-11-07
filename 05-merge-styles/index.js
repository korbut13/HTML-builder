const path = require('path');
const fs = require('fs');
const dirPath = path.join(__dirname, 'styles')
fs.readdir(dirPath, { withFileTypes: true }, (error, dirEntryList) => {
	if (!error) {
		const one = path.join(__dirname, 'project-dist', 'bundle.css')
		const output = fs.createWriteStream(one);
		dirEntryList.forEach((dirEntry) => {
			if (dirEntry.isFile()) {
				const ext = dirEntry.name.split('.').pop();
				if (ext === 'css') {
					const input = fs.createReadStream(path.join(__dirname, 'styles', dirEntry.name), 'utf-8');
					input.on('data', chunk => output.write(chunk));
				}
			}
		});
	} else {
		throw error;
	}
})