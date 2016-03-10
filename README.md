# Getting Started

## Prerequisites

This is a lightweight Node/Express app which provides a nice sketchpad for playing around with d3.js. 

You'll need:
- node: https://nodejs.org/en/
- gulp: `npm install gulp -g`

## To Run
1. `cd src` then use `npm install` to install the necessary dependencies.
2. `gulp serve` will start server/app.js and browser-sync. This will launch a browser pointing to the start of the lecture. 

# Using the D3 Sketchpad
The relevant javascript you will want to look at to follow along is located in: src/wwwroot/js/

It is designed for rapid prototyping. For example you can add a scratchpad20.js to src/wwwroot/js and use d3.js and Material Design Light. Your script will be immediately available at the route: http://localhost:3000/scratchpad/20. 

![How To](https://github.com/rinckd/d3-workshop/blob/master/readme.gif)


You'll want to select the 'time-series' ID in d3. That will give you a nice fresh div with lots of space to design in d3!

`var svg = d3.select('#time-series')
      .append('svg') `




## Presentation Table of Contents:
- SVG Introduction. Dynamically update svg elements and see how they react.
- Generative Art. Tree recursion.
- Heat Map. ColorBrewer.

##TODO:
d3.js and ES6
Angular 2


##Presentation Slides: Presentation_Slides.pdf


~Still a work in progress! Stay Tuned
