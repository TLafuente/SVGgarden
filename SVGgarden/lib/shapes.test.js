const fs = require('fs');
const inquirer = require('inquirer');
const { Triangle, Circle, Square } = require('./shapes');

function validateColor(input) {
  const validColor = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^([a-zA-Z])+$/.test(input);
  return validColor || 'Please enter a valid color keyword or hexadecimal value.';
}

async function createLogo() {
  const logoData = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for the text:',
      validate: (input) => input.length <= 3 || 'Text should be up to three characters.',
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter a color keyword or hexadecimal number for text color:',
      validate: validateColor,
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Select a shape:',
      choices: ['circle', 'triangle', 'square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter a color keyword or hexadecimal number for the shape color:',
      validate: validateColor,
    },
  ]);

  let selectedShape;
  switch (logoData.shape) {
    case 'triangle':
      selectedShape = new Triangle();
      break;
    case 'circle':
      selectedShape = new Circle();
      break;
    case 'square':
      selectedShape = new Square();
      break;
    default:
      console.log('Invalid shape selection');
      return;
  }

  selectedShape.setColor(logoData.shapeColor);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
      ${selectedShape.render()}
      <text x="10" y="30" fill="${logoData.textColor}">${logoData.text}</text>
    </svg>
  `;

  fs.writeFile('logo.svg', svg, (err) => {
    if (err) {
      console.error('Error creating logo.svg:', err);
      return;
    }
    console.log('Generated logo.svg');
  });
}

module.exports = {
  createLogo,
};