const path = require('path');
const fs = require('fs');

const dirPath = path.join(__dirname, 'secret-folder')
fs.readdir(dirPath, { withFileTypes: true }, (error, dirEntryList) => {
	if (!error) {

		dirEntryList.forEach((dirEntry) => {
			if (dirEntry.isFile()) {
				const filePath = path.join(__dirname, 'secret-folder', dirEntry.name)
				fs.stat(filePath, function (err, fileInfo) {
					if (err) {
						throw err;
					} else {
						const indexPoint = dirEntry.name.indexOf('.')
						const nameWithoutPoint = dirEntry.name.slice(0, indexPoint)
						const afterPoint = dirEntry.name.slice(indexPoint + 1)
						const fileSizeInBytes = fileInfo.size / 1000;
						console.log(`${nameWithoutPoint} - ${afterPoint} - ${fileSizeInBytes}kb`)
					}
				})
			}
		});
	} else {
		throw error;
	}
})
