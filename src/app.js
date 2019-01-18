const Mortality = require('./models/mortality.js');
const StatsView = require('./views/stats_view.js')

document.addEventListener('DOMContentLoaded', () => {
  console.log("JavaScript has loaded");


  const statsSection = document.querySelector('stats');
  const statsView = new StatsView(statsSection);
  statsView.bindEvents();

  const mortality = new Mortality();
  mortality.bindEvents();

  // connect to API, publish data (bindEvents)
})
