const fs = require('fs');
const util = require('util');
const path = require('path');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const srcDirectory = 'src';
const englishTranslationFiles = 'lang/front/en.json';
const jsxTsxFileExtensions = ['.jsx', '.tsx'];
const searchPattern = /t_i18n\('[^']+'\)/g;
const labelSearchPattern = /label:\s'(\w+)',/g;
const labelExecPattern = /label:\s'(\w+)',/;
const extractedValues = {};

// extract all translation in the t_i18n() formatter from frontend
// and add them in opencti-front/lang/en.json

function extractValueFromPattern(pattern) {
  const match = /t_i18n\('([^']+)'\)/.exec(pattern);
  return match ? match[1] : null;
}

async function extractI18nValues(directory) {
  try {
    const files = await readdir(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stats = await stat(filePath);

      if (stats.isDirectory()) {
        await extractI18nValues(filePath); // Recursively call the function for directories
      } else if (stats.isFile() && jsxTsxFileExtensions.includes(path.extname(filePath))) {
        const data = await readFile(filePath, 'utf8');
        if (filePath === 'src\\components\\dataGrid\\dataTableUtils.tsx') {
          const labelMatches = data.match(labelSearchPattern);
          if (labelMatches) {
            labelMatches.forEach((m) => {
              const value = labelExecPattern.exec(m)[1];
              extractedValues[value] = value;
            })
          }
        }
        const matches = data.match(searchPattern);

        if (matches) {
          matches.forEach(match => {
            const value = extractValueFromPattern(match);
            if (value) {
              extractedValues[value] = value;
            }
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

async function mergeWithExistingData() {
  try {
    const existingData = await readFile(englishTranslationFiles, 'utf8');
    const existingValues = JSON.parse(existingData);

    const updatedValues = { ...existingValues };

    // Append only the new values that do not already exist in the file
    console.log('--- Add Frontend new key ---');
    for (const key in extractedValues) {
      if (!updatedValues.hasOwnProperty(key)) {
        console.log(key);
        updatedValues[key] = extractedValues[key];
      }
    }
    console.log('--- End ---');
    // Write the merged values back to the file
    const sortedKeys = Object.keys(updatedValues).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    const sortedValues = {};
    sortedKeys.forEach(key => {
      sortedValues[key] = updatedValues[key];
    });
    await writeFile(englishTranslationFiles, JSON.stringify(sortedValues, null, 2));
    console.log('File written successfully');
  } catch (error) {
    console.error(`Error merging with existing data: ${error.message}`);
  }
}


async function main() {
  console.log('--- extract i18n values from frontend ---');
  await extractI18nValues(srcDirectory);
  await mergeWithExistingData();
}

main();
