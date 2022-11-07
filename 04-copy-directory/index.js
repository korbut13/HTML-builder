const fs = require('fs');
const { copyFile } = require('fs/promises');
const path = require('path');
const { isFunction } = require('util')

const copyRecursive = (src, dest) => {
	const stats = fs.stat(src, (error, stats) => {
		if (error) {
			throw error;
		}
		else {
			if (stats.isDirectory()) {
				fs.mkdir(dest, { recursive: true }, (err) => {
					if (err) {
						throw err;
					}
					else {
						console.log('Added folder')
						fs.readdir(src, (err, files) => {
							if (err) {
								throw err;
							}
							else {
								files.forEach(file => {
									copyRecursive(path.join(src, file), path.join(dest, file))
								})
							}
						})
					}
				})
			} else {
				fs.copyFile(src, dest, (err) => {
					if (err) {
						throw err;
					}
				})
			}
		}
	});
}
const one = path.join(__dirname, 'files')
const two = path.join(__dirname, 'files-copy')
copyRecursive(one, two);


