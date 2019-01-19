
const StatsMaker = function (container){
  this.container = container;
};

StatsMaker.prototype.makeStats = function (character) {
  this.makeName(character);
  this.makeDeathCount(character);
  this.makeAliveCount(character);
  this.makeUnknownCount(character);
};

StatsMaker.prototype.makeName = function (character) {
  const nameElement = document.createElement('h1');
  nameElement.textContent = `Character: ${character.name}`;
  this.container.appendChild(nameElement);
};

StatsMaker.prototype.makeDeathCount = function (character) {
  const deathCountElement = document.createElement('h1');
  deathCountElement.textContent = `Death Count: ${character.deathCount}`;
  this.container.appendChild(deathCountElement);
};

StatsMaker.prototype.makeAliveCount = function (character) {
  const aliveCountElement = document.createElement('h1');
  aliveCountElement.textContent = `Still Alive: ${character.aliveCount}`;
  this.container.appendChild(aliveCountElement);
};

StatsMaker.prototype.makeUnknownCount = function (character) {
  const unknownCountElement = document.createElement('h1');
  unknownCountElement.textContent = `Status Unknown: ${character.unknownCount}`;
  this.container.appendChild(unknownCountElement);
};

module.exports = StatsMaker;
