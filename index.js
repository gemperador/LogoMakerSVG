// index.js
async function run() {
  const fsModule = await import('fs');
  const inquirerModule = await import('inquirer');
  const shapesModule = await import('./lib/shapes.cjs');

  const fs = fsModule.promises; // Use fs promises for async file operations
  const inquirer = inquirerModule.default;
  const { Circle, Triangle, Square } = shapesModule;

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

    fs.writeFile('logo.svg', svgContent.trim())
      .then(() => console.log('Generated logo.svg'))
      .catch(err => console.error('Error writing file:', err));
  }

  inquirer.prompt(questions).then(answers => {
    generateSVG(answers);
  });
}

run();
