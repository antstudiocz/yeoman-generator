# generator-nette-component
> create new nette component

**required: node version 7.6+, npm**

Component auto add to git with git add command.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-nette-component using [npm](https://www.npmjs.com/) (assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g @antstudiocz/yeoman-generator
```

Then generate your new project:

```bash
yo nette-component [componentName]
```
_note: component is auto capitalize_

select path to save from: Project, FrontModule, AdminModule

**Tests is auto generated too, don't forget to edit them too.**

## Options
script accept this options:
  - nogit = don't add generated file git - call eg. $ yo nette-component [componentName] --nogit

## Update local global package

```
npm update -g generator-nette-component
```

## How to develop this generator

Install package from local:
```
npm install -g yo
npm install full/path/to/project/yeoman-generator -g
``` 

Main file is generators/app/index.js
