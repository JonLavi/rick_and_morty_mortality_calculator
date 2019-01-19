const PubSub = require('../helpers/pub_sub.js');
const StatsMaker = require('../views/stats_maker.js')


const StatsView = function (hostHtmlElement){
  this.hostHtmlElement = hostHtmlElement;
}

const dummyStats = [
  {
    "name": "Rick",
    "deathCount": 1,
    "aliveCount": 2,
    "unknownCount": 0,
    "mortalityRate": 50,
  },
  {
    "name": "Morty",
    "deathCount": 50,
    "aliveCount": 200,
    "unknownCount": 1,
    "mortalityRate": 20,
  }
]

StatsView.prototype.bindEvents = function () {
  PubSub.subscribe('Mortality:character-list-ready', (event) => {
    console.log(`event:`, event);

    const newStatsMaker = new StatsMaker(this.hostHtmlElement);
    dummyStats.forEach((character) => {
      console.log(character);
      newStatsMaker.makeStats(character);
    });

  });
};


module.exports = StatsView;
