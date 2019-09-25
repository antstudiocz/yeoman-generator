'use strict';
const Generator = require('yeoman-generator');
const shell = require('shelljs');
const chalk = require('chalk')

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts)

    this.option('nogit');
    this.argument('name', { type: String, required: true });
    this.options.name = this._capitalizeFirstLetter(this.options.name)
    this.destination = {};
    this.error = [];
  }

  _capitalizeFirstLetter(string)
  {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  _lowerCaseFirstLetter(string)
  {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }

  async prompting() {
    this.destination = await this.prompt([{
      type    : 'list',
      name    : 'componentPath',
      message : 'Select destination to save files',
      default : this.appname, // Default to current folder name
      choices: [{
        name: 'Project dir',
        value: {
          path: 'themes/Drym3/Components',
          type: 'project',
          namespace: 'Ant\\Themes\\Drym3\\Components\\',
          testPath: 'tests/Project/Components',
          testNamespace: 'Ant\\Tests\\Project',
          stylePath: 'themes/Drym3/assets/scss/components'
        }
      }, {
        name: 'App - FrontModule',
        value: {
          path: 'app/FrontModule/Components',
          type: 'front',
          namespace: 'Ant\\FrontModule\\Components\\',
          testPath: 'tests/FrontModule/Components',
          testNamespace: 'Ant\\Tests\\FrontModule',
          stylePath: ''
        }
      }, {
        name: 'App - AdminModule',
        value: {
          path: 'app/AdminModule/Components',
          type: 'admin',
          namespace: 'Ant\\AdminModule\\Components\\',
          testPath: 'tests/AdminModule/Components',
          testNamespace: 'Ant\\Tests\\AdminModule',
          stylePath: ''
        }
      }]
    }
    ]);
  }

  createComponent() {
    const config = this.destination.componentPath

    const checkFileExist = this.fs.read(`${config.path}/${this.options.name}/${this.options.name}.php`, {defaults: ''})

    if (checkFileExist.length === 0) {
      this.fs.copyTpl(
        this.templatePath(`component.php`),
        this.destinationPath(`${config.path}/${this.options.name}/${this.options.name}.php`), {
          component: this.options.name,
          componentLower: this._lowerCaseFirstLetter(this.options.name),
          config: config
        }
      )
      this.fs.copyTpl(
        this.templatePath(`component.latte`),
        this.destinationPath(`${config.path}/${this.options.name}/${this._lowerCaseFirstLetter(this.options.name)}.latte`), {
          component: this._lowerCaseFirstLetter(this.options.name)
        }
      )
      this.fs.copyTpl(
        this.templatePath(`componentFactory.php`),
        this.destinationPath(`${config.path}/${this.options.name}/I${this.options.name}Factory.php`), {
          component: this.options.name,
          config: config
        }
      )
      if (!this.options.nogit) {
        this.fs.commit([], () => {
          if (shell.exec(`git add ${config.path}/${this.options.name}/I${this.options.name}Factory.php ${config.path}/${this.options.name}/${this._lowerCaseFirstLetter(this.options.name)}.latte ${config.path}/${this.options.name}/${this.options.name}.php`).code !== 0) {
            shell.echo('Error: Git add fail');
            shell.exit(1);
          }
        })
      }
    } else {
      this.error.push('Component already exist!')
    }
  }

  createAssets() {
    const config = this.destination.componentPath
    const name = this._lowerCaseFirstLetter(this.options.name)

    const checkFileExist = this.fs.read(`${config.stylePath}/_${name}.scss`, {defaults: ''})

    if (checkFileExist.length === 0) {
      if (config.type === 'project') {
        this.fs.copyTpl(
          this.templatePath(`_component.scss`),
          this.destinationPath(`${config.stylePath}/_${name}.scss`), {
            component: name
          }
        )
        if (!this.options.nogit) {
          this.fs.commit([], () => {
            if (shell.exec(`git add ${config.stylePath}/_${name}.scss`).code !== 0) {
              shell.echo('Error: Git add fail');
              shell.exit(1);
            }
          })
        }
      }
    }
  }

  createTests() {
    const config = this.destination.componentPath

    const checkFileExist = this.fs.read(`${config.testPath}/${this.options.name}/${this.options.name}Test.phpt`, {defaults: ''})

    if (checkFileExist.length === 0) {
      this.fs.copyTpl(
        this.templatePath(`componentTest.phpt`),
        this.destinationPath(`${config.testPath}/${this.options.name}/${this.options.name}Test.phpt`), {
          component: this.options.name,
          name: this._lowerCaseFirstLetter(this.options.name),
          config: config
        }
      )
      if (!this.options.nogit) {
        this.fs.commit([], () => {
          if (shell.exec(`git add ${config.testPath}/${this.options.name}/${this.options.name}Test.phpt`).code !== 0) {
            shell.echo('Error: Git add fail');
            shell.exit(1);
          }
        })
      }
    }
  }

  writing() {
    if (this.error.length === 0) {
      this.log(`create new component with name ${this.options.name}`);
      this.log(`${this.destination.componentPath.namespace}${this.options.name}\\I${this.options.name}Factory`)
    } else {
      this.error.forEach((error) => {
        this.log(chalk.bold.white.bgRed(`--------------------------`));
        this.log(chalk.bold.white.bgRed(` ${error} `));
        this.log(chalk.bold.white.bgRed(`--------------------------`));
      })
    }

    if (!this.options.nogit) {
      if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git');
        shell.exit(1);
      }
    }
  }
};
