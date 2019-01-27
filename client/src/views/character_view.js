const PubSub = require('../helpers/pub_sub.js');
const ListView = require('../views/list_view.js');
const StatsView = require('../views/stats_view.js');

const CharacterView = function (parentHtmlElement){
  this.parentHtmlElement = parentHtmlElement;
};

CharacterView.prototype.bindEvents = function () {
  PubSub.subscribe('StatCalculator:character-stats-ready', (event) => {
    const characterData = event.detail;
    this.render(characterData);
  })
};


CharacterView.prototype.render = function (characterData) {
  this.parentHtmlElement.innerHTML = '';
  characterData.forEach((character) => {

    const container = this.makeContainer(character);

    const newStatsView = new StatsView(container);
    newStatsView.makeStats(character);

    const newListView = new ListView(container);
    newListView.makeOccurrenceList(character);

    this.parentHtmlElement.appendChild(container);
  });
};

CharacterView.prototype.makeContainer = function (character) {
  const newCharacterContainer = document.createElement('section');
  newCharacterContainer.classList.add('character');
  return newCharacterContainer;
};

module.exports = CharacterView;
