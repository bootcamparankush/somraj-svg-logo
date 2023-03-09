const inquirer = require('inquirer');
const fs = require('fs');

const shapes = ['rectangle', 'circle', 'triangle'];

inquirer
  .prompt([
    {
      name: 'text',
      message: 'Enter up to three characters:',
      validate: function (input) {
        return input.length <= 3 || 'Please enter three characters or less.';
      },
    },
    {
      name: 'textColor',
      message: 'Enter text color:',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: shapes,
    },
    {
      name: 'shapeColor',
      message: 'Enter shape color:',
    },
  ])
  .then((answers) => {
    let shapeContent;
    if (answers.shape === 'circle') {
      shapeContent = `<circle cx="150" cy="100" r="50" fill="none" stroke-width="3" stroke="${answers.shapeColor}" />`;
    } else if (answers.shape === 'triangle') {
      shapeContent = `<polygon points="150,20 280,180 20,180" fill="none" stroke-width="3" stroke="${answers.shapeColor}" />`;
    } else {
      shapeContent = `<rect x="75" y="50" width="150" height="100" fill="none" stroke-width="3" stroke="${answers.shapeColor}" />`;
    }

const svgContent = `
  <svg width="300" height="200">
    <rect x="0" y="0" width="300" height="200" fill="${answers.shapeColor}" />
    <text x="50%" y="50%" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>
    ${shapeContent}
  </svg>
`;

    fs.writeFile('output.html', svgContent, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('File created successfully!');
    });
  })
  .catch((error) => {
    console.error(error);
  });
