const fs = require('fs');
const { Triangle, Circle, Square } = require('./shapes');

function createLogo({ text, textColor, shape, shapeColor }) {
  // Create an instance of the selected shape class
  let selectedShape;
  switch (shape) {
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

  selectedShape.setColor(shapeColor);

  // Generate the SVG code for the logo
  const svg = `
   <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
     ${selectedShape.render()}
     <text x="10" y="30" fill="${textColor}">${text}</text>
   </svg>
  `;

  // Save the SVG to a file
  fs.writeFileSync('logo.svg', svg);
  console.log('Generated logo.svg');
}

module.exports = {
  createLogo,
};