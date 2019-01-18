const PubSub = require('../helpers/pub_sub.js');

const StatsView = function (htmlElement){
  this.htmlElement = htmlElement;
}

StatsView.prototype.bindEvents = function () {
  PubSub.subscribe('Mortality:character-data-ready', (event) => {
    console.log(`event:`, event);
  })
};


module.exports = StatsView;
