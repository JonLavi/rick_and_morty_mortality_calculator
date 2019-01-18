const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Mortality = function (){
 this.data = null;
};


Mortality.prototype.getData = function () {
  const url = 'https://rickandmortyapi.com/api/character/';
  const requestHelper = new RequestHelper(url);
  const dataPromise = requestHelper.get();
  dataPromise.then((data) => {
    this.data = data;
    //processData();
    PubSub.publish('Mortality:character-data-ready',this.data);
  });
  dataPromise.catch((err) => {
  console.error(err)
  });
};

Mortality.prototype.processData = function (data) {
  this.findRicks()
  this.findMortys()
};

module.exports = Mortality;
