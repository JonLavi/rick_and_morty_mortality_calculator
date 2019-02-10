const StatsMaker = function (targetContainer){
  this.targetContainer = targetContainer;
};

StatsMaker.prototype.makeStats = function (character) {
  this.makeName(character);
  this.makeImage(character);
  this.makeMortalityRate(character);
  this.makeDeathCount(character);
  this.makeAliveCount(character);
  this.makeUnknownCount(character);
};

StatsMaker.prototype.makeName = function (character) {
  const nameElement = document.createElement('h1');
  nameElement.classList.add("name");
  nameElement.textContent = `${character.name}`;
  this.targetContainer.appendChild(nameElement);
};

StatsMaker.prototype.makeImage = function (character){
  const imageElement = document.createElement('img');
  imageElement.src = `../../public/images/${character.name}.jpeg`
  this.targetContainer.appendChild(imageElement);
};

StatsMaker.prototype.makeMortalityRate = function (character) {
  const mortalityRateElement = document.createElement('h1');
  mortalityRateElement.classList.add("mortality-rate");
  mortalityRateElement.textContent = `Mortality Rate: ${character.mortalityRate.toFixed(2)}%`;
  this.targetContainer.appendChild(mortalityRateElement);
};

StatsMaker.prototype.makeDeathCount = function (character) {
  const deathCountElement = document.createElement('h1');
  deathCountElement.classList.add("death-count");
  deathCountElement.textContent = `Death Count: ${character.deathCount}`;
  this.targetContainer.appendChild(deathCountElement);
};

StatsMaker.prototype.makeAliveCount = function (character) {
  const aliveCountElement = document.createElement('h1');
  aliveCountElement.classList.add("alive-count");
  aliveCountElement.textContent = `Still Alive: ${character.aliveCount}`;
  this.targetContainer.appendChild(aliveCountElement);
};

StatsMaker.prototype.makeUnknownCount = function (character) {
  const unknownCountElement = document.createElement('h1');
  unknownCountElement.classList.add("unknown-count");
  unknownCountElement.textContent = `Status Unknown: ${character.unknownCount}`;
  this.targetContainer.appendChild(unknownCountElement);
};

module.exports = StatsMaker;
