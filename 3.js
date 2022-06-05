/*
 * Welcome Software
 * Integration Specialist Aptitude Test
 *
 * Task 	: 	#3
 * Desc		: 	Script that transforms the CSV file into a JSON file 
 * 				that can be used in an integration for mapping
 * Author	: 	Sarwat Osman
 *
 */

// FETCH FILE CONTENTS FROM LOCAL DIRECTORY 

const fs = require('fs');
csvFile = fs.readFileSync("MappingDocumentExercise.csv");


// Convert CSV to JSON by manual parsing

var csvLineStringArray = csvFile.toString().split(/\r?\n/);
let jsonArray = [];
let csvHeaders = csvLineStringArray[0].split(",");

for (let i in csvLineStringArray) 
{
	if(!i) 
		continue;

	let obj = {};
	let dataRows = csvLineStringArray[i];
	let dataRowCommaRemoved = '';
	let flag = 0;
	for (let dataRow of dataRows) {
	    if ((dataRow === "'" || dataRow === '"') && flag === 0) {
	    	flag = 1;
	    }
	    else if ((dataRow === "'" || dataRow === '"') && flag == 1) {
	    	flag = 0;
	    }
	    if (dataRow === ',' && flag === 0) {
	    	dataRow = '|';
	    }
	    if (dataRow !== "'" && dataRow !== '"') {
	    	dataRowCommaRemoved += dataRow;
	    }
	}

	let properties = dataRowCommaRemoved.split("|");

	for (let j in csvHeaders) {
		// NOTE: 
		// If properties[j] string contains further ',' character, 
		// split the properties[j] string again to array
		if (properties[j].includes(",")) {
		  obj[csvHeaders[j]] = properties[j].split(",")
		  	.map(item => item.trim());
		}
		else {
			obj[csvHeaders[j]] = properties[j];
		}
	}

	jsonArray.push(obj);
}

let json = JSON.stringify(jsonArray);
fs.writeFileSync('MappingDocumentExercise.json', json);