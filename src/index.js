import inquirer from 'inquirer';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const testDir = path.join(__dirname, 'graph', 'easy');

// fs.readdir(testDir, (err, files) => {
// 	if (err) {
// 		console.error('Unable to scan directory:', err);
// 		process.exit(1);
// 	}

// 	const tsFiles = files.filter((file) => file.endsWith('.ts'));

// 	inquirer
// 		.prompt([
// 			{
// 				type: 'list',
// 				name: 'file',
// 				message: 'Select a file to run:',
// 				choices: tsFiles,
// 			},
// 		])
// 		.then((answers) => {
// 			const filePath = path.join(testDir, answers.file);
// 			exec(`node ${filePath}`, (err, stdout, stderr) => {
// 				if (err) {
// 					console.error('Error executing file:', err);
// 					return;
// 				}
// 				console.log(stdout);
// 				console.error(stderr);
// 			});
// 		});
// });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseDir = path.join(__dirname);

function getDirectories(srcPath) {
	return fs
		.readdirSync(srcPath)
		.filter((file) => fs.statSync(path.join(srcPath, file)).isDirectory());
}

function getFiles(srcPath) {
	return fs
		.readdirSync(srcPath)
		.filter(
			(file) =>
				fs.statSync(path.join(srcPath, file)).isFile() &&
				file.endsWith('.ts')
		);
}

async function selectFolderAndFile() {
	const folders = getDirectories(baseDir);

	const { folder } = await inquirer.prompt([
		{
			type: 'list',
			name: 'folder',
			message: 'Select a folder:',
			choices: folders,
		},
	]);

	const subFolders = getDirectories(path.join(baseDir, folder));
	const { subFolder } = await inquirer.prompt([
		{
			type: 'list',
			name: 'subFolder',
			message: 'Select a sub-folder:',
			choices: subFolders,
		},
	]);

	const files = getFiles(path.join(baseDir, folder, subFolder));
	const { file } = await inquirer.prompt([
		{
			type: 'list',
			name: 'file',
			message: 'Select a file to run:',
			choices: files,
		},
	]);

	return path.join(baseDir, folder, subFolder, file);
}

selectFolderAndFile().then((filePath) => {
	exec(`node ${filePath}`, (err, stdout, stderr) => {
		if (err) {
			console.error('Error executing file:', err);
			return;
		}
		console.log(stdout);
		console.error(stderr);
	});
});
