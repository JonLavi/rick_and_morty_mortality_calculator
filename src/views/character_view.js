const PubSub = require('../helpers/pub_sub.js');
const ListView = require('../views/list_view.js');
const StatsView = require('../views/stats_view.js');

const CharacterView = function (parentHtmlElement){
  this.parentHtmlElement = parentHtmlElement;
};

CharacterView.prototype.bindEvents = function () {
  PubSub.subscribe('StatCalculator:character-stats-ready', (event) => {
    console.log('Character stats arrived with View Maker');

    const characterData = event.detail;

    console.log(`Character data:`, characterData)

    characterData.forEach((character) => {
      const container = this.makeContainer(character);

      const newStatsView = new StatsView(container);
      newStatsView.makeStats(character);

      const newListView = new ListView(container);
      newListView.makeOccurrenceList(character);


      this.parentHtmlElement.appendChild(container);
    });
    // make container for each character in Data, and put it in parentHtmlElement

    // make stat view in each Container

    // make a list view in each container

  })
};

CharacterView.prototype.makeContainer = function (character) {
  const newCharacterContainer = document.createElement('section');
  newCharacterContainer.id = character.name;
  return newCharacterContainer;
};


module.exports = CharacterView;
