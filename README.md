# Eddie's Tidy "To Do List" Generator
An assignment as part of the Java-script 101 course, Front End Development program, at Medieinstutet, Stockholm, Sweden. Focusing on creating interactive *arrays, objects* and *classes* using *functions, for loops, events* as well as applying *LocalStorage*. 

## Description
Use the input field to enter a task to the *Todo-list *(max 50 letters), either by clicking the **addbutton** or by pressing **enter** on your keyboard.

Each Todo-task has a built in "check option", toggled by **clicking the task itself**. In addition, each list item contains 3 buttons, all connected to the list item. The **up arrow** pushes the task *up* one step in the list, while the **down arrow** pushes the task *down* one step. Clicking the **trashbin symbol** will remove the list item from the list and add it to *trash list*, displayed in a different container.

Once displayed in the *trash list*, clicking the **recycle button** will remove the list item from the *trash list*, moving it back to the *Todo-list*, placing it at the bottom of the list.

Clicking the **empty trashbin button** will delete all the list items withing the *trash list*. ***CAUTION!*** Triggering this function will also remove the *trash list* from localStorage.

## Installation:
Make a new folder.

Run git clone https://github.com/edvinsjogren/Eddie-sTidyToDoList.git in your terminal

Start index.html

## Project structure
ProjectFolder/ - Project root, index and hmtl files goes here.
scss/ - Scss folder containing all scss files.
css/ - Css folder, css is rendered here through scss using npm.
js/ - JavaScript folder containing all js-files, including gulpfile.js.

## Best Practice

### Variables
Instead of using var, use let and/or const when needed.
When naming variables use camelCase *Eg. let renderToDoList*.

### Functions
Function names should use camelCase.

### Classes
Class names should use PascalCase *Eg. Class ToDo*.

### HTML
All html is generated through javascript.
All classnames, id:s, etc should use camelCase 

### SCSS
Color presets can be found under _variables.scss
Presets for flex, box shadows, buttons, etc, can be found under _mixins.scss

## Roadmap
Add a form-based function letting the user create multiple *Todo-lists* with various presets: 
    * a selection of various different background image and color presets 
    * an option for choosing *check list* or *text list*
    * an option to save the *Todo-list* and toggle between previously saved *Todo-lists*

## Support 
info@medieinstitutet.se
