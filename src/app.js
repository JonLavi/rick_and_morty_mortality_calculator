const Mortality = require('./models/mortality.js');


document.addEventListener('DOMContentLoaded', () => {
  console.log("JavaScript has loaded");

  const mortality = new Mortality();
  mortality.getData();

  // connect to API, publish data (bindEvents)
})
