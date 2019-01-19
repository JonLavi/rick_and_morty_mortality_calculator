const Mortality = require('./models/mortality.js');
const StatCalculator = require('./models/stat_calculator.js');
const CharacterView = require('./views/character_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log("JavaScript has loaded");

  const contentsElement = document.querySelector(`#contents`);
  const newCharacterView = new CharacterView(contentsElement);
  newCharacterView.bindEvents();

  const newStatCalculator = new StatCalculator();
  newStatCalculator.bindEvents();

  const newMortality = new Mortality();
  newMortality.bindEvents();

})
