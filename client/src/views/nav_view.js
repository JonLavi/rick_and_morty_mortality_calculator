const PubSub = require('../helpers/pub_sub.js')

const NavView = function (htmlElement){
  this.htmlElement = htmlElement
};

NavView.prototype.bindEvents = function () {
  this.htmlElement.addEventListener('click', (event) => {
    const selectedSeason= event.target.id;
    PubSub.publish('NavView:season-selected', selectedSeason);
  })
};

module.exports = NavView;
