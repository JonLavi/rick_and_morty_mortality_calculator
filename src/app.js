const Mortality = require('./models/mortality.js');
const StatsView = require('./views/stats_view.js')
const StatCalculator = require('./models/stat_calculator.js');
const ListView = require('./views/list_view.js')

document.addEventListener('DOMContentLoaded', () => {
  console.log("JavaScript has loaded");

  debugger
  const statsSection = document.querySelector('#stats');
  const statsView = new StatsView(statsSection);
  statsView.bindEvents();

  const listSection = document.querySelector('#list');
  const listView = new ListView(listSection);
  listView.bindEvents();

  const statCalculator = new StatCalculator();
  statCalculator.bindEvents();

  const mortality = new Mortality();
  mortality.bindEvents();

  // connect to API, publish data (bindEvents)
})
