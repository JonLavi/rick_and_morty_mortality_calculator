let fetch = require("node-fetch")

class ApiQueryHelper {
  constructor(){
    this.characters = [];
    this.promiseArray = [];
  }

  getAllCharacters () {
    // find how many pages the API has
    let numberOfApiPagesPromise = this.queryAmountOfPages();
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

  queryAmountOfPages() {
    const url = `https://rickandmortyapi.com/api/character/?page=1`;
    let pageData = null;
    
    return (fetch(url)
    .then(res => res.json())
    .then(data => {pageData = data})
    .then(() => {return pageData})
    .catch(err => console.error(err)))

  }

  makeApiRequestForMultiplePages(numberOfPages) {
    for (var i = 0; i <= numberOfPages; i++) {
      this.addApiRequestForPageToPromiseArray(i);
    };
  };

  addApiRequestForPageToPromiseArray(page) {
    let newPromise = this.makeApiRequestForPage(page);
    this.promiseArray.push(newPromise);
  };

  makeApiRequestForPage(page) {
    const url = `https://rickandmortyapi.com/api/character/?page=${page}`;

    return (fetch(url)
      .then(res => res.json())
      .then(data => {return data})
    )
    
  };

  resolvePromiseArray() {
    Promise.all(this.promiseArray)
      .then((data) => {
        data.forEach((apiCallResponse) => {
          apiCallResponse.results.forEach((character) => {
            this.characters.push(character);
          })
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

}

module.exports = ApiQueryHelper;

