const ListMaker = function (container){
  this.container = container;
};

ListMaker.prototype.makeCharacterList = function (characters) {
  characters.forEach((character) => {
    const characterEntry = this.makeEntry();
    this.makeName(character, characterEntry);
    this.makeStatus(character, characterEntry);
    this.container.appendChild(characterEntry);
  })
};

ListMaker.prototype.makeEntry = function () {
  const characterEntry = document.createElement('ul');
  return characterEntry;
};

ListMaker.prototype.makeName = function (character, characterEntry) {
  const characterName = document.createElement('li');
  characterName.textContent = `Name: ${character.name}`;
  characterEntry.appendChild(characterName);
}

ListMaker.prototype.makeStatus = function (character, characterEntry) {
  const characterStatus = document.createElement('li');
  characterStatus.textContent = `Status: ${character.status}`
  characterEntry.appendChild(characterStatus);
};

module.exports = ListMaker;
