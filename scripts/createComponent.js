const fs = require("fs");
const reg = /^[A-Z_\$][\w\$]*$/;
const name = process.argv[2];
const keyArgument = process.argv[3]
const directoryArgument = process.argv[4]
const countOfArguments = process.argv.length
const fileDir = getFileDir(directoryArgument, keyArgument);
const aboutFileDir = isInside(fileDir);
const messageAboutDirectory = getMessageAboutDirectory(aboutFileDir, name, fileDir);
const incorrectSymbols = getIncorrectSymbols(name);
const errors = getErrors(name, reg, fileDir, countOfArguments, keyArgument);
const modulesNameAndContent = {
	"index.ts" 		: `import ${name} from './${name}'\n\nexport default ${name}`,
	[`${name}.css`] : `.${name.toLowerCase()} {\n\n}`,
	[`${name}.tsx`] : `import React from 'react'\n\nimport './${name}.css'\n\n\ninterface Props {\n\n}\n\nexport default function ${name}({ }: Props) {\n\n\treturn (\n\t\t<div className="${name.toLowerCase()}">\n\n\t\t</div>\n\t)\n}\n\n${name}.defaultProps = {\n\n}`
}

function checkValid() {
	if (errors.length == 0)
		return true
	exit()
}

function getIncorrectSymbols(name) {
	let symbols = ''
	let i = 0
	let flag = false;

	while (i < name.length){
		if (!name[i].match(/[\w$]/)){
			symbols += `${name[i]} `
			flag = true
		}
		i++;
	}
	return (flag) ? `Введенное Вами имя модуля ${name} содержит недопустимые символы: ${symbols}` : symbols
}

function getMessageAboutDirectory(aboutFileDir, name, fileDir) {
	if(aboutFileDir)
		return `Папка для модуля ${name} была создана в корневой директории`
	else
		return `Папка для модуля ${name} была создана в директории ${fileDir.substr(0, fileDir.length - 1)}`
}

function isInside(fileDir) {
	return fileDir === './' || fileDir === '/'
}

function exit(err = false) {
	if (!err){
		console.log(errors.join('\n'));
		console.log("Использование: node script.js 'Имя модуля' '-o' 'Имя папки'");
	}
	else
		console.log(err + '');
	process.exit(-1);
}

function getFileDir(directoryArgument, keyArgument) {
	if (keyArgument === '-o' && directoryArgument && directoryArgument !== '/') {
		if (!directoryArgument.match(/\/$/) && directoryArgument)
		directoryArgument += "/";
		return directoryArgument;
	}
	else
		return './';
}

function isAvailableDir(fileDir, name) {
	return fs.existsSync(`${fileDir}/${name}`) ? false : true
}

function getErrors(name, reg, fileDir, countOfArguments, keyArgument) {
	let errors = [];

	if (!(countOfArguments === 3 || countOfArguments === 5))
		errors.push('Неверное количество аргументов.')
	if (!name.match(reg))
		errors.push(`Неверное имя. ${incorrectSymbols}`)
	if (!(countOfArguments === 3 || keyArgument === '-o'))
		errors.push('Неверный флаг.')
	if (!isAvailableDir(fileDir, name))
		errors.push(`В указанной директории уже существует модуль ${name}.`)
	return errors
}

function createDirectory(fileDir, name) {
	fs.mkdirSync(`${fileDir}/${name}/`, { recursive: true })
	console.log(messageAboutDirectory);
}

function writeNewFiles(fileDir, name, modulesNameAndContent) {
	for (key in modulesNameAndContent) {
		fs.writeFileSync(`${fileDir}/${name}/${key}`, modulesNameAndContent[key]);
	}
}

function main() {
	checkValid()
	createDirectory(fileDir, name)
	writeNewFiles(fileDir, name, modulesNameAndContent)
}

main();