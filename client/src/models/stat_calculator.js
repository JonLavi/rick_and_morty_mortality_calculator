const PubSub = require('../helpers/pub_sub.js');
const seasons = require('../data/seasons.js');

const StatCalculator = function() {
    this.characters = [];
};

StatCalculator.prototype.bindEvents = function() {

    // making all seasons data
    PubSub.subscribe('Mortality:character-list-ready', (event) => {
        this.characters = event.detail;
        const processedData = this.processData(this.characters);
        PubSub.publish('StatCalculator:character-stats-ready', processedData);
    });

    // subscribing and publishing season selection
    PubSub.subscribe('NavView:season-selected', (event) => {
        const requestedSeason = event.detail;
        const filteredData = this.filterBySeason(this.characters, requestedSeason, seasons);
        const processedData = this.processData(filteredData);
        PubSub.publish('StatCalculator:character-stats-ready', processedData);
    });
};

//////// Filtering Characters by Season ////////
//////// Could be done by requesting all episode info (format: S##E##), ////////
//////// and cross checking against the episode list for each character ////////
//////// but it's easier to hard code with this few seasons/episdoes    ////////

//////// outsource this into API module?? ////////

StatCalculator.prototype.filterBySeason = function(data, requestedSeason, seasonsList) {

    // TODO: get this workin'
    const episodesArray = seasonsList[requestedSeason];

    // check the season requested , return the array of episodes
    // take each index of the episodes array,
    // and check if the number is in the array of character episodes
    // if so, add this character to a new array: (CharactersInRequestedSeasons)

    const charactersInRequestedSeasons = data.filter((character) => {
        return episodesArray.forEach((checkedEpisode) => {
            if (character.episode.includes(`https://rickandmortyapi.com/api/episode/${checkedEpisode}`)) {
                return true
            }
        });
    });
    // take big dataset and return only characters where episode is a subset of numbers
};


//////// Data Processing Workflow ////////

StatCalculator.prototype.processData = function(data) {
    const allRicks = this.findAllByName(data, 'Rick');
    const allMortys = this.findAllByName(data, 'Morty');

    const rickStats = this.makeStats(allRicks, "Rick");
    const mortyStats = this.makeStats(allMortys, "Morty");

    const rickList = this.makeOccurrenceList(allRicks);
    const mortyList = this.makeOccurrenceList(allMortys);

    const rickData = this.buildCharacterData(rickStats, rickList);
    const mortyData = this.buildCharacterData(mortyStats, mortyList);

    const readyData = [rickData, mortyData];
    return readyData;
};


//////// Process Data Sub-Functions ////////

StatCalculator.prototype.findAllByName = function(data, name) {
    const characters = data.filter(character => {
        return character.name.includes(name)
    });
    return characters
};

StatCalculator.prototype.makeStats = function(list, name) {
    let stats = {
        "name": name,
        "deathCount": this.makeCount("Dead", list),
        "aliveCount": this.makeCount("Alive", list),
        "unknownCount": this.makeCount("unknown", list),
    }

    stats.mortalityRate = this.makeMortalityRate(stats)

    return stats
};

StatCalculator.prototype.makeOccurrenceList = function(listOfCharacters) {
    let list = [];
    listOfCharacters.forEach((character) => {
        list.push(character.name);
    });
    return list;
};

StatCalculator.prototype.buildCharacterData = function(stats, list) {
    stats['list'] = list
    return stats
};


///////// Make Stats Sub-Functions /////////

StatCalculator.prototype.makeCount = function(status, list) {
    let count = 0;
    list.forEach((character) => {
        if (character.status === status) {
            count++
        }
    });
    return count;
};

StatCalculator.prototype.makeMortalityRate = function(stats) {
    return 100 * (stats.deathCount) / ((stats.deathCount) + (stats.aliveCount))
};


module.exports = StatCalculator;