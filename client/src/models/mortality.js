const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Mortality = function() {
    this.characters = [];
    this.numberOfPages = null;
    this.promiseArray = [];
};

Mortality.prototype.bindEvents = function() {
    numberOfApiPagesPromise = this.queryAmountOfPages();
    numberOfApiPagesPromise
        .then((data) => {
            const numberOfApiPages = data.info.pages;
            this.makeApiRequestForMultiplePages(numberOfApiPages);
            this.resolvePromiseArray();
        })
        .catch((err) => {
            console.error(err);
        });

};

Mortality.prototype.queryAmountOfPages = function() {
    const url = `https://rickandmortyapi.com/api/character/?page=1`;
    const requestHelper = new RequestHelper(url);
    return requestHelper.get();
}

Mortality.prototype.makeApiRequestForMultiplePages = function(numberOfPages) {
    for (var i = 0; i = numberOfPages; i++) {
        this.addApiRequestForPageToPromiseArray(i);
    }
};

Mortality.prototype.addApiRequestForPageToPromiseArray = function(page) {
    const url = `https://rickandmortyapi.com/api/character/?page=${page}`;
    const requestHelper = new RequestHelper(url);
    const dataPromise = requestHelper.get();
    this.promiseArray.push(dataPromise);
};

Mortality.prototype.resolvePromiseArray = function() {
    Promise.all(this.promiseArray)
        .then((data) => {
            data.forEach((apiCallResponse) => {
                apiCallResponse.results.forEach((character) => {
                    this.characters.push(character);
                });
            });
            console.log(this.characters.length);
            PubSub.publish('Mortality:character-list-ready', this.characters);
        })
        .catch((err) => {
            console.error(err);
        });
}


// function: getAllCharacterData(){

// function: retrieveNumberOfPages(){
// Run an api request to determine the number of Api pages
// save the number of pages to a variable
// }


// function: retrieveAllApiPages(){
// - Perform an Api request for the given number of pages(variable),
// - and append the data to the list of characters
// { Loop: for i in numberOfPages
//   perform an Api request (page).
//   append the returned data to the array of characters (class variable);
// }
// }

//}


module.exports = Mortality;