// const fs = require('fs');

// const OUTPUTS_PATH = './packages/addresses/src';
// const outputs = JSON.parse(fs.readFileSync(`${OUTPUTS_PATH}/outputs.json`));

// Object.keys(outputs)
//   .filter((key) => key.includes('50'))
//   .forEach((key) => (outputs[key] = undefined));

// const outputsJson = JSON.stringify(outputs, null, 2);

// const outputsTypescript = `/* tslint:disable */\n\nexport const outputs = ${outputsJson}`;

// fs.writeFileSync(`${OUTPUTS_PATH}/outputs.json`, outputsJson);
// fs.writeFileSync(`${OUTPUTS_PATH}/outputs.ts`, outputsTypescript);
