# Mortality - a Rick and Morty Mortality Rate Calculator

This JavaScript web app retrieves all characters from the [Rick and Morty API](https://rickandmortyapi.com/), and calculates a mortality rate for each version of 'Rick' and 'Morty'.

![Screenshot](https://user-images.githubusercontent.com/44193148/53338758-6a6db700-38fc-11e9-9206-e1fbbded724e.png)


## ToDo:
* Migrate API requests to backend, store data in a server-side mongoDB
* Format occurrence list to highlight the status (alive/dead/unknown) of each occurrence
* Make the Nav section clicks show the mortality rate based on seasons
* Add last known location to occurrence list

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Prerequisites

Mortality requires node.js, npm and webpack to run.

### Installing

Running Mortality requires only a few simple steps:
Installing dependencies should be handeled by npm. In the root folder run:

```
npm install
```

Run webpack

```
npm run build
```

Open index.html to view the statistics



## Built With

* [node.js](https://maven.apache.org/) - Dependency Management
* [webpack](https://webpack.js.org) - Bundling
* [express](https://expressjs.com) - Fast, unopinionated, minimalist web framework for Node.js


## Acknowledgments

* Rick and Morty API: https://rickandmortyapi.com
* Background image: https://wallpapercave.com/w/wp1822739
* Font: https://www.deviantart.com/jonizaak/art/Get-Schwifty-A-Rick-and-Morty-font-638073728

* Rick and Morty is created by Justin Roiland and Dan Harmon for Adult Swim. The data and images are used without claim of ownership and belong to their respective owners.
