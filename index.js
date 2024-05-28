// index.js
const fs = require('fs');
const inquirer = require('inquirer');
const { Circle, Triangle, Square } = require('./lib/shapes');

const questions = [
  {
    type: 'input',
    name: 'text',
    message: 'Enter up to three characters for the logo:',
    validate: input => input.length <= 3 || 'Please enter up to three characters only.',
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter the text color (keyword or hexadecimal):',
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape:',
    choices: ['Circle', 'Triangle', 'Square'],
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the shape color (keyword or hexadecimal):',
  },
];

function generateSVG({ text, textColor, shape, shapeColor }) {
  let shapeElement;

  switch (shape) {
    case 'Circle':
      shapeElement = new Circle(shapeColor);
      break;
    case 'Triangle':
      shapeElement = new Triangle(shapeColor);
      break;
    case 'Square':
      shapeElement = new Square(shapeColor);
      break;
  }

  const svgContent = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${shapeElement.render()}
      <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
    </svg>
  `;

  fs.writeFileSync('logo.svg', svgContent.trim());
  console.log('Generated logo.svg');
}

inquirer.prompt(questions).then(answers => {
  generateSVG(answers);
});
