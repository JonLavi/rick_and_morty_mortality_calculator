const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Mortality = function() {
    this.characters = [];
    this.promiseArray = [];
};

Mortality.prototype.bindEvents = function() {
    // find how many pages the API has
    numberOfApiPagesPromise = this.queryAmountOfPages();
    // once API Pages known, make the necessay API call for each page and create a promise Array from calls
    numberOfApiPagesPromise
        .then((data) => {
            const numberOfApiPages = data.info.pages;
            this.makeApiRequestForMultiplePages(numberOfApiPages);
            // when all promises are gathered, resolve the promise Array
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
    for (var i = 0; i <= numberOfPages; i++) {
        this.addApiRequestForPageToPromiseArray(i);
    };
};

Mortality.prototype.addApiRequestForPageToPromiseArray = function(page) {
    newPromise = this.makeApiRequestForPage(page);
    this.promiseArray.push(newPromise);
};

Mortality.prototype.makeApiRequestForPage = function(page) {
    const url = `https://rickandmortyapi.com/api/character/?page=${page}`;
    const requestHelper = new RequestHelper(url);
    return requestHelper.get();
};

Mortality.prototype.resolvePromiseArray = function() {
    Promise.all(this.promiseArray)
        .then((data) => {
            data.forEach((apiCallResponse) => {
                apiCallResponse.results.forEach((character) => {
                    this.characters.push(character);
                })
            });
            console.log(this.characters.length);
            PubSub.publish('Mortality:character-list-ready', this.characters);
        })
        .catch((err) => {
            console.error(err);
        });
};


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