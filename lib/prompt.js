const inquirer = require('inquirer');

async function ui_select(message, choices, validator) {
    const answers = await inquirer.prompt([
        {
            type: 'checkbox',
            message: message,
            name: 'choice',
            choices,
            validate: validator
        }
    ]);
    return answers.choice;
}

module.exports = {
    ui_select
};